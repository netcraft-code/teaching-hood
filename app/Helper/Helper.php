<?php

if (!function_exists('response_formatter')) {
    function response_formatter($response, $data = null, $extraDatas = [])
    {
        $payload = [
            'response_code' => $response['response_code'],
            'status'        => $response['status'],
            'message'       => $response['message'],
        ];

        if (!is_null($data)) {
            $payload['data'] = $data;
        }

        foreach ($extraDatas as $key => $extraData) {
            $payload[$key] = $extraData;
        }

        return response()->json($payload, $response['response_code']);
    }
}

function calculateProfileCompletion($user)
{
    $fields = [
        '1' => [
            'first_name' => 10,
            'last_name' => 10,
            'email' => 10,
            'phone' => 10,
            'avatar_url' => 10,
            'banner_image_url' => 10,
            'experience' => 10,
            'education' => 10,
            'achievement' => 10,
            'certification' => 10,
            'resume' => 10
        ],
        '2' => [
            'first_name' => 10,
            'last_name' => 10,
            'email' => 10,
            'phone' => 10,
            'avatar_url' => 10,
            'banner_image_url' => 10,
            'about_us' => 10,
            'website' => 10,
            'why_join_us' => 10,
        ]
    ];

    // 🔥 Step 1: detect type
    $type = $user->user_type; // 'teacher' or 'school'

    if (!isset($fields[$type])) {
        return 0;
    }

    $selectedFields = $fields[$type];

    $totalWeight = array_sum($selectedFields);
    $completedWeight = 0;
    $missingFields = [];

    foreach ($selectedFields as $field => $weight) {

        // ✅ Relation fields
        if ($field === 'education') {
            if ($user->additional_info->education) {
                $completedWeight += $weight;
            } else {
                $missingFields[] = $field;
            }
        } elseif ($field === 'experience') {
            if ($user->additional_info->experience) {
                $completedWeight += $weight;
            } else {
                $missingFields[] = $field;
            }
        } elseif ($field === 'achievement') {
            if ($user->additional_info->achievement) {
                $completedWeight += $weight;
            } else {
                $missingFields[] = $field;
            }
        } elseif ($field === 'certification') {
            if ($user->additional_info->certification) {
                $completedWeight += $weight;
            } else {
                $missingFields[] = $field;
            }
        } elseif ($field === 'about_us' || $field === 'website' || $field === 'why_join_us') {
            if ($user->additional_info->about_us || $user->additional_info->website || $user->additional_info->why_join_us) {
                $completedWeight += $weight;
            } else {
                $missingFields[] = $field;
            }
        } else {
            if (!empty($user->$field)) {
                $completedWeight += $weight;
            } else {
                $missingFields[] = $field;
            }
        }
    }

    $percentage = $totalWeight > 0
        ? round(($completedWeight / $totalWeight) * 100)
        : 0;

    return [
        'percentage' => $percentage,
        'missing_fields' => $missingFields
    ];
}
