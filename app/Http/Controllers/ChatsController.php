<?php

namespace App\Http\Controllers;

use App\Events\NewMessageSent;
use App\Http\Requests\NewMessageRequest;
use App\Http\Resources\ChatResource;
use App\Http\Resources\MessageResource;
use App\Models\Chat;
use App\Models\Message;
use App\Models\MessageStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatsController extends Controller
{
  public function index(Request $request)
  {
    $chats = auth()
      ->user()
      ->chats()
      ->where('is_group', true)
      ->with('users', 'messages')
      ->orderBy('last_message_id', "desc")
      ->get();
    $allChats = auth()
      ->user()
      ->chats()
      ->where('is_group', false)
      ->orderBy('last_message_id', "desc")
      ->get();
    return Inertia::render(
      'Chats',
      [
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
    $chat = Chat::where('id', $chat_id)->first();
    if (!!$chat) {
      return response(
        [
          'chat_with_friend' => $chat ? new ChatResource($chat) : null,
        ],
        200
      );
    } else
      return redirect()->back()->with('error', 'Some Thing Went Wrong');
  }
  public function getMoreMessages(Message $message)
  {
    $messages = Message::where('created_at', '<', $message->created_at)
      ->orderBy('created_at', 'desc')
      ->limit(20)
      ->get();
    return response(['messages' => MessageResource::collection($messages)]);
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
      'user_id' => auth()->id(),
      'is_read' => '1'
    ]);
    $lastMessageBody = $message->body;

    // If message is longer than 100 chars, truncate it with ellipsis
    if (strlen($message->body) > 20) {
      $lastMessageBody = substr($message->body, 0, 20) . '...';
    }
    $chat->update([
      'last_massage_id' => $message->id,
      'last_message' => $lastMessageBody,
      'last_message_date' => $message->created_at->format('M:d - H:i')
    ]);
    $chat->save();
    broadcast(new NewMessageSent($message));
    return response(['message' => new MessageResource($message)], 200);
  }
}
