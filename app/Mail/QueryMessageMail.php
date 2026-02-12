<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;

class QueryMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public $queryMessage;
    public $data;

    /**
     * Create a new message instance.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.query_message',
        );
    }

    /**
     * Get the message content definition.
     */
    public function build()
    {
        $mail = $this->subject('New Query Message')
            ->view('emails.query-message');

        if (isset($this->data['attachment'])) {
            if ($this->data['attachment']) {
                $this->data['attachment']->store('attachment', 'public');
            }
        }

        return $mail;
    }
}
