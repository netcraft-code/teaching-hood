<?php

function response_formatter($response, $data = null)
{
    $payload = [
        'response_code' => $response['response_code'],
        'status'        => $response['status'],
        'message'       => $response['message'],
    ];

    if (!is_null($data)) {
        $payload['data'] = $data;
    }

    return response()->json($payload);
}
