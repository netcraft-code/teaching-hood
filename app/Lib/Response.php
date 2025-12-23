<?php

const DEFAULT_REGISTERED_200 = [
    'response_code' => 200,
    'status' => true,
    'message' => 'successfully registered'
];

const DEFAULT_200 = [
    'response_code' => 200,
    'status' => true,
    'message' => 'successfully data fetched'
];

const DEFAULT_SENT_OTP_200 = [
    'response_code' => 200,
    'status' => true,
    'message' => 'successfully sent OTP Valid for 10 minutes'
];

const DEFAULT_NOT_FOUND_404 = [
    'response_code' => 404,
    'status' => false,
    'message' => 'User not found'
];

const DEFAULT_VERIFY_OTP_200 = [
    'response_code' => 200,
    'status' => true,
    'message' => 'OTP verified successfully & logged in successfully'
];

const DEFAULT_400 = [
    'response_code' => 400,
    'status' => false,
    'message' => 'Bad Request'
];

const DEFAULT_EXPIRED_400 = [
    'response_code' => 400,
    'status' => false,
    'message' => 'OTP expired'
];

const DEFAULT_INVALID_401 = [
    'response_code' => 401,
    'status' => false,
    'message' => 'Invalid OTP'
];

const DEFAULT_INVALID_CREDENTAILS_401 = [
    'response_code' => 401,
    'status' => false,
    'message' => 'Invalid credentials'
];

const DEFAULT_LOGGED_OUT_401 = [
    'response_code' => 401,
    'status' => true,
    'message' => 'Logged out'
];
