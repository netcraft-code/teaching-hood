<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HelperController;
use App\Http\Controllers\Api\JobPostController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RazorpayController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('send-otp-register', [AuthController::class, 'sendOTPOnRegisteration']);

Route::post('login', [AuthController::class, 'login']);
Route::get('view-profile/{id}', [AuthController::class, 'specificProfile']);
Route::get('city', [HelperController::class, 'city']);

Route::get('city/jobs', [JobPostController::class, 'getMaxCitiesJobs']);
Route::get('subject/jobs', [JobPostController::class, 'getMaxSubjectsJobs']);
Route::get('grade/jobs', [JobPostController::class, 'getMaxGradesJobs']);

Route::post('send-otp', [AuthController::class, 'sendOTP']);
Route::post('verify-otp', [AuthController::class, 'verifyOTP']);
Route::get('subjects', [HelperController::class, 'getSubjects']);
Route::get('gradelevels', [HelperController::class, 'getGradeLevel']);

Route::get('create-payment-link', [RazorpayController::class, 'createPaymentLink']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('image/update', [ProfileController::class, 'updateImage']);

    Route::get('profile', [AuthController::class, 'profile']);

    Route::get('states', [HelperController::class, 'states']);
    Route::get('countries', [HelperController::class, 'countries']);

    Route::post('profile/update', [ProfileController::class, 'update']);

    Route::post('logout', [AuthController::class, 'logout']);

    Route::post('change-password', [AuthController::class, 'changePassword']);

    Route::post('like', [JobPostController::class, 'like']);

    Route::apiResource('job-posts', JobPostController::class);

    Route::prefix('job-post')->group(function () {
        Route::post('update/{id}', [JobPostController::class, 'close']);
        Route::get('current/vacanies', [JobPostController::class, 'currentVacanies']);
        Route::get('apply/job/{id}', [JobPostController::class, 'applyJob']);
    });

    Route::post('send-message', [AuthController::class, 'sendMessage']);

    Route::post('payment/success', [RazorpayController::class, 'success']);
});

Route::get('job-posts', [JobPostController::class, 'index']);
Route::get('job-posts/{job_post}', [JobPostController::class, 'show']);
