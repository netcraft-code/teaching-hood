<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use App\Models\GradeLevel;
use App\Models\State;
use App\Models\Subject;

class HelperController extends Controller
{
    public function getSubjects()
    {
        $subjects = Subject::orderBy('name', 'asc')->get();

        return response_formatter(DEFAULT_200, $subjects);
    }

    public function getGradeLevel()
    {
        $gradelevel = GradeLevel::orderBy('name', 'asc')->get();

        return response_formatter(DEFAULT_200, $gradelevel);
    }

    public function city()
    {
        $cities = City::orderBy('name', 'asc');

        if (request()->has('state_id')) {
            $cities = $cities->where('state_id', request('state_id'));
        }

        $cities = $cities->get();

        return response_formatter(DEFAULT_200, $cities);
    }

    public function states()
    {
        $states = State::orderBy('name', 'asc')->get();

        return response_formatter(DEFAULT_200, $states);
    }

    public function countries()
    {
        $countries = Country::orderBy('name', 'asc')->get();

        return response_formatter(DEFAULT_200, $countries);
    }
}
