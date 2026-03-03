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

class ImportStatesCities extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-state-city';

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
        $filePath = public_path('City List with State.xlsx');

        if (!file_exists($filePath)) dd('File not found');

        $xlsFileData = Excel::toArray([], $filePath)[0];

        foreach ($xlsFileData as $key => $data) {
            if ($key == 0) continue;

            if (!empty($data[0])) {
                $state = State::updateOrCreate(
                    ['name' => trim($data[0])],
                    ['name' => trim($data[0])]
                );
            }

            if (!empty($data[1])) {
                City::updateOrCreate(
                    ['name' => explode(' ', trim($data[1]))[0], 'state_id' => $state->id],
                    ['name' => explode(' ', trim($data[1]))[0], 'state_id' => $state->id]
                );
            }
        }
    }
}
