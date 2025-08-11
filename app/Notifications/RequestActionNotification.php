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

class RequestActionNotification extends Notification
{
  use Queueable;

  /**
   * Create a new notification instance.
   */
  public function __construct(public Group $group, public string $type, public $userId)
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
    $message = $this->type == 'approved'
      ? "Your Request To Join '{$this->group->name}' Group Have Been Approved."
      : "Your Request To Join '{$this->group->name}' Group Have Been Rejected.";
    return [
      'type' => NotificationTypeEnum::REQUESTACTION->value,
      'message' => $message,
      'link' => route('group.profile', $this->group->slug),
      'actor' => ['name' => $this->group->name, 'avatar' => Storage::url($this->group->thumbnail_path)],
      'actor_id' => $this->userId
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
