<?php

namespace App\Events;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageRead implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  /**
   * Create a new event instance.
   */
  public $message;
  public $userId;
  public function __construct(Message $message, $userId)
  {
    $this->message = new MessageResource($message);
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
      new PrivateChannel('chat.' . $this->message->chat->uuid)
    ];
  }
  public function broadcastWith()
  {
    return [
      "message" => $this->message,
      'user_id' => $this->userId
    ];
  }
}
