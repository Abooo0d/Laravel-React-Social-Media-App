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

class NewMessageSent implements ShouldBroadcast
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

  public function broadcastOn()
  {
    return [
      new PrivateChannel('chat.' . $this->message->chat_id)
    ];
  }
  public function broadcastWith()
  {
    return [
      'message' => $this->message,
    ];
  }
  public function failed(\Throwable $exception)
  {
    \Log::error('Broadcast failed: ' . $exception->getMessage());
  }
}
