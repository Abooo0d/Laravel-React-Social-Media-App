<?php

namespace App\Http\Controllers;

use App\Http\Enums\PostReactionEnum;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Group;
use App\Models\post;
use App\Models\PostAttachments;
use App\Models\PostComments;
use App\Models\PostCommentsReactions;
use App\Models\PostReactions;
use App\Models\User;
use App\Notifications\CommentReactionNotification;
use App\Notifications\CreateCommentNotification;
use App\Notifications\DeleteCommentNotification;
use App\Notifications\DeletePostInGroupNotification;
use App\Notifications\PostReactionNotification;
use App\Notifications\UpdateCommentNotification;
use App\Notifications\UpdatePostInGroupNotification;
use App\Notifications\CreatePostInGroupNotification;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Notification;
use OpenAI\Laravel\Facades\OpenAI;

class PostController extends Controller
{
  public function store(StorePostRequest $request)
  {
    DB::beginTransaction();
    $files = [];
    try {
      $data = $request->validated();
      $user = $request->user();
      $post = Post::create($data);
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
      if ($data['group_id']) {
        $group = Group::where('id', $data['group_id'])->first();
        $admins = $group->adminUsers()->where('user_id', '!=', Auth::id())->get();
        $postOwner = User::where('id', Auth::id())->first();
        Notification::send($admins, new CreatePostInGroupNotification($postOwner, $group, $post->id));
      }
      return redirect()->back()->with('success', 'Post Created Successfully Abood');
    } catch (\Throwable $e) {
      foreach ($files as $file) {
        Storage::disk('public')->delete($file);
      }
      DB::rollBack();
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function update(UpdatePostRequest $request, Post $post)
  {
    DB::beginTransaction();
    $files = [];
    try {
      $data = $request->validated();
      $user = $request->user();
      $post->update($data);
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
      if ($post['group_id']) {
        $group = Group::where('id', $post->group_id)->first();
        $admins = $group->adminUsers()->where('user_id', '!=', Auth::id())->get();
        $postOwner = User::where('id', Auth::id())->first();
        Notification::send($admins, new UpdatePostInGroupNotification($postOwner, $group, $post->id));
      }
      DB::commit();
      return redirect()->back()->with('success', 'Post Created Successfully');
    } catch (\Throwable $e) {
      foreach ($files as $file) {
        Storage::disk('public')->delete($file);
      }
      DB::rollBack();
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function downloadAttachment(PostAttachments $attachment)
  {
    try {
      return response()
        ->download(Storage::disk('public')->path($attachment->path), $attachment->name);

    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function destroy(Post $post)
  {
    try {
      $id = Auth::id();
      if ($id !== $post->user_id) {
        return response(['message' => 'You Don`t have Permission To Delete This Post']);
      }
      if ($post['group_id']) {
        $group = Group::where('id', $post['group_id'])->first();
        $admins = $group->adminUsers()->where('user_id', '!=', Auth::id())->get();
        $postOwner = User::where('id', Auth::id())->first();
        Notification::send($admins, new DeletePostInGroupNotification($postOwner, $group));
      }
      $post->delete();
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function postReaction(Request $request, Post $post)
  {
    try {
      $data = $request->validate([
        'reaction' => [Rule::enum(PostReactionEnum::class)]
      ]);
      $user = User::where('id', Auth::id())->first();

      /** @var Post $postOwner */
      $postOwner = $post->user;
      $userReaction = false;
      $reaction = PostReactions::where('user_id', $user->id)->where('post_id', $post->id)->first();
      if ($reaction) {
        $reaction->delete();
        $userReaction = false;
      } else {
        PostReactions::create([
          'post_id' => $post->id,
          'user_id' => Auth::id(),
          'type' => $data['reaction']
        ]);
        $userReaction = true;
      }
      if ($postOwner->id != Auth::id()) {
        $postOwner->notify(new PostReactionNotification($user, $post->id, $userReaction));
      }
      $reactions = PostReactions::where('post_id', $post->id)->count();
      return response([
        'num_of_reactions' => $reactions,
        'user_has_reaction' => $userReaction
      ]);

    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function postCommentCreate(Request $request, Post $post)
  {
    try {
      $user = User::where('id', Auth::id())->first();
      $data = $request->validate([
        'comment' => ['required', 'string'],
        'parent_id' => ['nullable', 'exists:post_comments,id']
      ]);
      $comment = PostComments::create([
        'post_id' => $post->id,
        'user_id' => Auth::id(),
        'comment' => nl2br($data['comment']),
        'parent_id' => $data['parent_id'] ?: null
      ]);

      $postOwner = $post->user()->first();
      if ($postOwner->id != Auth::id())
        $postOwner->notify(new CreateCommentNotification($user, $post->id));
      if ($data['parent_id']) {
        $commentOwner = PostComments::where('id', $data['parent_id'])->first()->user;
        if ($commentOwner->id != Auth::id())
          $commentOwner->notify(new CreateCommentNotification($user, $post->id, sub: true));
      }
      return response([new CommentResource($comment), 201]);

    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function EditComment(UpdateCommentRequest $request, PostComments $comment)
  {
    try {
      $data = $request->validated();
      $comment->update([
        'comment' => nl2br($data['comment'])
      ]);
      $postOwner = $comment->post()->first()->user()->first();
      $user = User::where('id', Auth::id())->first();
      if ($postOwner->id != Auth::id())
        $postOwner->notify(new UpdateCommentNotification($user, $comment->post_id));
      return new CommentResource($comment);

    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function DeleteComment(PostComments $comment)
  {
    try {
      if ($comment->user_id !== Auth::id()) {
        return response(['message' => 'You Don`t have Permission To Delete This Comment']);
      }
      $comment->delete();
      $postOwner = $comment->post()->first()->user()->first();
      $user = User::where('id', Auth::id())->first();
      if ($postOwner->id != Auth::id())
        $postOwner->notify(new DeleteCommentNotification($user, $comment->post_id));
      return response('', 204);

    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function CommentReaction(Request $request, PostComments $comment)
  {
    try {
      $data = $request->validate([
        'reaction' => [Rule::enum(PostReactionEnum::class)]
      ]);
      $user = Auth::id();
      $userHasReaction = false;
      $reaction = PostCommentsReactions::where('user_id', $user)->where('post_comments_id', $comment->id)->first();
      if ($reaction) {
        $reaction->delete();
        $userHasReaction = false;
      } else {
        PostCommentsReactions::create([
          'post_comments_id' => $comment->id,
          'user_id' => $user,
          'type' => $data['reaction']
        ]);
        $userHasReaction = true;
      }
      $numOfReactions = PostCommentsReactions::where('post_comments_id', $comment->id)->count();
      $commentOwner = new UserResource($comment->user()->first());
      $user = User::where('id', Auth::id())->first();
      if ($commentOwner->id != Auth::id())
        $commentOwner->notify(new CommentReactionNotification($user, $userHasReaction, $comment->post_id));
      return response([
        'num_of_reactions' => $numOfReactions,
        'user_has_reactions' => $userHasReaction
      ]);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function publicView(Post $post)
  {
    return Inertia::render('Post/View', ['post' => new PostResource($post)]);
  }
  public function aiPost(Request $request)
  {

    $data = $request->get('message');
    $message = Gemini::geminiFlash()->generateContent("Generate a creative and engaging social media post based on the following idea: '{$data}'.
        Make it friendly, relatable, and around 5-10 sentences. If relevant, include a question or call to action at the end to boost engagement.
        Avoid hashtags and keep the tone casual.");

    // $result = OpenAI::chat()->create([
    //   'model' => 'gpt-4o-mini',
    //   'messages' => [
    //     ['role' => 'user', 'content' => $data],
    //   ],
    // ]);

    return response(['message' => $message->candidates[0]->content->parts[0]->text]);
  }
  public function Abood(Request $request)
  {
    dd('Abood');
  }
}