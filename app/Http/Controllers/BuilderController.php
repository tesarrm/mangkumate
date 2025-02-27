<?php


// namespace App\Http\Controllers;

// use App\Models\Builder;
// use Illuminate\Http\Request;

// class BuilderController extends BaseController
// {
//     protected $model;
//     protected $table = 'builders';

//     public function __construct(Builder $model)
//     {
//         parent::__construct($model, $this->table, [], [], []);
//     }

//     protected function getValidationRules($id = null)
//     {
//         $rules = [
//             'id' => 'required|string',
//             'sections' => 'nullable|array',
//         ];

//         return $rules;
//     }

//     public function store(Request $request)
//     {
//         // Validasi input
//         $request->validate([
//             'formName' => 'required|string',
//             'sections' => 'nullable|array',
//         ]);


//         // Simpan data ke database
//         $jsonData = Builder::create([
//             'id' => $request->input('formName'),
//             'sections' => json_encode($request->input('sections', [])), 
//         ]);

//         return response()->json([
//             'message' => 'Data has been created!',
//             'data' => $jsonData,
//         ], 201);
//     }

//     public function update(Request $request, $id)
//     {
//         $jsonData = Builder::find($id);

//         if (!$jsonData) {
//             return response()->json([
//                 'message' => 'Data not found'
//             ], 404);
//         }

//         // validasi
//         $request->validate([
//             'id' => 'sometimes|string', 
//             'sections' => 'sometimes|array',
//         ]);

//         // Perbarui data
//         if ($request->has('id')) {
//             $jsonData->id = $request->input('id');
//         }

//         if ($request->has('sections')) {
//             $jsonData->sections = json_encode($request->input('sections'));
//         }

//         $jsonData->save();

//         return response()->json([
//             'message' => 'Data has been updated!',
//             'data' => $jsonData,
//         ]);
//     }
// }

namespace App\Http\Controllers;

use App\Models\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BuilderController extends BaseController
{
    protected $model;
    protected $table = 'builders';

    public function __construct(Builder $model)
    {
        parent::__construct($model, $this->table, [], [], []);
    }

    protected function getValidationRules($id = null)
    {
        $rules = [
            'id' => 'required|string',
            'sections' => 'nullable|array',
        ];

        return $rules;
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'formName' => 'required|string',
            'sections' => 'nullable|array',
        ]);

        // Simpan data ke database
        $jsonData = Builder::create([
            'id' => $request->input('formName'),
            'sections' => json_encode($request->input('sections', [])),
        ]);

        // Simpan data ke file JSON
        // $fileName = $request->input('formName') . '.json';
        $fileName = now()->format('Y_m_d_His') . '_' . Str::slug($request->input('formName')) . '.json';
        // $filePath = storage_path('app/entities/' . $fileName);
        $filePath = base_path("automate/entities/{$fileName}");

        $jsonContent = json_encode([
            'formName' => $request->input('formName'),
            'sections' => $request->input('sections', []),
        ], JSON_PRETTY_PRINT);

        file_put_contents($filePath, $jsonContent);

        return response()->json([
            'message' => 'Data has been created and saved to file!',
            'data' => $jsonData,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $jsonData = Builder::find($id);

        if (!$jsonData) {
            return response()->json([
                'message' => 'Data not found'
            ], 404);
        }

        // Validasi input
        $request->validate([
            'id' => 'sometimes|string',
            'sections' => 'sometimes|array',
        ]);

        // Perbarui data
        if ($request->has('id')) {
            $jsonData->id = $request->input('id');
        }

        if ($request->has('sections')) {
            $jsonData->sections = json_encode($request->input('sections'));
        }

        $jsonData->save();

        // // Simpan data ke file JSON
        // $fileName = $jsonData->id . '.json';
        // $filePath = storage_path('app/builders/' . $fileName);

        // $jsonContent = json_encode([
        //     'formName' => $jsonData->id,
        //     'sections' => json_decode($jsonData->sections, true),
        // ], JSON_PRETTY_PRINT);

        // file_put_contents($filePath, $jsonContent);

        // Cari file berdasarkan formName tanpa timestamp
        $formNameSlug = Str::slug($id);
        // $files = glob(storage_path("app/entities/*_{$formNameSlug}.json"));
        $files = glob(base_path("automate/entities/*_{$formNameSlug}.json"));

        if (empty($files)) {
            return response()->json(['message' => 'File not found!'], 404);
        }

        // Ambil file pertama yang cocok
        $filePath = $files[0];

        // Update JSON content
        $jsonContent = json_encode([
            'formName' => $id,
            'sections' => $request->input('sections', []),
        ], JSON_PRETTY_PRINT);

        file_put_contents($filePath, $jsonContent);

        return response()->json([
            'message' => 'Data has been updated and saved to file!',
            'data' => $jsonData,
        ]);
    }
}