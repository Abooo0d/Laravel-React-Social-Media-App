<?php

namespace App\Http\Controllers;

use App\Http\Enums\PostReactionEnum;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\CommentResource;
use App\Models\post;
use App\Models\PostAttachments;
use App\Models\PostComments;
use App\Models\PostReactions;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PostController extends Controller
{

  /**
   * Store a newly created resource in storage.
   */
  public function store(StorePostRequest $request)
  {
    DB::beginTransaction();
    $files = [];
    try {
      $data = $request->validated();
      $user = $request->user();
      $post =  Post::create($data);
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
  public function update(UpdatePostRequest $request, Post $post)
  {
    DB::beginTransaction();
    $files = [];
    try {
      $data = $request->validated();
      $user = $request->user();
      $post->update($request->validated());

      $deletedFilesIds = $data['deletedFilesIds'] ?? [];
      $postAttachments = PostAttachments::query()
        ->where('post_id', $post->id)
        ->whereIn('id', $deletedFilesIds)
        ->get();
      foreach ($postAttachments as $file) {
        $file->delete();
      }

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
  public function downloadAttachment(PostAttachments $attachment)
  {
    return response()
      ->download(Storage::disk('public')->path($attachment->path), $attachment->name);
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
  public function postReaction(Request $request, Post $post)
  {
    $data = $request->validate([
      'reaction' => [Rule::enum(PostReactionEnum::class)]
    ]);
    $user = Auth::id();
    $userReaction = false;
    $reaction = PostReactions::where('user_id', $user)->where('post_id', $post->id)->first();
    if ($reaction) {
      $reaction->delete();
      $userReaction = false;
    } else {
      PostReactions::create([
        'post_id' => $post->id,
        'user_id' =>  Auth::id(),
        'type' => $data['reaction']
      ]);
      $userReaction = true;
    }
    $reactions = PostReactions::where('post_id', $post->id)->count();
    return response([
      'num_of_reactions' => $reactions,
      'user_has_reaction' => $userReaction
    ]);
  }
  public function postCommentCreate(Request $request, Post $post)
  {
    $data = $request->validate([
      'comment' => ['required', 'string']
    ]);
    $comment = PostComments::create([
      'post_id' => $post->id,
      'user_id' => Auth::id(),
      'comment' => nl2br($data['comment'])
    ]);
    return response([new CommentResource($comment), 201]);
  }
  public function EditComment(UpdateCommentRequest $request, PostComments $comment)
  {
    $data = $request->validated();
    $comment->update([
      'comment' =>  nl2br($data['comment'])
    ]);
    return new CommentResource($comment);
  }
  public function DeleteComment(PostComments $comment)
  {
    if ($comment->user_id !==  Auth::id()) {
      return response(['message' => 'You Don`t have Permission To Delete This Comment']);
    }
    $comment->delete();
    return response('', 204);
  }
}