<?php

namespace App\Notifications;

use App\Http\Enums\NotificationTypeEnum;
use Illuminate\Bus\Queueable;
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
    $type = match ($this->status) {
      'add' => NotificationTypeEnum::SENDFRIENDREQUEST->value,
      'accept' => NotificationTypeEnum::ACCEPTFRIENDREQUEST->value,
      'block' => NotificationTypeEnum::BLCOKFRIENDREQUEST->value,
      default => throw new \InvalidArgumentException("Invalid status type: {$this->status}"),
    };
    $message = '';
    $message = match ($this->status) {
      'add' => "'{$this->user->name}' Send To You Friend Request.",
      'accept' => "'{$this->user->name}' Accepted You Friend Request.",
      'block' => "'{$this->user->name}'Block You From His Friends.",
      default => throw new \InvalidArgumentException("Invalid status type: {$this->status}"),
    };
    return [
      'type' => $type,
      'message' => $message,
      'link' => route('profile.view', $this->user->username),
      // 'actor' => ['name' => $this->user->name, 'avatar' => $this->user->avatar_path ? Storage::url($this->user->avatar_path) : asset('images/default_avatar_image.png')],
      'actor_id' => $this->user->id
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
