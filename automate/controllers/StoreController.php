<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index()
    {
        return Store::all();
    }

    public function store(Request $request)
    {
        return Store::create($request->all());
    }

    public function show(Store $store)
    {
        return $store;
    }

    public function update(Request $request, Store $store)
    {
        $store->update($request->all());
        return $store;
    }

    public function destroy(Store $store)
    {
        $store->delete();
        return response()->noContent();
    }
}