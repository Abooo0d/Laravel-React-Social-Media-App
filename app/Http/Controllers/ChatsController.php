<?php

namespace App\Http\Controllers;

use App\Events\NewMessageSent;
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
    $chats = auth()->user()->chats()->where('is_group', true)->with('users', 'messages')->get();
    $allChats = auth()->user()->chats()->where('is_group', false)->get();
    return Inertia::render(
      'Chats',
      [
        'chat_with_friend' => null,
        'groupsChat' => $chats ? ChatResource::collection($chats) : [],
        "allChats" => ChatResource::collection($allChats)
      ]
    );
  }
  public function getChat(Request $request)
  {
    $data = $request->validate([
      'chat_id' => ['nullable', 'exists:chats,id'],
      'is_group' => ['nullable', 'boolean']
    ]);
    $chat_id = $data['chat_id'] ?? null;
    $is_group = $data['is_group'];
    $chat = Chat::where('id', $chat_id)->first();
    // dd($chat);
    // if ((bool) $is_group) {
    //   $chat = Chat::where('id', $chat_id)->first();
    // } else {
    //   if ($chat_id) {
    //     $chat = Chat::whereHas('users', function ($q) {
    //       $q->where('user_id', auth()->id());
    //     })->whereHas('users', function ($q) use ($chat_id): void {
    //       $q->where('user_id', $chat_id);
    //     })->withCount('users')
    //       ->having('users_count', 2)
    //       ->with('messages')
    //       ->first();
    //     if (!$chat) {
    //       $chat = Chat::create();
    //       $chat->users()->attach([auth()->id(), $chat_id]);
    //     }
    //   }
    // }

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
    MessageStatus::create([
      'message_id' => $message->id,
      'user_id' => auth()->id()
    ]);
    $chat->last_message_id = $message->id;
    $chat->last_message = $message->body;
    $chat->update([
      'last_massage_id' => $message->id,
      'last_message' => $message->body
    ]);
    $chat->save();
    broadcast(new NewMessageSent($message));
    return response(['message' => new MessageResource($message)], 200);
  }
}