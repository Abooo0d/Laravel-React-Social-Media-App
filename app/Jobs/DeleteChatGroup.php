<?php

namespace App\Jobs;

use App\Events\ChatDeleted;
use App\Models\Chat;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class DeleteChatGroup implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  /**
   * Create a new job instance.
   */

  public function __construct(public int $chatId)
  {
  }
  /**
   * Execute the job.
   */
  public function handle(): void
  {
    $chat = Chat::with('messages.attachments')->findOrFail($this->chatId);
    $chatId = $chat->id;
    $chatName = $chat->name;
    $messages = $chat->messages;
    foreach ($messages as $message) {
      foreach ($message->attachments as $attachment) {
        // Delete file from storage
        Storage::disk('public')->delete($attachment->path);
        // Delete DB record
        $attachment->delete();
      }
    }
    $chat->delete();
    broadcast(new ChatDeleted((int) $chatId, $chatName));
  }
}
