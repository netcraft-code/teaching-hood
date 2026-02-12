<?php

namespace App\Console\Commands;

use App\Models\City;
use App\Models\GradeLevel;
use App\Models\State;
use App\Models\Subject;
use Illuminate\Console\Command;
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
                City::updateOrCreate(
                    ['name' => trim($data[2])],
                    ['name' => trim($data[2])]
                );
            }

            // State
            if (!empty($data[3])) {
                State::updateOrCreate(
                    ['name' => trim($data[3])],
                    ['name' => trim($data[3])]
                );
            }

            // Subject
            if (!empty($data[7])) {
                Subject::updateOrCreate(
                    ['name' => trim($data[7])],
                    ['name' => trim($data[7])]
                );
            }

            // Grade Level
            if (!empty($data[8])) {
                GradeLevel::updateOrCreate(
                    ['name' => trim($data[8])],
                    ['name' => trim($data[8])]
                );
            }
        }
    }
}
