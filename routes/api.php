<?php

use Illuminate\Support\Facades\Route;

Route::apiResource('builders', \App\Http\Controllers\BuilderController::class);

Route::apiResource('berats', \App\Http\Controllers\BeratController::class);
Route::apiResource('categories', \App\Http\Controllers\CategoryController::class);
Route::apiResource('Product', \App\Http\Controllers\ProductController::class);
