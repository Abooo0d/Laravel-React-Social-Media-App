<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\post;
use App\Models\PostAttachments;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{

  /**
   * Store a newly created resource in storage.
   */
  public function store(StorePostRequest $request)
  {
    DB::beginTransaction();
    try {
      $data = $request->validated();
      $user = $request->user();
      $post =  Post::create($data);
      $files = [];
      /** @var UploadedFile[] $attachments */
      $attachments = $data['attachments'] ?? [];
      foreach ($attachments as $attachment) {
        $path = $attachment->store("attachments/{$user->id}", 'public');
        $files[] = $attachment;
        PostAttachments::create([
          'post_id' => $post->id,
          'name' => $attachment->getClientOriginalName(),
          'path' => $path,
          'mime' => $attachment->getMimeType(),
          'size' => $attachment->getSize(),
          'created_by' => $user->id
        ]);
      }
      DB::commit();
    } catch (\Throwable $e) {
      foreach ($files as $file) {
        Storage::disk('public')->delete($file);
      }
      DB::rollBack();
      throw $e;
    }
    return back();
  }


  /**
   * Update the specified resource in storage.
   */
  public function update(UpdatePostRequest $request, post $post)
  {
    $post->update($request->validated());
    return back();
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Post $post)
  {
    $id = Auth::id();
    if ($id !== $post->user_id) {
      return response(['message' => 'You Don`t have Permission To Delete This Post']);
    }
    $post->delete();
  }
}
