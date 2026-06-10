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
            'experience' => 10,
            'education' => 10,
            'achievement' => 10,
            'certification' => 10,
            'resume' => 10,
            'about_us' => 10,
            'availability' => 10,
            'notice_period' => 10,
            'min_salary' => 10,
            'max_salary' => 10,
            'preferred_location' => 10,
        ],
        '2' => [
            'first_name' => 10,
            'email' => 10,
            'phone' => 10,
            'avatar_url' => 10,
            'about_us' => 10,
            'website' => 10,
            'why_join_us' => 10,
            'students' => 10,
            'teachers' => 10
        ],
        '3' => [
            'first_name' => 10,
            'email' => 10,
            'phone' => 10,
            'avatar_url' => 10,
            'about_us' => 10,
            'website' => 10,
            'why_join_us' => 10,
            'students' => 10,
            'teachers' => 10
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
        $info = $user->additional_info;
        if ($field === 'education') {
            if ($info?->education) $completedWeight += $weight;
            else $missingFields[] = $field;
        } elseif ($field === 'experience') {
            if ($info?->experience) $completedWeight += $weight;
            else $missingFields[] = $field;
        } elseif ($field === 'achievement') {
            if ($info?->achievement) $completedWeight += $weight;
            else $missingFields[] = $field;
        } elseif ($field === 'certification') {
            if ($info?->certification) $completedWeight += $weight;
            else $missingFields[] = $field;
        } elseif ($field === 'resume') {
            if ($info?->resume) $completedWeight += $weight;
            else $missingFields[] = $field;
        } elseif ($field === 'min_salary') {
            if (isset($info?->min_salary)) $completedWeight += $weight;
            else $missingFields[] = $field;
        } elseif ($field === 'max_salary') {
            if ($info?->max_salary) $completedWeight += $weight;
            else $missingFields[] = $field;
        } elseif ($field === 'students') {
            if ($info?->students) $completedWeight += $weight;
            else $missingFields[] = $field;
        } elseif ($field === 'teachers') {
            if ($info?->teachers) $completedWeight += $weight;
            else $missingFields[] = $field;
        } elseif (in_array($field, ['about_us', 'website', 'why_join_us', 'availability', 'notice_period', 'preferred_location'])) {
            if (!empty($info?->$field)) {
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
