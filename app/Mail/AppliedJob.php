<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AppliedJob extends Mailable
{
    use Queueable, SerializesModels;

    public $jobs = [];

    /**
     * Create a new message instance.
     */
    public function __construct($jobs)
    {
        $this->jobs = $jobs;
    }

    public function build()
    {
        return $this->subject('Job Applied')
            ->view('emails.applied-job');
    }
}
