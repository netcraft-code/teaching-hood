<?php

namespace App\Console\Commands;

use App\Models\City;
use App\Models\GradeLevel;
use App\Models\JobPost;
use App\Models\State;
use App\Models\Subject;
use Carbon\Carbon;
use Illuminate\Console\Command;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Facades\Excel;

class ImportData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filePath = public_path('Job Database 070226.xlsx');

        if (!file_exists($filePath)) {
            dd('File not found');
        }

        $xlsFileData = Excel::toArray([], $filePath)[0];

        foreach ($xlsFileData as $key => $data) {
            if ($key == 0) continue; // skip header row

            // City
            if (!empty($data[2])) {
                $city = City::updateOrCreate(
                    ['name' => trim($data[2])],
                    ['name' => trim($data[2])]
                );
            }

            // State
            if (!empty($data[3])) {
                $state = State::updateOrCreate(
                    ['name' => trim($data[3])],
                    ['name' => trim($data[3])]
                );
            }

            // Subject
            $subject = NULL;
            if (!empty($data[7])) {
                $subject = Subject::updateOrCreate(
                    ['name' => trim($data[7])],
                    ['name' => trim($data[7])]
                );
            }

            // Grade Level
            $grade = NULl;
            if (!empty($data[8])) {
                $grade = GradeLevel::updateOrCreate(
                    ['name' => trim($data[8])],
                    ['name' => trim($data[8])]
                );
            }

            $schoolName = $data[1];
            $board = $data[5];
            $minSalary = null;
            $maxSalary = null;

            if (!empty($data[9])) {
                $salaryParts = explode('-', $data[9]);

                if (isset($salaryParts[0])) {
                    $minSalary = (int) str_replace(',', '', trim($salaryParts[0]));
                }

                if (isset($salaryParts[1])) {
                    $maxSalary = (int) str_replace(',', '', trim($salaryParts[1]));
                }
            }

            if ($data[10] != 'n/a') {
                $experience = (float) $data[10];

                if ($experience < 1) {
                    $experienceValue = 'fresher';
                } elseif ($experience >= 1 && $experience < 3) {
                    $experienceValue = '1-3';
                } elseif ($experience >= 3 && $experience < 5) {
                    $experienceValue = '3-5';
                } else {
                    $experienceValue = '5+';
                }
            }

            $minExperience = $experienceValue;
            $contactEmail = $data[16];
            $contactPhone = $data[17];
            $qualification = $data[11];
            $position = $data[6];

            if ($data[14] != 'Not mentioned ') {
                if (!empty($data[14])) {
                    if (is_numeric($data[14])) {
                        $date = Date::excelToDateTimeObject($data[14]);
                    } else {
                        $date = Carbon::parse($data[14]);
                    }

                    $formattedDate = Carbon::instance($date)
                        ->addDays(30)
                        ->format('Y-m-d');
                }
            }

            if ($schoolName) {
                JobPost::create([
                    'school_name' =>  $schoolName,
                    'city_id' =>  $city->id,
                    'subject_id' =>  $subject ? $subject->id : NULL,
                    'grade_id' =>  $grade ? $grade->id : NULL,
                    'food' =>  0,
                    'accommodation' =>  0,
                    'job_type' =>  "Full Time",
                    'application_deadline' =>  $formattedDate,
                    'min_salary' =>  $minSalary,
                    'max_salary' =>  $maxSalary,
                    'experience_required' =>  $minExperience,
                    'job_description' =>  $qualification,
                    'qualification_requirements' =>  $qualification,
                    'contact_email' =>  $contactEmail,
                    'contact_phone' =>  $contactPhone,
                    'status' =>  1,
                    'position' =>  $position,
                    'board' => $board
                ]);
            }
        }
    }
}
