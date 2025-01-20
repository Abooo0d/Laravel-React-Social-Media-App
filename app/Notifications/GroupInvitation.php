<?php

namespace App\Notifications;

use App\Models\Group;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class GroupInvitation extends Notification
{
  use Queueable;
  /**
   * Create a new notification instance.
   */
  public function __construct(public Group $group, public $hours, public $token)
  {
  }

  /**
   * Get the notification's delivery channels.
   *
   * @return array<int, string>
   */
  public function via(object $notifiable): array
  {
    return ['mail'];
  }

  /**
   * Get the mail representation of the notification.
   */
  public function toMail(object $notifiable): MailMessage
  {
    return (new MailMessage)
      ->line("Hi You Have Been Invited To Join Abood")
      ->action('Join The Group', url(route('group.acceptInvitation', parameters: $this->token)))
      ->line('The Link Will Be Valid For ' . $this->hours . ' Hours.');
  }

  /**
   * Get the array representation of the notification.
   *
   * @return array<string, mixed>
   */
  public function toArray(object $notifiable): array
  {
    return [
      //
    ];
  }
}