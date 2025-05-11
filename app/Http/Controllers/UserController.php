<?php

namespace App\Http\Controllers;

use App\Http\Enums\FriendsRequestEnum;
use App\Http\Requests\SearchUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Chat;
use App\Models\ChatUser;
use App\Models\Followers;
use App\Models\Friends;
use App\Models\User;
use App\Notifications\FriendRequestNotification;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
  public function searchForUser(SearchUserRequest $request)
  {
    try {
      $request->Validated();
      $followerData = $request->user;
      if ($request->wantsJson())
        return response()->json(['followers' => UserResource::collection($followerData)]);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function addFriend(Request $request, User $user)
  {
    try {
      $data = $request->validate([
        'type' => ['required', 'string'] // add , block
      ]);
      $currentUser = Auth::user();
      if ($user->id == $currentUser->id) {
        return redirect()->back()->with('error', "You Can`t Send Friend Request To Your Self");
      }
      $follower = Friends::query()->where('user_id', Auth::id())->where('friend_id', $user->id)->first();
      switch ($data['type']) {
        case 'add':
          if ($follower) {
            return redirect()->back()->with('error', "You Are Already Friend With {$user->name}");
          } else {
            $follower = Friends::create([
              'user_id' => $currentUser->id,
              'friend_id' => $user->id,
              'status' => FriendsRequestEnum::PENDING->value,
            ]);
            $user->notify(new FriendRequestNotification($currentUser, 'add'));
            return redirect()->back()->with('success', "Your Request Has Been Send To {$user->name}, You Will Be Notified When Accepted");
          }
        case 'block':
          if ($follower) {
            $follower->status = FriendsRequestEnum::BLOCKED->value;
            $follower->save();
          } else {
            return redirect()->back()->with('error', "You Are Not Friend With {$user->name} To Block Him");
          }
          break;
        default:
          return redirect()->back()->with('error', 'There Is An Error With The Request');
      }
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function acceptRequest(Request $request)
  {
    try {
      $data = $request->validate([
        'request_id' => ['required'],
        'request_owner_id' => ['required']
      ]);
      $currentUser = Auth::user();
      $user = User::where('id', $data['request_owner_id'])->first();
      $friendRequest = Friends::where('id', $data['request_id'])
        ->where('user_id', $user->id)
        ->where('friend_id', auth()->id())
        ->where('status', FriendsRequestEnum::PENDING->value)
        ->first();
      if ($friendRequest) {
        $friendRequest->status = FriendsRequestEnum::ACCEPTED->value;
        $friendRequest->save();
        $user->notify(new FriendRequestNotification($currentUser, 'accept'));
        $chat = Chat::create();
        ChatUser::create([
          'chat_id' => $chat->id,
          'user_id' => $user->id,
        ]);
        ChatUser::create([
          'chat_id' => $chat->id,
          'user_id' => Auth::id()
        ]);
        return redirect()->back()->with('success', "Friend Request Is Accepted");
      } else
        return response()->json(['message' => "There Is An Error With The Request"], 400);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
}
