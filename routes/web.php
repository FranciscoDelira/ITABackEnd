<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/

Route::view('{path?}', 'welcome')
    ->where('path', '.*');

Route::post('RutaStudentIndex', [StudentController::class, 'index']);

Route::get('get_token', [StudentController::class, 'get_token']);

Route::get('Store', [StudentController::class, 'store']);

Route::post('StorePost', [StudentController::class, 'store']);

Route::get('Index', [StudentController::class, 'index']);

Route::post('StudentDestroy', [StudentController::class, 'destroy']);

Route::post('StudentUpdate', [StudentController::class, 'update']);


