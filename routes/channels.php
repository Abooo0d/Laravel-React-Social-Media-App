<?php

use App\Http\Resources\UserResource;
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

Broadcast::channel('chat', function ($user) {
  return true;
});


Broadcast::channel('online', function ($user) {
  $authUser = Auth::user();
  if ($authUser && $authUser->isFriend($user->id)) {
    return new UserResource($user);
  }
  return $authUser;
});
