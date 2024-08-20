<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
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
  public function index(Request $request,User $user)
  {
    return Inertia::render('Profile/View', ['user' => new UserResource($request->user())]);
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

    return Redirect::route('profile.edit');
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
  public function changeImages(Request $request,User $user)
  {
    $data = $request->validate([
      'coverImage' => ['nullable','file','mimes:jpg,png'] ,
      'avatarImage' =>  ['nullable','file','mimes:jpg,png']
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
    if($cover) {
      if ($user->cover_path) {
        Storage::disk('public')->delete($user->cover_path);
    }
      $coverPath = $cover->store("user-{$user->id}",'public');
      $user->update(['cover_path' => $coverPath]);
    }
    if($avatar) {
      if ($user->avatar_path) {
        Storage::disk('public')->delete($user->avatar_path);
    }
      $avatarPath = $avatar->store("user-{$user->id}",'public');
      $user->update(['avatar_path' => $avatarPath]);
    }
    return Redirect::to('/profile');
  }
}
