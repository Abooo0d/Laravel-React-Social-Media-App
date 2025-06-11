<?php

namespace App\Jobs;

use App\Events\GroupDeleted;
use App\Models\Group;
use App\Models\Post;
use App\Notifications\GroupDeletedNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Notification;

class DeleteGroup implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  /**
   * Create a new job instance.
   */

  public function __construct(public Group $group)
  {
    //
  }

  /**
   * Execute the job.
   */
  public function handle(): void
  {
    $posts = Post::where('group_id', $this->group->id)
      ->with('attachments')
      ->get();
    dd($posts);
    foreach ($posts as $post) {
      foreach ($post->attachments as $attachment) {
        Storage::disk('public')->delete($attachment->path);
        // Delete DB record
        $attachment->delete();
      }
    }
    Notification::send(
      $this->group->users,
      new GroupDeletedNotification($this->group, auth()->user())
    );
    broadcast(new GroupDeleted($this->group));
    $this->group->delete();
  }
}