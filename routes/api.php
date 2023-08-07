<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\PassportAuthController;
use App\Http\Controllers\PersonalDataController;
use App\Http\Controllers\MaintenanceRequestController;
use App\Http\Controllers\WorkOrderController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);

Route::middleware('auth:api')->group( function () {
    Route::get('StudentIndex', [StudentController::class, 'index']);
});
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//RUTAS NO PROTEGIDAS POR TOKEN

Route::post('/login', [UserController::class, 'login']);
Route::post('/personalData_registerPersonalUser',[PersonalDataController::class, 'registerPersonalUser']);
Route::post('/user_register',[UserController::class, 'register']);
Route::post('/maintenance_store',[MaintenanceRequestController::class, 'store']);
Route::get('/maintenance_active/{id}',[MaintenanceRequestController::class, 'showMaintenanceRequestActive']);
Route::get('/maintenance_released/{id}',[MaintenanceRequestController::class, 'showMaintenanceRequestReleased']);
Route::get('/showCombinedData/{id}',[MaintenanceRequestController::class, 'showCombinedData']);
Route::get('/maintenance_show/{id}',[MaintenanceRequestController::class, 'show']);

Route::get('/maintenance_WorkOrder/{id}',[WorkOrderController::class, 'showWOPending']);
Route::post('/user_update/{id}',[UserController::class,'update']);

Route::get('/personalData_show/{id}',[PersonalDataController::class, 'show']);
Route::get('/user_show/{id}',[UserController::class, 'show']);
Route::get('/workorder_pending/{id}',[WorkOrderController::class, 'showWorkOrderPending']);
Route::get('/workorder_approved/{id}',[WorkOrderController::class, 'showWorkOrderApproved']);
Route::get('/workorder_released/{id}',[WorkOrderController::class, 'showWorkOrderReleased']);
Route::get('/showToken',[PersonalDataController::class,'showToken']);

Route::post('/workorder_store',[WorkOrderController::class, 'store']);


Route::middleware('auth:api') ->group(function(){

//PERSONAL DATA
Route::post('/personalData_store',[PersonalDataController::class, 'store']);
Route::post('/personalData_update/{id}',[PersonalDataController::class,'update']);
Route::delete('/personalData_destroy/{id}',[PersonalDataController::class, 'destroy']);
Route::get('/personalData_index',[PersonalDataController::class, 'index']);
Route::put('/personalData_updateProfile/{id}',[PersonalDataController::class,'updateProfile']);
Route::get('/personalData_showMaintenancePerson',[PersonalDataController::class, 'showMaintenancePerson']);
Route::get('/user_showUsers',[PersonalDataController::class, 'showUsers']);


//User

Route::delete('/user_destroy/{id}',[UserController::class, 'destroy']);
Route::get('/user_index',[UserController::class, 'index']);
Route::get('/user_authProfile',[UserController::class, 'authProfile']);


//Maintenance Request
Route::get('/maintenance_index',[MaintenanceRequestController::class, 'index']);
Route::post('/maintenance_update/{id}',[MaintenanceRequestController::class,'update']);
Route::delete('/maintenance_destroy/{id}',[MaintenanceRequestController::class, 'destroy']);
Route::get('/maintenance_showEarring',[MaintenanceRequestController::class, 'showEarring']);
Route::get('/maintenance_showRelease',[MaintenanceRequestController::class, 'showRelease']);
Route::get('/maintenance_showActiveRequest',[MaintenanceRequestController::class, 'showActiveRequest']);



//Work Order
Route::get('/workorder_index',[WorkOrderController::class, 'index']);
Route::get('/workorder_show/{id}',[WorkOrderController::class, 'show']);
Route::post('/workorder_update/{id}',[WorkOrderController::class,'update']);
Route::delete('/workorder_destroy/{id}',[WorkOrderController::class, 'destroy']);
Route::get('/workorder_showApproved',[WorkOrderController::class, 'showApproved']);
Route::get('/workorder_showRequestHistory',[WorkOrderController::class, 'showRequestHistory']);
Route::get('/workorder_showRelease',[WorkOrderController::class, 'showRelease']);
Route::post('/workorder_newOrder',[WorkOrderController::class, 'newOrder']);
Route::post('/workorder_approvedOrder/{id}',[WorkOrderController::class, 'approvedOrder']);
Route::get('/workorder_showEarring',[WorkOrderController::class, 'showEarring']);
Route::get('/showWorkOrder/{id}',[MaintenanceRequestController::class, 'showWorkOrder']);
});