<?php

namespace App\Notifications;

use App\Http\Enums\NotificationTypeEnum;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Storage;

class FriendRequestNotification extends Notification
{
  use Queueable;

  /**
   * Create a new notification instance.
   */
  public function __construct(public $user, public string $status)
  {
    //
  }

  /**
   * Get the notification's delivery channels.
   *
   * @return array<int, string>
   */
  public function via(object $notifiable): array
  {
    return ['database'];
  }

  /**
   * Get the mail representation of the notification.
   */
  public function toDatabase(object $notifiable)
  {
    $type = '';
    switch ($this->status) {
      case 'send':
        $type = NotificationTypeEnum::SENDFRIENDREQUEST->value;
        break;
      case 'accept':
        $type = NotificationTypeEnum::ACCEPTFRIENDREQUEST->value;
        break;
      case 'block':
        $type = NotificationTypeEnum::BLCOKFRIENDREQUEST->value;
        break;
    }
    $message = '';
    switch ($this->status) {
      case 'send':
        $message = "'{$this->user->name}' Send To You Friend Request.";
        break;
      case 'accept':
        $message = "'{$this->user->name}' Accepted You Friend Request.";
        break;
      case 'block':
        $message = "'{$this->user->name}'Block You From His Friends.";
        break;
    }
    return [
      'type' => $type,
      'message' => $message,
      'link' => route('profile.view', $this->user->username),
      'actor' => ['name' => $this->user->name, 'avatar' => $this->user->avatar_path ? Storage::url($this->user->avatar_path) : asset('images/default_avatar_image.png')]
    ];
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
