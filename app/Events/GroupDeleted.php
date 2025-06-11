<?php

namespace App\Events;

use App\Models\Group;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GroupDeleted implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;
  /**
   * Create a new event instance.
   */
  public $group;
  public $usersIds;
  public function __construct(Group $group, $usersIds)
  {
    $this->group = $group;
    $this->usersIds = $usersIds;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    return collect($this->usersIds)
      ->map(fn($id)
        => new PrivateChannel("user.{$id}"))
      ->all();
  }
  public function broadcastWith()
  {
    return [
      'group_id' => $this->group->id
    ];
  }
  public function broadcastAs()
  {
    return 'GroupDeleted';
  }
}
