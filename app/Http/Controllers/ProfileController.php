<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\PostAttachmentResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\PostAttachments;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
  public function myProfile(Request $request)
  {
    $user = User::query()->where('id', Auth::id())->first();
    $posts = Post::PostsForTimeLine($user->id)
      ->where('user_id', $user->id)
      ->latest()
      ->paginate(15);
    if ($request->wantsJson()) {
      return response([
        'posts' => PostResource::collection($posts)
      ]);
    }
    $posts_ids = $user->posts($user->id)->pluck('id')->toArray();
    $photos = PostAttachments::whereIn('post_id', $posts_ids)->where('mime', 'like', 'image/%')->get();
    // dd($photos);
    $notifications = Auth::user()->notifications()->paginate(20);
    return Inertia::render('MyProfile/View', props: [
      'user' => new UserResource($user),
      'posts' => PostResource::collection($posts),
      'mustVerifyEmail' => !!!$request->user()->email_verified_at,
      'status' => session('status'),
      'notifications' => $notifications,
      'photos' => PostAttachmentResource::collection($photos)
    ]);

  }
  public function index(Request $request, User $user)
  {
    $userId = Auth::id();
    if (!$userId) {
      return redirect()->route('login');
    }
    $posts = Post::PostsForTimeLine($user->id)
      ->where('user_id', $user->id)
      ->latest()
      ->paginate(15);
    if ($user->id === Auth::id())
      return Redirect::route('profile.myProfile', $user->slug);
    if ($request->wantsJson()) {
      return response([
        'posts' => PostResource::collection($posts)
      ]);
    }
    $notifications = Auth::user()->notifications()->paginate(20);
    $isFriend = auth()->user()->isFriend($user->id);
    return Inertia::render('Profile/View', [
      'user' => new UserResource($user),
      'posts' => PostResource::collection($posts),
      'isFriend' => $isFriend,
      'notifications' => $notifications
    ]);
  }
  /**
   * Display the user's profile form.
   */
  public function edit(Request $request): Response
  {
    return Inertia::render('Profile/Edit', [
      'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
      'status' => session('status'),
    ]);
  }

  /**
   * Update the user's profile information.
   */
  public function update(ProfileUpdateRequest $request): RedirectResponse
  {
    $request->user()->fill($request->validated());
    if ($request->user()->isDirty('email')) {
      $request->user()->email_verified_at = null;
    }
    $request->user()->save();

    return redirect()->back()->with('success', 'Profile Updated Successfully');
  }

  /**
   * Delete the user's account.
   */
  public function destroy(Request $request): RedirectResponse
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
  }
  public function changeImages(Request $request, User $user)
  {
    $message = '';
    $data = $request->validate([
      'coverImage' => ['nullable', 'file', 'mimes:jpg,png'],
      'avatarImage' => ['nullable', 'file', 'mimes:jpg,png']
    ]);
    /**
     * @var UploadedFile $cover
     */
    $cover = $data['coverImage'] ?? null;
    /**
     * @var UploadedFile $avatar
     */
    $avatar = $data['avatarImage'] ?? null;
    $user = $request->user();
    if ($cover) {
      if ($user->cover_path) {
        Storage::disk('public')->delete($user->cover_path);
      }
      $coverPath = $cover->store("users/{$user->id}", 'public');
      $user->update(['cover_path' => $coverPath]);
      $message = 'Cover Image Updated Successfully';
    }
    if ($avatar) {
      if ($user->avatar_path) {
        Storage::disk('public')->delete($user->avatar_path);
      }
      $avatarPath = $avatar->store("users/{$user->id}", 'public');
      $user->update(['avatar_path' => $avatarPath]);
      $message = 'Avatar Image Updated Successfully';
    }
    return redirect()->back()->with('success', $message);
  }
}