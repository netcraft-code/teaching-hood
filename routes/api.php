<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobPostController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('send-otp', [AuthController::class, 'sendOTP']);
Route::post('verify-otp', [AuthController::class, 'verifyOTP']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);

    Route::post('logout', [AuthController::class, 'logout']);

    Route::post('change-password', [AuthController::class, 'changePassword']);

    // create job post
   Route::apiResource('job-posts', JobPostController::class);

   Route::post('send-message', [AuthController::class, 'sendMessage']);
});


