<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BaseController extends Controller
{
    protected $model;
    protected $table;
    protected $validationRules = [];
    protected $validationMessages = [];
    protected $relations = [];

    public function __construct($model, $table, $validationRules = [], $validationMessages = [], $relations = [])
    {
        $this->model = $model;
        $this->table = $table;
        $this->validationRules = $validationRules;
        $this->validationMessages = $validationMessages;
        $this->relations = $relations;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $row = (int) request('row', 10);

        if ($row < 1 || $row > 100) {
            abort(400, 'The per-page parameter must be an integer between 1 and 100.');
        }

        $rules = $this->getValidationRules();
        $rules['search'] = 'nullable';
        $rules['created_at'] = 'nullable';

        $filters = request()->only(array_keys($rules));

        $data = $this->model
            ->filter($filters)
            ->sortable()
            ->paginate($row)
            ->appends(request()->query());

        // Jika ada relasi, tambahkan data relasi
        if (!empty($this->relations)) {
            $data->getCollection()->transform(function ($item) {
                foreach ($this->relations as $relation => $fields) {
                    if ($item->$relation) {
                        foreach ($fields as $field) {
                            $item->$field = $item->$relation->$field ?? null;
                        }
                        unset($item->$relation); // Opsional: Hilangkan relasi jika tidak dibutuhkan
                    }
                }
                return $item;
            });
        }

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = $this->getValidationRules();

        // $validator = Validator::make($request->all(), $this->validationRules, $this->validationMessages);
        $validator = Validator::make($request->all(), $rules, $this->validationMessages);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validatedData = $validator->validated();

        // Hash password jika ada dalam request
        if (!empty($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        // Start transaction
        DB::beginTransaction();

        try {
            // Handle upload image jika ada
            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $fileName = hexdec(uniqid()) . '.' . $file->getClientOriginalExtension();
                $path = $file->storePubliclyAs('users', $fileName, 'public');
                $validatedData['photo'] = $path;
            }

            // Jika ada relasi, buat data relasi terlebih dahulu
            if (!empty($this->relations)) {
                foreach ($this->relations as $relation => $fields) {
                    $relatedModel = $this->model->$relation()->getRelated();
                    $relatedData = [];
                    foreach ($fields as $field) {
                        if (isset($validatedData[$field])) {
                            $relatedData[$field] = $validatedData[$field];
                            unset($validatedData[$field]);
                        }
                    }
                    $relatedInstance = $relatedModel->create($relatedData);
                    $validatedData[$relation . '_id'] = $relatedInstance->id;
                }
            }

            // Buat data utama
            $data = $this->model->create($validatedData);

            DB::commit();

            return response()->json([
                'message' => 'Data has been created!',
                'data' => $data,
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to store data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = $this->model->find($id);

        if (!$data) {
            return response()->json([
                'message' => 'Data not found'
            ], 404);
        }

        // Jika ada relasi, tambahkan data relasi
        // if (!empty($this->relations)) {
        //     foreach ($this->relations as $relation => $fields) {
        //         if ($data->$relation) {
        //             foreach ($fields as $field) {
        //                 $data->$field = $data->$relation->$field ?? null;
        //             }
        //         }
        //     }
        // }

        if (!empty($this->relations)) {
            foreach ($this->relations as $relation => $fields) {
                if ($data->$relation) {
                    foreach ($fields as $field) {
                        if (in_array($field, ['password', 'remember_token'])) {
                            continue;
                        }
                        $data->$field = $data->$relation->$field ?? null;
                    }
                }
            }
        }

        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $this->model->findOrFail($id);

        $rules = $this->getValidationRules($id);

        // $validator = Validator::make($request->all(), $this->validationRules, $this->validationMessages);
        $validator = Validator::make($request->all(), $rules, $this->validationMessages);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validatedData = $validator->validated();

        // Start transaction
        DB::beginTransaction();

        try {
            // Handle upload image jika ada
            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $fileName = hexdec(uniqid()) . '.' . $file->getClientOriginalExtension();
                $path = $file->storePubliclyAs('users', $fileName, 'public');
                $validatedData['photo'] = $path;

                // Hapus foto lama jika ada
                if ($data->photo && Storage::disk('public')->exists($data->photo)) {
                    Storage::disk('public')->delete($data->photo);
                }
            }

            // Jika ada relasi, update data relasi
            if (!empty($this->relations)) {
                foreach ($this->relations as $relation => $fields) {
                    $relatedModel = $this->model->$relation()->getRelated();
                    $relatedData = [];
                    foreach ($fields as $field) {
                        if (isset($validatedData[$field])) {
                            $relatedData[$field] = $validatedData[$field];
                            unset($validatedData[$field]);
                        }
                    }
                    $relatedInstance = $data->$relation;
                    if ($relatedInstance) {
                        $relatedInstance->update($relatedData);
                    }
                }
            }

            // Update data utama
            $data->update($validatedData);

            DB::commit();

            return response()->json([
                'message' => 'Data has been updated!',
                'data' => $data,
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = $this->model->findOrFail($id);

        // Hapus foto jika ada
        if ($data->photo && Storage::disk('public')->exists($data->photo)) {
            Storage::disk('public')->delete($data->photo);
        }

        // Jika ada relasi, hapus data relasi
        if (!empty($this->relations)) {
            foreach ($this->relations as $relation => $fields) {
                $relatedInstance = $data->$relation;
                if ($relatedInstance) {
                    $relatedInstance->delete();
                }
            }
        }

        // Hapus data utama
        $data->delete();

        return response()->json([
            'message' => 'Data has been deleted!',
        ], 200);
    }

    /**
     * Export data.
     */
    public function export()
    {
        $row = (int) request('row', 10);

        if ($row < 1 || $row > 100) {
            abort(400, 'The per-page parameter must be an integer between 1 and 100.');
        }

        $filters = request()->only(array_keys($this->validationRules));

        $data = $this->model
            ->filter($filters)
            ->sortable()
            ->get();

        // Jika ada relasi, tambahkan data relasi
        if (!empty($this->relations)) {
            $data->transform(function ($item) {
                foreach ($this->relations as $relation => $fields) {
                    if ($item->$relation) {
                        foreach ($fields as $field) {
                            $item->$field = $item->$relation->$field ?? null;
                        }
                        unset($item->$relation); // Opsional: Hilangkan relasi jika tidak dibutuhkan
                    }
                }
                return $item;
            });
        }

        return response()->json($data);
    }

    /**
     * Import data.
     */
    public function import(Request $request)
    {
        $data = $request->all();

        if (!$data || !is_array($data) || empty($data)) {
            return response()->json([
                'message' => 'Invalid or empty data',
            ], 400);
        }

        // Validasi setiap baris data
        $errors = [];
        foreach ($data as $index => $row) {
            $rules = $this->getValidationRules();
            // $validator = Validator::make($row, $this->validationRules, $this->validationMessages);
            $validator = Validator::make($row, $rules, $this->validationMessages);

            if ($validator->fails()) {
                $errors[$index] = $validator->errors();
            }
        }

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $errors,
            ], 422);
        }

        // Simpan data jika valid
        DB::beginTransaction();

        try {
            foreach ($data as $row) {
                // Jika ada relasi, buat data relasi terlebih dahulu
                $relatedData = [];
                if (!empty($this->relations)) {
                    foreach ($this->relations as $relation => $fields) {
                        $relatedModel = $this->model->$relation()->getRelated();
                        $relatedRow = [];
                        foreach ($fields as $field) {
                            if (isset($row[$field])) {
                                $relatedRow[$field] = $row[$field];
                                unset($row[$field]);
                            }
                        }
                        $relatedInstance = $relatedModel->create($relatedRow);
                        $row[$relation . '_id'] = $relatedInstance->id;
                    }
                }

                // Buat data utama
                $this->model->create($row);
            }

            DB::commit();

            return response()->json([
                'message' => 'Data successfully imported!',
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to import data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Import and update data.
     */
    public function importUpdate(Request $request)
    {
        $data = $request->all();

        if (!$data || !is_array($data) || empty($data)) {
            return response()->json([
                'message' => 'Invalid or empty data',
            ], 400);
        }

        // Validasi setiap baris data
        $errors = [];
        foreach ($data as $index => $row) {
            $rules = $this->getValidationRules($row['id']);
            // $validator = Validator::make($row, $this->validationRules, $this->validationMessages);
            $validator = Validator::make($row, $rules, $this->validationMessages);

            if ($validator->fails()) {
                $errors[$index] = $validator->errors();
            }
        }

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $errors,
            ], 422);
        }

        // Proses Update Data
        DB::beginTransaction();

        try {
            foreach ($data as $row) {
                // Cari data berdasarkan ID
                $existingData = $this->model->find($row['id']);

                if ($existingData) {
                    // Jika ada relasi, update data relasi
                    if (!empty($this->relations)) {
                        foreach ($this->relations as $relation => $fields) {
                            $relatedInstance = $existingData->$relation;
                            if ($relatedInstance) {
                                $relatedRow = [];
                                foreach ($fields as $field) {
                                    if (isset($row[$field])) {
                                        $relatedRow[$field] = $row[$field];
                                        unset($row[$field]);
                                    }
                                }
                                $relatedInstance->update($relatedRow);
                            }
                        }
                    }

                    // Update data utama
                    $existingData->update($row);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'Data successfully updated!',
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}