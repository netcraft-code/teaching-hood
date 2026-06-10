<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppliedJob extends Mailable
{
    use Queueable, SerializesModels;

    public $job;

    /**
     * Create a new message instance.
     */
    public function __construct($jobs)
    {
        $this->job = $jobs;
    }

    public function build()
    {
        return $this->subject('Job Applied')
            ->view('emails.applied-job');
    }
}
