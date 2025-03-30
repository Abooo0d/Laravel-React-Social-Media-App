<?php

namespace App\Notifications;

use App\Http\Enums\NotificationTypeEnum;
use App\Models\Group;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Storage;

class GroupInvitationNotification extends Notification
{
  use Queueable;

  /**
   * Create a new notification instance.
   */
  public function __construct(public Group $group, public User $user, public $hours, public $token)
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
    return [
      'type' => NotificationTypeEnum::GROUPINVITATION->value,
      'message' => "Hi, You Have Been Invited To Join '{$this->group->name}' By '{$this->user->name}', \n This Invitation Is Valid For {$this->hours} Hours.",
      'link' => route('group.acceptInvitation', $this->token),
      'actor' => [
        'name' => $this->group->name,
        'avatar' => $this->group->thumbnail_path
          ? Storage::url($this->group->thumbnail_path)
          : asset('images/default_group_avatar_image.png')
      ],
      'token' => $this->token
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