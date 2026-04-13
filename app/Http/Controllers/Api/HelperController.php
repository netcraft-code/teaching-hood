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
        $query = City::query();

        // Filter by state
        if (request()->has('state_id')) {
            $query->where('state_id', request('state_id'));
        }

        // Search by city name
        if (request()->has('search') && request('search') != '') {
            $search = request('search');

            $query->where('name', 'like', '%' . $search . '%')
                ->orderByRaw("
                  CASE 
                      WHEN name = ? THEN 1
                      WHEN name LIKE ? THEN 2
                      ELSE 3
                  END
              ", [$search, $search . '%'])
                ->orderBy('name', 'asc');
        } else {
            $query->orderBy('name', 'asc');
        }

        // Pagination (default 10 per page)
        $perPage = request()->get('per_page', 20);

        $cities = $query->paginate($perPage);

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
