<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index(Request $request)
  {
    $userId = Auth::id();
    $posts = Post::query()
      ->withCount('reactions')
      ->withCount('comments')
      ->with([
        'latest5Comments',
        'comments' => function ($query) use ($userId) {
          $query->whereNull('parent_id');
        },
        'reactions' => function ($query) use ($userId) {
          $query->where('user_id', $userId);
        },
        'comments.postCommentsReactions' => function ($query) use ($userId) {
          // Load reactions for each comment and filter by user
          $query->where('user_id', $userId);
        }
      ])
      ->latest()
      ->paginate(20);
    $user = $request->user() !== null ? new UserResource($request->user()) : '';
    return Inertia::render('Home', [
      'user' => $user,
      'posts' => PostResource::collection($posts)
    ]);
  }
}