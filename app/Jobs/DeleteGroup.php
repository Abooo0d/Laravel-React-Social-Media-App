<?php

namespace App\Jobs;

use App\Events\GroupDeleted;
use App\Models\Group;
use App\Models\Post;
use App\Models\User;
use App\Notifications\GroupDeletedNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;

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
    foreach ($posts as $post) {
      foreach ($post->attachments as $attachment) {
        Storage::disk('public')->delete($attachment->path);
        // Delete DB record
        $attachment->delete();
      }
    }
    $members = User::query()
      ->select(['users.*', 'gu.group_id'])
      ->join('group_users AS gu', 'gu.user_id', 'users.id')
      ->where('group_id', $this->group->id)
      ->get();
    Notification::send(
      $members,
      new GroupDeletedNotification($this->group, auth()->user())
    );
    // dd('Abood');
    $usersIds = collect($members)->map(
      fn($user) =>
      $user->id
    )->all();
    broadcast(new GroupDeleted($this->group, $usersIds));
    $this->group->delete();
  }
}