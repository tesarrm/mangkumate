<?php

use Illuminate\Support\Facades\Route;

Route::apiResource('company', \App\Http\Controllers\CompanyController::class);
Route::apiResource('store', \App\Http\Controllers\StoreController::class);
