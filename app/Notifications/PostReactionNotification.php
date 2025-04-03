<?php

namespace App\Notifications;

use App\Http\Enums\NotificationTypeEnum;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Storage;

class PostReactionNotification extends Notification
{
  use Queueable;

  /**
   * Create a new notification instance.
   */
  public function __construct(public User $user, public int $postId, public bool $reaction)
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
      'type' => NotificationTypeEnum::POSTREACTION->value,
      'message' => $this->reaction
        ? "'" . $this->user->name . "' Reacted To You Post"
        : "'" . $this->user->name . "' Removed His Reaction From Your Post",
      'link' => route('post.publicView', $this->postId),
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
