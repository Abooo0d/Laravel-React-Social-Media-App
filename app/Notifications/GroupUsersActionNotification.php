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

class GroupUsersActionNotification extends Notification
{
  use Queueable;

  /**
   * Create a new notification instance.
   */
  public function __construct(public User $admin, public Group $group, public string $action, public string $role = '')
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
    $message = '';

    switch ($this->action) {
      case 'KickOut':
        $message = "'{$this->admin->name}' Removed You From '{$this->group->name}'.";
        break;
      case 'ChangeRole':
        $message = $this->role == 'admin'
          ? "Your Role In '{$this->group->name}' Group Changed By '{$this->admin->name}' To Be 'Admin'."
          : "Your Role In '{$this->group->name}' Group Changed By '{$this->admin->name}' To Be 'User'.";
    }

    return [
      'type' => NotificationTypeEnum::GROUPUSERACTION->value,
      'message' => $message,
      'link' => route('group.profile', $this->group->slug),
      // 'actor' => ['name' => $this->group->name, 'avatar' => Storage::url($this->group->thumbnail_path)]
      'actor_id' => $this->admin->id
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
