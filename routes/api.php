<?php

use Illuminate\Support\Facades\Route;

Route::apiResource('builders', \App\Http\Controllers\BuilderController::class);

Route::apiResource('Product', \App\Http\Controllers\ProductController::class);
Route::apiResource('Item', \App\Http\Controllers\ItemController::class);
Route::apiResource('Category', \App\Http\Controllers\CategoryController::class);
