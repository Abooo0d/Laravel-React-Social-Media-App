<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewMessageRequest;
use App\Http\Resources\ChatResource;
use App\Http\Resources\MessageResource;
use App\Models\Chat;
use App\Models\Message;
use App\Models\MessageStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatsController extends Controller
{
  public function index(Request $request)
  {
    $data = $request->validate([
      'chat_id' => ['nullable'],
      'is_group' => ['nullable']
    ]);
    $chat_id = $data['chat_id'] ?? null;
    $is_group = $data['is_group'] ? filter_var($data['is_group'], FILTER_VALIDATE_BOOLEAN) : null;

    $chat = null;
    if ($is_group == true) {
      $chats = Chat::where('id', $chat_id)->first();
    } elseif ($is_group == false) {
      if ($chat_id != null) {
        $chat = Chat::whereHas('users', function ($q) {
          $q->where('user_id', auth()->id());
        })->whereHas('users', function ($q) use ($chat_id): void {
          $q->where('user_id', $chat_id);
        })->withCount('users')
          ->having('users_count', 2)
          ->with('messages')
          ->orderBy('updated_at', 'ASC')
          ->first();
        if (!$chat) {
          $chat = Chat::create();
          $chat->users()->attach([auth()->id(), $chat_id]);
        }
      }
    }
    $chats = auth()->user()->chats()->where('is_group', true)->with('users', 'messages')->get();
    return Inertia::render(
      'Chats',
      [
        'groupsChat' => $chats ? ChatResource::collection($chats) : [],
        'chat_with_friend' => $chat ? new ChatResource($chat) : null
      ]
    );
  }
  public function getChat(Request $request)
  {
    $data = $request->validate([
      'chat_id' => ['nullable'],
      'is_group' => ['required', 'boolean']
    ]);
    $chat_id = $data['chat_id'] ?? null;
    $is_group = $data['is_group'];
    $chat = null;
    if (!!$is_group) {
      $chats = Chat::where('id', $chat_id)->first();
    } else {
      if ($chat_id) {
        $chat = Chat::whereHas('users', function ($q) {
          $q->where('user_id', auth()->id());
        })->whereHas('users', function ($q) use ($chat_id): void {
          $q->where('user_id', $chat_id);
        })->withCount('users')
          ->having('users_count', 2)
          ->with('messages')
          ->latest()
          ->first();
        if (!$chat) {
          $chat = Chat::create();
          $chat->users()->attach([auth()->id(), $chat_id]);
        }
      }
    }
    if (!!$chat) {
      return response(
        [
          'chat_with_friend' => $chat ? new ChatResource($chat) : null
        ],
        200
      );
    } else
      return redirect()->back()->with('error', 'Some Thing Went Wrong');
  }
  public function newMessage(NewMessageRequest $request, Chat $chat)
  {
    $data = $request->validated();
    $message = Message::create([
      'chat_id' => $chat->id,
      'user_id' => auth()->id(),
      'body' => $data['body'] ?? null,
      'attachment_path' => $data['attachment_path'] ?? null,
    ]);
    $messageStatus = MessageStatus::create([
      'message_id' => $message->id,
      'user_id' => auth()->id()
    ]);
    return response(['message' => new MessageResource($message)], 200);
  }
}
