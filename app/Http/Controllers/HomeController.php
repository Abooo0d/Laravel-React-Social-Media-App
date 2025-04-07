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
    $posts = Post::PostsForTimeLine($userId)
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
