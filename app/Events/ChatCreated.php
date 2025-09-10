<?php

namespace App\Events;

use App\Http\Resources\ChatResource;
use App\Models\Chat;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatCreated implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  /**
   * Create a new event instance.
   */
  public $chat;
  public $users;
  public function __construct(Chat $chat, $users)
  {
    $this->chat = new ChatResource($chat);
    $this->users = $users;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn(): array
  {
    return collect($this->users)->map(
      fn($user) =>
      new PrivateChannel("user.{$user->uuid}")
    )->all();
  }
  public function broadcastWith()
  {
    [
      'chat' => $this->chat
    ];
  }
}
