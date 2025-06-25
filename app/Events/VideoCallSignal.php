<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VideoCallSignal implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  /**
   * Create a new event instance.
   */
  public $chatId;
  public $signal;
  public $from;
  public function __construct($chatId, $from, $signal)
  {
    $this->chatId = $chatId;
    $this->signal = $signal;
    $this->from = $from;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    return [
      new PrivateChannel("chat.{$this->chatId}")
    ];
  }
  public function broadcastWith()
  {
    return [
      'chat_id' => $this->chatId,
      'signal' => $this->signal,
      'from' => $this->from
    ];
  }
}