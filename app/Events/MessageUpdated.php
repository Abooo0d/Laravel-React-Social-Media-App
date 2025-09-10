<?php

namespace App\Events;

use App\Http\Resources\MessageResource;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageUpdated implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $message;
  /**
   * Create a new event instance.
   */
  public function __construct($message)
  {
    $this->message = new MessageResource($message);
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    return [
      new PrivateChannel('chat.' . $this->message->chat->uuid),
    ];
  }
  public function broadcastWith()
  {
    return [
      'message' => $this->message
    ];
  }
}
