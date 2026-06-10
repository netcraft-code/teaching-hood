<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class JobVisibility extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:job-visibility';

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
        $users = User::whereNotNull('plan_id')
            ->get();

        dd($users);
    }
}
