<?php

namespace App\Http\Controllers;

use App\Http\Enums\FriendsRequestEnum;
use App\Http\Requests\SearchUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Followers;
use App\Models\Friends;
use App\Models\User;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
  public function searchForUser(SearchUserRequest $request)
  {
    $data = $request->Validated();
    $followerData = $request->user;
    if ($request->wantsJson())
      return response()->json(['followers' => UserResource::collection($followerData)]);
  }
  public function SearchForGroupMember()
  {

  }
  public function addFriend(Request $request, User $user)
  {
    $data = $request->validate([
      'type' => ['required', 'string'] // add , block
    ]);
    $currentUser = Auth::user();
    if ($user->id == $currentUser->id) {
      return response()->json(['message' => "You Can`t Send Friend Request To Your Self"], 400);
    }
    $follower = Friends::query()->where('user_id', Auth::id())->where('friend_id', $user->id)->first();
    switch ($data['type']) {
      case 'add':
        if ($follower) {
          return response()->json(['message' => "You Are Already Friend With {$user->name}"], 400);
        } else {
          $follower = Friends::create([
            'user_id' => $currentUser->id,
            'friend_id' => $user->id,
            'status' => FriendsRequestEnum::PENDING->value,
          ]);
          return response()->json(['message' => "Your Request Has Been Send To {$user->name}, You Will Be Notified When Accepted"], 200);
        }
      case 'block':
        if ($follower) {
          $follower->status = FriendsRequestEnum::BLOCKED->value;
          $follower->save();
        } else {
          return response()->json(['message' => "You Are Not Friend With {$user->name} To Block Him"], 400);
        }
        break;
      default:
        return response()->json(['message' => "There Is An Error With The Request"], 400);
    }
  }
}