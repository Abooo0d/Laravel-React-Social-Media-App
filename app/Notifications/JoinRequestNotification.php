<?php

namespace App\Notifications;

use App\Http\Enums\NotificationTypeEnum;
use App\Models\Group;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Storage;

class JoinRequestNotification extends Notification
{
  use Queueable;

  /**
   * Create a new notification instance.
   */
  public function __construct(public Group $group, public User $user, public bool $join)
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
    $message = $this->join
      ? "'{$this->user->name}' Requested To Join '{$this->group->name}' Group."
      : "'{$this->user->name}' Joined '{$this->group->name}' Group.";
    return [
      'type' => NotificationTypeEnum::JOINGROUPREQUEST->value,
      'message' => "'{$this->user->name}' Requested To Join '{$this->group->name}' Group.",
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
