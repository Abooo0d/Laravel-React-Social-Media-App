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
      ->paginate(3);
    $user = $request->user() !== null ? new UserResource($request->user()) : '';
    $allPosts = PostResource::collection($posts);
    if ($request->wantsJson()) {
      return response([
        'posts' => [
          'posts' => $allPosts,
          'meta' => [
            'total' => $posts->total(),
            'current_page' => $posts->currentPage(),
            'per_page' => $posts->perPage(),
            'last_page' => $posts->lastPage(),
            'from' => $posts->firstItem(),
            'to' => $posts->lastItem(),
          ]
        ]
      ]);
    } else {
      return Inertia::render('Home', [
        'user' => $user,
        'posts' => [
          'posts' => $allPosts,
          'meta' => [
            'total' => $posts->total(),
            'current_page' => $posts->currentPage(),
            'per_page' => $posts->perPage(),
            'last_page' => $posts->lastPage(),
            'from' => $posts->firstItem(),
            'to' => $posts->lastItem(),
          ]
        ]
      ]);
    }
  }
}
