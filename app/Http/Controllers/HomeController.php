<?php

namespace App\Http\Controllers;

use App\Http\Resources\GroupResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Group;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index(Request $request)
  {
    $userId = Auth::id();
    if (!$userId) {
      return redirect()->route('login');
    }

    $myId = auth()->id();

    $groupIds = auth()->user()->groups($myId)->pluck('group_id')->toArray();

    $friendIds = auth()->user()->all_friends->map(function ($friend) use ($myId) {
      return $friend->user_id === $myId ? $friend->friend_id : $friend->user_id;
    })->unique()->values()->toArray();
    $userAndFriendIds = array_merge($friendIds, [$myId]);
    $posts = Post::where(function ($query) use ($userAndFriendIds, $groupIds) {
      $query->whereIn('user_id', $userAndFriendIds)
        ->whereNull('group_id'); // personal posts only
    })
      ->orWhere(function ($query) use ($groupIds) {
        $query->whereIn('group_id', $groupIds); // group posts only
      })
      ->latest()
      ->paginate(15);

    if ($request->wantsJson()) {
      return response([
        'posts' => PostResource::collection($posts)
      ]);
    } else {
      return Inertia::render('Home', [
        'posts' => PostResource::collection($posts),
      ]);
    }
  }
}