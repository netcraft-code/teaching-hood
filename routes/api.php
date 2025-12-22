<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('send-otp', [AuthController::class, 'sendOTP']);
    Route::post('verify-otp', [AuthController::class, 'verifyOTP']);

    Route::post('logout', [AuthController::class, 'logout']);
});
