<?php

namespace App\Events;

use App\Models\Chat;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MemberKickOutFormChat implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  /**
   * Create a new event instance.
   */
  public $chat;
  public $userId;
  public function __construct(Chat $chat, int $userId)
  {
    $this->chat = $chat;
    $this->userId = $userId;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    return [
      new PrivateChannel("user.{$this->userId}")
    ];
  }
  public function broadcastWith()
  {
    return [
      'chat_id' => $this->chat->id,
      "message" => "You Have Been Removed From '{$this->chat->name}' Group "
    ];
  }
}
