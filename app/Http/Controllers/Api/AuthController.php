<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\OtpMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Auth;

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        $request->validate([
            'name'      => 'required|string',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|min:6',
            'user_type' => 'required|in:1,2,3', // 1 = Teacher, 2 = School, 3 = Recuiter
            'city'      => 'required_if:user_type,2,3',
            'phone'     => 'required|unique:users,phone',
            'school_name' => 'required_if:user_type,2',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,
            'city' => $request->city,
            'phone' => $request->phone,
            'school_name' => $request->school_name,
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response_formatter(
            DEFAULT_REGISTERED_200,
            [
                'user' => $user,
                'token' => $token
            ]
        );
    }

    // LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response_formatter(DEFAULT_INVALID_CREDENTAILS_401);
        }

        $token = $user->createToken('api-token')->plainTextToken;
        $user['token'] = $token;

        return response_formatter(
            DEFAULT_200,
            $user
        );
    }

    // USER PROFILE
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response_formatter(DEFAULT_LOGGED_OUT_401);
    }

    public function sendOTP(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(DEFAULT_NOT_FOUND_404);
        }

        // Generate OTP
        $otp = rand(1000, 9999);

        // Store OTP securely (recommended)
        $user->otp = bcrypt($otp);
        $user->otp_expires_at = now()->addMinutes(10);
        $user->save();

        // Send OTP mail
        Mail::to($user->email)->send(new OtpMail($otp));

        return response_formatter(DEFAULT_SENT_OTP_200);
    }

    public function verifyOTP(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp'   => 'required|digits:4',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(DEFAULT_NOT_FOUND_404);
        }

        // Check OTP expiry
        if (!$user->otp_expires_at || now()->gt($user->otp_expires_at)) {
            return response_formatter(DEFAULT_EXPIRED_400);
        }

        // Verify OTP
        if (!Hash::check($request->otp, $user->otp)) {
            return response_formatter(DEFAULT_INVALID_401);
        }

        // ✅ LOGIN USER
        Auth::login($user);

        // ✅ CREATE TOKEN
        $token = $user->createToken('auth_token')->plainTextToken;

        // Mark user as verified (optional)
        $user->email_verified_at = now();
        $user->otp = null;
        $user->otp_expires_at = null;
        $user->save();

        return response_formatter(
            DEFAULT_VERIFY_OTP_200,
            [
                'token' => $token,
                'user' => $user
            ]
        );
    }
    
}
