<?php

namespace App\Observers;

use App\Models\User;
use Laravolt\Avatar\Facade as Avatar;
use Illuminate\Support\Facades\Storage;
class UserObserver
{
  /**
   * Handle the User "created" event.
   */
  public function created(User $user)
  {
    $avatar = Avatar::create($user->name)->toBase64();

    $imageName = 'users/' . $user->id . '.png';
    Storage::disk('public')->put(
      $imageName,
      base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $avatar))
    );
    $user->update(['avatar_path' => $imageName]);
  }

  /**
   * Handle the User "updated" event.
   */
  public function updated(User $user): void
  {
    //
  }

  /**
   * Handle the User "deleted" event.
   */
  public function deleted(User $user): void
  {
    //
  }

  /**
   * Handle the User "restored" event.
   */
  public function restored(User $user): void
  {
    //
  }

  /**
   * Handle the User "force deleted" event.
   */
  public function forceDeleted(User $user): void
  {
    //
  }
}
