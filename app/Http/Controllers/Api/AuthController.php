<?php

namespace App\Http\Controllers\Api;

use Auth;
use App\Http\Controllers\Controller;
use App\Mail\OtpMail;
use App\Mail\QueryMessageMail;
use App\Models\User;
use App\Models\QueryMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'first_name'      => 'required|string',
            'last_name'      => 'nullable|string',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|min:6',
            'user_type' => 'required|in:1,2,3', // 1 = Teacher, 2 = School, 3 = Recuiter
            'city'      => 'required_if:user_type,2,3',
            'phone'     => 'required|unique:users,phone',
            'otp'        => 'required|digits:4'
        ]);

        $email = $request->email;
        $enteredOtp = $request->otp;

        // 🔍 Check OTP from cache
        $cachedData = Cache::get('otp_' . $email);

        if (!$cachedData) {
            return response()->json([
                'success' => false,
                'message' => 'OTP expired or not found.'
            ], 400);
        }

        // 🔐 Verify OTP
        if (!Hash::check($enteredOtp, $cachedData['otp'])) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid OTP.'
            ], 400);
        }

        // ✅ OTP Verified — remove it
        Cache::forget('otp_' . $email);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,
            'city' => $request->city,
            'phone' => $request->phone,
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

    public function sendOTPOnRegisteration(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $email = $request->email;

        // 🔒 Rate limit (prevent spam - 1 OTP per 60 seconds)
        if (Cache::has('otp_rate_limit_' . $email)) {
            return response()->json([
                'success' => false,
                'message' => 'Please wait before requesting another OTP.'
            ], 429);
        }

        // 🎯 Generate 4 digit OTP
        $otp = random_int(1000, 9999);

        // 🔐 Store Hashed OTP in Cache (valid for 5 minutes)
        Cache::put(
            'otp_' . $email,
            [
                'otp' => Hash::make($otp),
                'expires_at' => now()->addMinutes(5)
            ],
            now()->addMinutes(5)
        );

        // ⏱ Set rate limit key (60 seconds)
        Cache::put('otp_rate_limit_' . $email, true, now()->addSeconds(60));

        // 📩 Send OTP Mail
        Mail::to($email)->send(new OtpMail($otp));

        return response()->json([
            'success' => true,
            'message' => 'OTP sent successfully to your email.',
        ], 200);
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

        if ($user['avatar_url']) {
            $user['avatar_url'] = url('/') . "/storage/" . $user['avatar_url'];
        }

        if ($user['banner_image_url']) {
            $user['banner_image_url'] = url('/') . "/storage/" . $user['banner_image_url'];
        }

        return response_formatter(DEFAULT_200, $user);
    }

    // USER PROFILE
    public function profile()
    {
        $data = auth()->user()->load('additional_info.grade_levels', 'additional_info.subjects', 'addresses', 'job_posts');
        $data['totalActiveJobs'] = $data['job_posts']->count();

        if ($data['avatar_url']) {
            $data['avatar_url'] = url('/') . "/storage/" . $data['avatar_url'];
        }

        if ($data['banner_image_url']) {
            $data['banner_image_url'] = url('/') . "/storage/" . $data['banner_image_url'];
        }

        return response_formatter(DEFAULT_200, $data);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response_formatter(DEFAULT_LOGGED_OUT_200);
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
        $user['token'] = $token;

        return response_formatter(DEFAULT_VERIFY_OTP_200, $user);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'old_password' => ['required', 'current_password'],
            'new_password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->old_password, $user->password)) {
            return response_formatter(DEFAULT_INVALID_CREDENTAILS_401);
        }

        $user->update([
            'password' => $request->new_password
        ]);

        return response_formatter(DEFAULT_PASSWORD_RESET_200);
    }

    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string',
            'attachment' => 'nullable|file|max:5120|mimes:pdf,doc,docx,jpg,jpeg,png',
        ]);

        DB::beginTransaction();

        try {
            // ✅ STORE MESSAGE FIRST
            QueryMessage::create($validated);

            // ✅ SEND EMAIL TO ADMIN (recommended)
            Mail::to(config('mail.from.address'))
                ->send(new QueryMessageMail($validated));

            $attachmentPath = null;
            if ($request->hasFile('attachment')) {
                $attachmentPath = $request->file('attachment')
                    ->store('query-attachments', 'public');
            }

            DB::commit();

            return response_formatter(DEFAULT_MESSAGE_SENT_200);
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Query message failed', [
                'error' => $e->getMessage(),
            ]);

            return response_formatter(DEFAULT_SERVER_ERROR_500);
        }
    }

    public function specificProfile($id)
    {
        $user = User::with('additional_info.subjects', 'additional_info.grade_level', 'addresses')->find($id);

        if ($user['avatar_url']) {
            $user['avatar_url'] = url('/') . "/storage/" . $user['avatar_url'];
        }

        if ($user['banner_image_url']) {
            $user['banner_image_url'] = url('/') . "/storage/" . $user['banner_image_url'];
        }

        return response_formatter(DEFAULT_200, $user);
    }
}
