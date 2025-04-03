<?php

namespace App\Notifications;

use App\Http\Enums\NotificationTypeEnum;
use App\Models\Group;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Storage;

class DeletePostInGroupNotification extends Notification
{
  use Queueable;

  /**
   * Create a new notification instance.
   */
  public function __construct(public User $user, public Group $group)
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
  public function toDatabase($notifiable)
  {
    return [
      'type' => NotificationTypeEnum::DELETEPOST->value, // e.g., 'like', 'comment', 'group_join'
      'message' => "'" . $this->user->name . "' Deleted His Post In '" . $this->group->name . "' Group.",
      'link' => route('group.profile', $this->user->username),
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