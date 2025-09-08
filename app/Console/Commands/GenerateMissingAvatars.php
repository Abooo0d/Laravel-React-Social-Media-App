<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Laravolt\Avatar\Facade as Avatar;
use Illuminate\Support\Facades\Storage;

class GenerateMissingAvatars extends Command
{
  protected $signature = 'users:generate-avatars';

  public function handle()
  {
    $users = User::whereNull('avatar_path')->orWhere('avatar_path', '')->get();

    foreach ($users as $user) {
      $avatar = Avatar::create($user->name)->toBase64();

      $imageName = 'users/' . $user->id . '.png';
      Storage::disk('public')->put(
        $imageName,
        base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $avatar))
      );

      $user->update(['avatar_path' => $imageName]);

      $this->info("Generated avatar for {$user->name}");
    }

    $this->info("✅ Done! Generated avatars for {$users->count()} users.");
  }
}