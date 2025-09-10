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

class MessageDeleted implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  protected $message;
  /**
   * Create a new event instance.
   */
  public function __construct($message)
  {
    $this->message = new MessageResource($message);
  }
  public function broadcastOn()
  {
    return [
      new PrivateChannel('chat.' . $this->message->chat->uuid),
    ];
  }
  public function broadcastWith()
  {
    return [
      'message_id' => $this->message->id,
      'chat_id' => $this->message->chat_id
    ];
  }
}
