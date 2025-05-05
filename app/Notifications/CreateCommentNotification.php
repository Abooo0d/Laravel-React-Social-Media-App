<?php

namespace App\Notifications;

use App\Http\Enums\NotificationTypeEnum;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Storage;

class CreateCommentNotification extends Notification
{
  use Queueable;

  /**
   * Create a new notification instance.
   */
  public function __construct(public User $user, public int $postId, public bool $sub = false)
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
    $message = $this->sub
      ? "'" . $this->user->name . "'Commented On your Comment"
      : "'" . $this->user->name . "'Commented On your Post";
    return [
      'type' => NotificationTypeEnum::CREATECOMMENT->value,
      'message' => $message,
      'link' => route('post.publicView', $this->postId),
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
