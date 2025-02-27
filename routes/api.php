<?php

use App\Http\Controllers\TableJsonController;
use Illuminate\Support\Facades\Route;

Route::apiResource('builders', \App\Http\Controllers\BuilderController::class);
Route::apiResource('companies', \App\Http\Controllers\CompanyController::class);
Route::apiResource('stores', \App\Http\Controllers\StoreController::class);
Route::post('/save-tablejson', [TableJsonController::class, 'store']);
Route::get('/tablejson/{form_name}', [TableJsonController::class, 'show']);
Route::patch('/tablejson/{form_name}', [TableJsonController::class, 'update']);