<?php

use App\Http\Controllers\ToDoController;
use Illuminate\Support\Facades\Route;

Route::controller(ToDoController::class)->group(function () {
    Route::get('/todo', 'all');
    Route::get('/todo/{id}', 'get');
    Route::post('/todo', 'add');
    Route::put('/todo/{id}', 'put');
    Route::delete('/todo/{id}', 'del');
    Route::delete('/todo', 'clear');
});
