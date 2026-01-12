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
        $subjects = Subject::all();

        return response_formatter(DEFAULT_200, $subjects);
    }

    public function getGradeLevel()
    {
        $gradelevel = GradeLevel::all();

        return response_formatter(DEFAULT_200, $gradelevel);
    }

    public function city()
    {
        $cities = City::all();

        return response_formatter(DEFAULT_200, $cities);
    }

    public function states()
    {
        $states = State::all();

        return response_formatter(DEFAULT_200, $states);
    }

    public function countries()
    {
        $countries = Country::all();

        return response_formatter(DEFAULT_200, $countries);
    }
}
