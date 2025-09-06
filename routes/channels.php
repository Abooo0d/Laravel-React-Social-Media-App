<?php

use App\Http\Resources\UserResource;
use App\Models\Chat;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

if (app()->environment('production', 'local')) {
  Broadcast::channel(
    'chat.{chatId}',
    fn($user, $chatId) =>
    Chat::find($chatId)->users->contains($user->id)
  );
  Broadcast::channel('online', function ($user) {
    $authUser = Auth::user();
    if ($authUser && $authUser->isFriend($user->id)) {
      return new UserResource($user);
    }
    return $authUser;
  });
  Broadcast::channel(
    'user.{id}',
    fn($user, $id) => (int) $user->id == (int) $id
  );
  Broadcast::channel(
    'call.{chatId}',
    fn($user, $chatId) =>
    Chat::find($chatId)->users->contains($user->id)
  );
}