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
    $post = Post::query()
      ->withCount('reactions')
      ->with(['reactions' => function ($query) use ($userId) {
        $query->where('user_id', $userId);
      }])
      ->latest()
      ->paginate(20);
    $user = $request->user() !== null ? new UserResource($request->user()) : '';
    return Inertia::render('Home', [
      'user' => $user,
      'posts' => PostResource::collection($post)
    ]);
  }
}