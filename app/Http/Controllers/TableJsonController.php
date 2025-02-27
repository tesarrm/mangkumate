<?php

namespace App\Http\Controllers;

use App\Models\TableJson;
use Illuminate\Http\Request;

class TableJsonController extends Controller
{
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'formName' => 'required|string',
            'sections' => 'nullable|array',
        ]);

        // Simpan data ke database
        $jsonData = TableJson::create([
            'form_name' => $request->input('formName'),
            'sections' => json_encode($request->input('sections', [])), // Simpan sections sebagai JSON
        ]);

        return response()->json([
            'message' => 'Data saved successfully!',
            'data' => $jsonData,
        ], 201);
    }

    public function show($form_name)
    {
        $data = TableJson::where('form_name', $form_name)->first();

        if (!$data) {
            return response()->json([
                'message' => 'Data not found'
            ], 404);
        }

        return response()->json($data);
    }

    public function update(Request $request, $form_name)
    {
        // Cari data berdasarkan form_name
        $jsonData = TableJson::where('form_name', $form_name)->first();

        if (!$jsonData) {
            return response()->json([
                'message' => 'Data not found'
            ], 404);
        }

        // Validasi input
        $request->validate([
            'formName' => 'sometimes|string', // Opsional, hanya divalidasi jika ada
            'sections' => 'sometimes|array', // Opsional, hanya divalidasi jika ada
        ]);

        // Perbarui data
        if ($request->has('formName')) {
            $jsonData->form_name = $request->input('formName');
        }

        if ($request->has('sections')) {
            $jsonData->sections = json_encode($request->input('sections'));
        }

        $jsonData->save();

        return response()->json([
            'message' => 'Data updated successfully!',
            'data' => $jsonData,
        ]);
    }
}
