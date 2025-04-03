<?php

namespace App\Notifications;

use App\Http\Enums\NotificationTypeEnum;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Storage;

class DeleteCommentNotification extends Notification
{
  use Queueable;

  /**
   * Create a new notification instance.
   */
  public function __construct(public User $user, public int $postId)
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
  public function toMail($notifiable)
  {
    return [
      'type' => NotificationTypeEnum::DELETECOMMENT->value,
      'message' => "'" . $this->user->name . "'Commented On your Post",
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
