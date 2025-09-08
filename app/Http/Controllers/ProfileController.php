<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\PostAttachmentResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\PostAttachments;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
  public function index(Request $request, User $user)
  {
    try {
      $userId = Auth::id();
      if (!$userId) {
        return redirect()->route('login');
      }
      $posts = Post::PostsForTimeLine($user->id)
        ->where('user_id', $user->id)
        ->latest()
        ->paginate(20);
      $posts_ids = $user->posts($user->id)->pluck('id')->toArray();
      $photos = PostAttachments::whereIn('post_id', $posts_ids)->where('mime', 'like', 'image/%')->get();
      if ($user->id === Auth::id())
        return Redirect::route('profile.myProfile');
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
        'notifications' => $notifications,
        'photos' => PostAttachmentResource::collection($photos)
      ]);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }

  public function myProfile(Request $request)
  {
    try {
      $user = User::query()->where('id', Auth::id())->first();
      $posts_ids = $user->posts($user->id)->pluck('id')->toArray();
      $photos = PostAttachments::whereIn('post_id', $posts_ids)
        ->where('mime', 'like', 'image/%')
        ->get();
      $notifications = Auth::user()->notifications()->paginate(20);
      return Inertia::render('MyProfile/View', props: [
        'mustVerifyEmail' => !!!$request->user()->email_verified_at,
        'status' => session('status'),
        'notifications' => $notifications,
        'photos' => PostAttachmentResource::collection($photos)
      ]);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }

  public function getPostsForUser(User $user)
  {
    try {
      $posts = Post::PostsForTimeLine($user->id)
        ->where('user_id', $user->id)
        ->latest()
        ->paginate(15);
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

  public function edit(Request $request)
  {
    try {
      return Inertia::render('Profile/Edit', [
        'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
        'status' => session('status'),
      ]);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function update(ProfileUpdateRequest $request)
  {
    try {
      $request->user()->fill($request->validated());
      if ($request->user()->isDirty('email')) {
        $request->user()->email_verified_at = null;
      }
      $request->user()->save();

      return redirect()->back()->with('success', 'Profile Updated Successfully');

    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }

  public function destroy(Request $request)
  {
    try {
      $request->validate([
        'password' => ['required', 'current_password'],
      ]);

      $user = $request->user();

      Auth::logout();

      $user->delete();

      $request->session()->invalidate();
      $request->session()->regenerateToken();

      return Redirect::to('/');
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }

  public function changeImages(Request $request, User $user)
  {
    try {
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
        // Get the uploaded file extension
        $extension = $cover->getClientOriginalExtension();
        // Define custom file path like users/5/avatar.png
        $coverPath = "users/{$user->id}/cover.{$extension}";
        // Save file
        $cover->storeAs("users/{$user->id}", "cover.{$extension}", 'public');
        // Update user
        $user->update(['cover_path' => $coverPath]);
        $message = 'Cover Updated Successfully';
      }
      if ($avatar) {
        if ($user->avatar_path) {
          Storage::disk('public')->delete($user->avatar_path);
        }
        // Get the uploaded file extension
        $extension = $avatar->getClientOriginalExtension();
        // Define custom file path like users/5/avatar.png
        $avatarPath = "users/{$user->id}/avatar.{$extension}";
        // Save file
        $avatar->storeAs("users/{$user->id}", "avatar.{$extension}", 'public');
        // Update user
        $user->update(['avatar_path' => $avatarPath]);
        $message = 'Avatar Updated Successfully';
      }
      DB::beginTransaction();
      $files = [];
      $attachment = $cover ?: $avatar;
      $post = Post::create(
        [
          'user_id' => $user->id,
          'attachments' => $cover ?: $avatar,
          'body' => $cover ? "{$user->name} Changed His Cover Image" : "{$user->name} Changed His Avatar Image"
        ]
      );
      $path = $attachment->store("attachments/{$post->id}", 'public');
      PostAttachments::create([
        'post_id' => $post->id,
        'name' => $attachment->getClientOriginalName(),
        'path' => $path,
        'mime' => $attachment->getMimeType(),
        'size' => $attachment->getSize(),
        'created_by' => $user->id
      ]);
      DB::commit();
      return redirect()->back()->with('success', $message);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }

  public function downloadImage(Request $request, User $user)
  {
    try {
      $image = $request->type === 'cover' ? $user->cover_path : $user->avatar_path;

      if (!$image || !Storage::disk('public')->exists($image)) {
        return back()->with('error', 'Image not found.');
      }

      $filePath = Storage::disk('public')->path($image);
      return response()->download($filePath, basename($image));
    } catch (\Exception $e) {
      return back()->with('error', 'Something went wrong while downloading the image.');
    }
  }
  public function ProfileMobile(Request $request, User $user)
  {
    try {
      $userId = Auth::id();
      if (!$userId) {
        return response(['message' => 'Some Thing Went Wrong'], 400);
      }
      $isFriend = auth()->user()->isFriend($user->id);
      return response([
        'user' => new UserResource($user),
        'isFriend' => $isFriend,
      ], 200);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function myProfileMobile(Request $request)
  {
    try {
      $user = User::query()->where('id', Auth::id())->first();
      $posts_ids = $user->posts($user->id)->pluck('id')->toArray();
      $photos = PostAttachments::whereIn('post_id', $posts_ids)
        ->where('mime', 'like', 'image/%')
        ->get();
      $notifications = Auth::user()->notifications()->paginate(20);
      return response([
        'notifications' => $notifications,
        'photos' => PostAttachmentResource::collection($photos)
      ]);
    } catch (e) {
      return response(['message' => 'Some Thing Went Wrong'], 400);
    }
  }
  public function update_mobile(ProfileUpdateRequest $request)
  {
    $user = $request->user();
    $user->fill($request->validated());

    if ($user->isDirty('email')) {
      $user->email_verified_at = null;
    }

    $user->save();
    return response(['message' => 'Data Changed Successfully', 'user' => new UserResource($user)]);
  }
  public function getPostsForUserMobile(User $user)
  {
    try {
      $posts = Post::PostsForTimeLine($user->id)
        ->where('user_id', $user->id)
        ->latest()
        ->paginate(15);
      $posts_ids = $user->posts($user->id)->pluck('id')->toArray();
      $photos = PostAttachments::whereIn('post_id', $posts_ids)
        ->where('mime', 'like', 'image/%')->get();
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
        ],
        'photos' => PostAttachmentResource::collection($photos)
      ], 200);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function changeImagesMobile(Request $request, User $user)
  {
    try {
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
      DB::beginTransaction();
      $files = [];
      $attachment = $cover ?: $avatar;
      $post = Post::create(
        [
          'user_id' => $user->id,
          'attachments' => $cover ?: $avatar,
          'body' => $cover ? "{$user->name} Changed His Cover Image" : "{$user->name} Changed His Avatar Image"
        ]
      );
      $path = $attachment->store("attachments/{$post->id}", 'public');
      PostAttachments::create([
        'post_id' => $post->id,
        'name' => $attachment->getClientOriginalName(),
        'path' => $path,
        'mime' => $attachment->getMimeType(),
        'size' => $attachment->getSize(),
        'created_by' => $user->id
      ]);
      DB::commit();
      return response(['message' => $message, 'user' => new UserResource($user)], 200);
    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 402);
    }
  }
  public function destroy_mobile(Request $request)
  {
    $request->validateWithBag('userDeletion', [
      'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response(['message' => 'Account Deleted Successfully']);
  }
}