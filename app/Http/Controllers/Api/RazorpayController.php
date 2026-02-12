<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Razorpay\Api\Api;

class RazorpayController extends Controller
{
    protected $api;

    public function __construct()
    {
        $this->api = new Api(
            config('services.razorpay.key'),
            config('services.razorpay.secret')
        );
    }

    public function createPaymentLink(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:1',
            'user_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required'
        ]);

        if ($validator->fails()) {
            return response_formatter(DEFAULT_VALIDATION_422, $validator->errors());
        }

        try {

            $api = new Api(
                config('services.razorpay.key'),
                config('services.razorpay.secret')
            );

            $paymentLink = $api->paymentLink->create([
                'amount' => $request->amount * 100, // convert to paise
                'currency' => 'INR',
                'description' => 'Rent Payment',
                'customer' => [
                    'name' => $request->user_name,
                    'email' => $request->email,
                    'contact' => $request->phone,
                ],
                'notify' => [
                    'sms' => true,
                    'email' => true,
                ],
                // 'callback_url' => route('razorpay.callback'),
                // 'callback_method' => 'get'
            ]);

            return response()->json([
                'status' => true,
                'payment_link' => $paymentLink['short_url'],
                'link_id' => $paymentLink['id']
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
