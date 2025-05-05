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

class GroupUpdateNotification extends Notification
{
  use Queueable;

  /**
   * Create a new notification instance.
   */
  public function __construct(public User $user, public Group $group, public string $image = '')
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
    if (!$this->image)
      $message = "'" . $this->user->name . "' Updated The Information Of '" . $this->group->name . "' Group.";
    elseif ($this->image == 'cover')
      $message = "'" . $this->user->name . "' Updated The Cover Image Of The '" . $this->group->name . "' Group.";
    else
      $message = "'" . $this->user->name . "' Updated The Thumbnail Image Of The '" . $this->group->name . "' Group.";
    return [
      'type' => NotificationTypeEnum::GROUPUPDATED->value,
      'message' => $message,
      'link' => route('group.profile', $this->group->slug),
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