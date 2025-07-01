<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ReadAllMessages implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  /**
   * Create a new event instance.
   */
  public $chatId;
  public $userId;
  public function __construct($chatId, $userId)
  {
    $this->chatId = $chatId;
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
      // new PrivateChannel('chat.' . $this->chatId),
      new PrivateChannel("chat.{$this->chatId}")
    ];
  }
  public function broadcastWith()
  {
    return [
      'chat_id' => $this->chatId,
      'user_id' => $this->userId
    ];
  }
}