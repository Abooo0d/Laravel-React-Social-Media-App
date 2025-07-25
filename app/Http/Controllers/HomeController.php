<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChatResource;
use App\Http\Resources\GroupResource;
use App\Http\Resources\NotificationResource;
use App\Http\Resources\PostResource;
use App\Models\Group;
use App\Models\Notification;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index(Request $request)
  {
    try {
      $userId = Auth::id();
      if (!$userId)
        return redirect()->route('login');
      return Inertia::render('Home');
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function getPosts()
  {
    try {
      if (auth()->id()) {
        $myId = auth()->id();
        $groupIds = auth()->user()->groups($myId)->pluck('group_id')->toArray();
        $friendIds = auth()->user()->all_friends->map(function ($friend) use ($myId) {
          return $friend->user_id === $myId ? $friend->friend_id : $friend->user_id;
        })->unique()->values()->toArray();
        $userAndFriendIds = array_merge($friendIds, [$myId]);
        $posts = Post::PostsForTimeLine($myId)->where(function ($query) use ($userAndFriendIds) {
          $query->whereIn('user_id', $userAndFriendIds)
            ->whereNull('group_id'); // personal posts only
        })
          ->orWhere(function ($query) use ($groupIds) {
            $query->whereIn('group_id', $groupIds); // group posts only
          })
          ->latest()
          ->paginate(15);
      }
      return response([
        'posts' => [
          'data' => PostResource::collection($posts),
          'links' => [
            'first' => $posts->url(1),
            'last' => $posts->url($posts->lastPage()),
            'prev' => $posts->previousPageUrl(),
            'next' => $posts->nextPageUrl(),
          ],
          'meta' => [
            'current_page' => $posts->currentPage(),
            'last_page' => $posts->lastPage(),
            'per_page' => $posts->perPage(),
            'total' => $posts->total(),
          ]
        ]
      ], 200);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function getGroups()
  {
    try {
      $groups = Group::query()
        ->with('currentUserGroups')
        ->select(['groups.*'])
        ->join('group_users AS gu', 'gu.group_id', 'groups.id')
        ->where('gu.user_id', Auth::id())
        ->orderBy('gu.role')
        ->orderBy('name')
        ->get();
      $groupsData = GroupResource::collection($groups ?? []);
      return response(['groups' => $groupsData], 200);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function getNotifications()
  {
    try {
      if (auth()->id()) {
        $notifications = Auth::user()->notifications;
        return response(['notifications' => NotificationResource::collection($notifications)], 200);
      }
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function getChatGroups()
  {
    try {
      $groupChats = auth()->user()->chats()
        ->where('is_group', '1')
        ->with('users', 'messages')
        ->get();
      return response(['groupChats' => auth()?->user() ? ChatResource::collection($groupChats) : []], 200);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  // public function readNotification(Notification $notification)
  // {
  //   // dd($notification);
  //   $notification->update(['read_at' => Carbon::now()]);
  //   dd($notification);
  //   $notification->save();
  //   return response(200);
  // }

  public function readNotification($notificationId)
  {
    $notification = auth()->user()->notifications()
      ->where('id', $notificationId)
      ->first();
    if ($notification) {
      $notification->markAsRead();
      return response()->json(['success' => true]);
    }
    return response()->json(['error' => 'Notification not found'], 404);
  }
  public function readAllNotifications()
  {
    auth()->user()->unreadNotifications->markAsRead();
    return response()->json(['success' => true]);
  }
}
