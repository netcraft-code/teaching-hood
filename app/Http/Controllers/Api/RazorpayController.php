<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Exception;
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
                'description' => 'Subscription',
                'customer' => [
                    'name' => $request->user_name,
                    'email' => $request->email,
                    'contact' => $request->phone,
                ],
                'notify' => [
                    'sms' => true,
                    'email' => true,
                ],
                'callback_url' => config('app.frontend_url') . "/profile",
                'callback_method' => 'get'
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

    public function success(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'razorpay_payment_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response_formatter(DEFAULT_VALIDATION_422, $validator->errors());
        }

        try {
            $payment = $this->api->payment->fetch($request->razorpay_payment_id);
            if ($payment->status !== 'captured') {
                return response()->json([
                    'status' => false,
                    'message' => 'Payment not captured'
                ], 400);
            }

            $method = $payment['method'] ?? 'unknown';
            $card_last4 = $payment['card']['last4'] ?? null;
            $card_network = $payment['card']['network'] ?? null;

            $currency = $payment['currency'];
            $status = $payment['status'];
            $payment_id = $payment['id'];
            $amount = $payment['amount'];

            // Prepare payload for Laravel API
            $data = [
                'payment_id' => $payment_id,
                'currency'   => $currency,
                'status'     => $status,
                'user_id'    => auth()->user()->id,
                'method'     => $method,
                'card_last'  => $card_last4,
                'amount'     => $amount,
                // 'card_network'  => $card_network,
            ];

            Payment::create($data);

            return response()->json([
                'status' => true,
                'message' => 'Payment verified successfully',
                'data' => $data
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
