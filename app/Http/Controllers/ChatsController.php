<?php

namespace App\Http\Controllers;

use App\Events\MessageDeleted;
use App\Events\MessageUpdated;
use App\Events\NewMessageSent;
use App\Http\Requests\CreateChatGroupRequest;
use App\Http\Requests\NewMessageRequest;
use App\Http\Requests\SearchForChatRequest;
use App\Http\Requests\SearchUserRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\ChatResource;
use App\Http\Resources\MessageResource;
use App\Models\Chat;
use App\Models\ChatUser;
use App\Models\Message;
use App\Models\MessageAttachment;
use App\Models\MessageStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ChatsController extends Controller
{
  public function index(Request $request)
  {
    try {
      $chats = auth()
        ->user()
        ->chats()
        ->where('is_group', true)
        ->with('users', 'messages')
        ->orderBy('last_message_id', "desc")
        ->get();
      $allChats = auth()->user()
        ->chats()
        ->where('is_group', false)
        ->orderBy('last_message_id', 'desc')
        ->get();
      return Inertia::render(
        'Chats',
        [
          'groupsChat' => $chats ? ChatResource::collection($chats) : [],
          "allChats" => ChatResource::collection($allChats)
        ]
      );
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function getChat(Request $request)
  {
    try {
      $data = $request->validate([
        'chat_id' => ['nullable', 'exists:chats,id'],
        'is_group' => ['nullable', 'boolean']
      ]);
      $user = Auth::user();
      $chat_id = $data['chat_id'] ?? null;
      $chat = Chat::find($chat_id);
      if (!$chat) {
        return response()->json([
          'message' => 'Chat not found'
        ], 404);
      }
      // Check if user is already a member
      $isChatUser = ChatUser::where('chat_id', $chat->id)
        ->where('user_id', $user->id)
        ->exists();
      // If not a member, add them
      if (!$isChatUser) {
        ChatUser::create([
          'chat_id' => $chat->id,
          'user_id' => $user->id,
        ]);
        // Refresh chat data with new user
        $chat->refresh();
      }

      $unreadMessages = Message::where('chat_id', $chat->id)
        ->whereDoesntHave('statuses', function ($q) use ($user) {
          $q->where('user_id', $user->id);
        })
        ->get();

      $now = now();

      $statusRows = $unreadMessages->map(function ($message) use ($user, $now) {
        return [
          'message_id' => $message->id,
          'user_id' => $user->id,
          'is_read' => true,
          'created_at' => $now,
          'updated_at' => $now,
        ];
      })->toArray();

      if (!empty($statusRows)) {
        MessageStatus::insert($statusRows); // bulk insert
      }

      return response(
        [
          'chat_with_friend' => $chat ? new ChatResource($chat) : null,
        ],
        200
      );
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function getMoreMessages(Message $message)
  {
    try {
      $messages = Message::where('created_at', '<', $message->created_at)
        ->orderBy('created_at', 'desc')
        ->limit(20)
        ->get();
      return response(['messages' => MessageResource::collection($messages)]);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function newMessage(NewMessageRequest $request, Chat $chat)
  {
    try {
      $data = $request->validated();
      $files = $data['attachments'] ?? [];
      $message = Message::create([
        'chat_id' => $chat->id,
        'user_id' => auth()->id(),
        'body' => $data['body'] ?? null,
        'attachment_path' => $data['attachment_path'] ?? null,
      ]);
      $attachments = [];
      if ($files) {
        foreach ($files as $file) {
          $directory = 'MessagesAttachments/' . Str::random(32);
          Storage::makeDirectory($directory);
          $model = [
            'message_id' => $message->id,
            'name' => $file->getClientOriginalName(),
            'mime' => $file->getClientMimeType(),
            'size' => $file->getSize(),
            'path' => $file->store($directory, 'public')
          ];
          $attachment = MessageAttachment::create($model);
          $attachments[] = $attachment;
        }
        $message->attachments = $attachments;
      }
      MessageStatus::create([
        'message_id' => $message->id,
        'user_id' => auth()->id(),
        'is_read' => true
      ]);
      $chat->update(['last_message_id' => $message->id]);
      broadcast(new NewMessageSent($message));
      return response(['message' => new MessageResource($message)], 200);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function searchForChat(SearchForChatRequest $request)
  {
    try {
      $data = $request->Validated();
      $chatsData = $request->chats;
      return response()->json(['chats' => ChatResource::collection($chatsData)]);
      // if ($request->wantsJson())
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function downloadAttachment(MessageAttachment $attachment)
  {
    try {
      return response()
        ->download(Storage::disk('public')->path($attachment->path), $attachment->name);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function UpdateMessage(UpdateMessageRequest $request, Message $message)
  {
    $data = $request->validated();
    $message->update(['body' => $data['body']]);

    broadcast(new MessageUpdated($message));
    return response(['message' => 'Message Updated Successfully']);
  }
  public function deleteMessage(Message $message)
  {
    dd('Abood');
    $userId = Auth::id();
    if ($userId != $message->user_id) {
      return response(['message' => 'You Don`t have Permission To Delete This Post']);
    }
    $message->delete();
    $attachments = $message->attachments;
    foreach ($attachments as $attachment) {
      Storage::disk('public')->delete($attachment->path);
    }
    broadcast(new MessageDeleted($message));
    return response(['message' => 'message Deleted Successfully']);
  }
  public function createChatGroup(CreateChatGroupRequest $request)
  {
    try {
      $data = $request->validated();
      if ($data['chat_name'] !== '') {
        $chat = Chat::create([
          'name' => $data['chat_name'],
          'is_group' => true
        ]);
        $users = $data['users'];
        $users[] = auth()->id();
        foreach ($users as $user) {
          ChatUser::create([
            'chat_id' => $chat->id,
            'user_id' => $user,
          ]);
        }
        $chat->refresh();
        return response([
          'message' => 'Chat Created Successfully',
          'chat' => new ChatResource($chat)
        ], 200);
      }
    } catch (\Throwable $th) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
}
