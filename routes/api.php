<?php

use Illuminate\Support\Facades\Route;

Route::apiResource('builders', \App\Http\Controllers\BuilderController::class);
Route::apiResource('companies', \App\Http\Controllers\CompanyController::class);
Route::apiResource('stores', \App\Http\Controllers\StoreController::class);
