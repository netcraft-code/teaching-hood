<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HelperController;
use App\Http\Controllers\Api\JobPostController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('view-profile/{id}', [AuthController::class, 'specificProfile']);
Route::get('city', [HelperController::class, 'city']);

Route::get('city/jobs', [JobPostController::class, 'getMaxCitiesJobs']);

Route::post('send-otp', [AuthController::class, 'sendOTP']);
Route::post('verify-otp', [AuthController::class, 'verifyOTP']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('image/update', [ProfileController::class, 'updateImage']);

    Route::get('profile', [AuthController::class, 'profile']);
    Route::get('subjects', [HelperController::class, 'getSubjects']);
    Route::get('gradelevels', [HelperController::class, 'getGradeLevel']);

    Route::get('states', [HelperController::class, 'states']);
    Route::get('countries', [HelperController::class, 'countries']);

    Route::post('profile/update', [ProfileController::class, 'update']);

    Route::post('logout', [AuthController::class, 'logout']);

    Route::post('change-password', [AuthController::class, 'changePassword']);

    Route::apiResource('job-posts', JobPostController::class);

    Route::post('send-message', [AuthController::class, 'sendMessage']);
});
