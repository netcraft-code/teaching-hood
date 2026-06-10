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
    'message' => 'The password you entered is incorrect'
];

const EMAIL_NOT_FOUND_401 = [
    'response_code' => 401,
    'status' => false,
    'message' => 'No account found with this email. Please check and try again'
];

const DEFAULT_LOGGED_OUT_200 = [
    'response_code' => 200,
    'status' => true,
    'message' => 'Logged out'
];

const DEFAULT_MESSAGE_SENT_200 = [
    'response_code' => 200,
    'status' => true,
    'message' => 'Message sent successfully'
];

const DEFAULT_PASSWORD_RESET_200 = [
    'response_code' => 200,
    'status' => true,
    'message' => 'Password reset successfully'
];

const DEFAULT_SERVER_ERROR_500 = [
    'response_code' => 500,
    'status' => false,
    'message' => 'Internal server error'
];

const DEFAULT_VALIDATION_422 = [
    'response_code' => 422,
    'status' => false,
    'message' => 'Validation error'
];

const DEFAULT_CREATED_201 = [
    'response_code' => 201,
    'status' => true,
    'message' => 'Resource created successfully'
];

const DEFAULT_UPDATED_200 = [
    'response_code' => 200,
    'status' => true,
    'message' => 'Resource updated successfully'
];

const DEFAULT_DELETED_200 = [
    'response_code' => 200,
    'status' => true,
    'message' => 'Resource deleted successfully'
];

const DEFAULT_BAD_REQUEST_400 = [
    'response_code' => 400,
    'status' => false,
    'message' => 'Bad Request'
];
