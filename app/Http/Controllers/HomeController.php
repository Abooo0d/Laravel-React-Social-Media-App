<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index(Request $request)
  {
    $post = Post::query()->latest()->paginate(20);
    $user = $request->user() !== null ? new UserResource($request->user()) : '';
    return Inertia::render('Home', [
      'user' => $user,
      'posts' => PostResource::collection($post)
    ]);
  }
}
