<?php

namespace App\Http\Controllers;

use App\Events\AddMemberToChatGroup;
use App\Events\CallDecline;
use App\Events\CallEnded;
use App\Events\ChatCreated;
use App\Events\ChatUpdated;
use App\Events\MemberKickOutFormChat;
use App\Events\MemberRoleChanged;
use App\Events\MessageDeleted;
use App\Events\MessageRead;
use App\Events\MessageUpdated;
use App\Events\NewMessageSent;
use App\Events\ReadAllMessages;
use App\Events\VideoCallSignal;
use App\Events\VoiceCallSignal;
use App\Events\WebRTCCallSignal;
use App\Http\Requests\AddUsersToChatRequest;
use App\Http\Requests\ChangeChatGroupImage;
use App\Http\Requests\ChangeRoleForChatRequest;
use App\Http\Requests\CreateChatGroupRequest;
use App\Http\Requests\NewMessageRequest;
use App\Http\Requests\SearchForChatRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\ChatResource;
use App\Http\Resources\MessageResource;
use App\Jobs\DeleteChatGroup;
use App\Models\Chat;
use App\Models\ChatsStatus;
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
        ->where('withAI', false)
        ->with('users', 'messages')
        ->orderBy('last_message_id', "desc")
        ->get();
      $allChats = auth()
        ->user()
        ->chats()
        ->where('is_group', false)
        ->where('withAI', false)
        ->orderBy('last_message_id', 'desc')
        ->get();
      return Inertia::render(
        'Chats/View',
        [
          'groupsChat' => $chats ? ChatResource::collection($chats) : [],
          "allChats" => ChatResource::collection($allChats)
        ]
      );
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function index_mobile(Request $request)
  {
    try {
      $chats = auth()
        ->user()
        ->chats()
        ->where('is_group', true)
        ->where('withAI', false)
        ->with('users', 'messages')
        ->orderBy('last_message_id', "desc")
        ->get();
      $allChats = auth()
        ->user()
        ->chats()
        ->where('is_group', false)
        ->where('withAI', false)
        ->orderBy('last_message_id', 'desc')
        ->get();
      return response(
        [
          'groupsChat' => $chats ? ChatResource::collection($chats) : [],
          "allChats" => ChatResource::collection($allChats)
        ],
        200
      );
    } catch (e) {
      return response(['error' => 'Some Thing Wrong Happened'], 405);
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

      $statusRows = $unreadMessages->map(
        fn($message) =>
        [
          'message_id' => $message->id,
          'user_id' => $user->id,
          'is_read' => true,
          'created_at' => $now,
          'updated_at' => $now,
        ]
      )->toArray();

      if (!empty($statusRows)) {
        MessageStatus::insert($statusRows); // bulk insert
      }
      broadcast(new ReadAllMessages(chatId: $chat->id, userId: auth()->id()));

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
  public function messageRead(Message $message)
  {
    if ($message) {
      $now = now();
      $userId = auth()->id();
      MessageStatus::create([
        'message_id' => $message->id,
        'user_id' => $userId,
        'is_read' => true,
        'created_at' => $now,
        'updated_at' => $now,
      ]);
      $message->refresh();
      broadcast(new MessageRead($message, $userId))->toOthers();
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
      $message->refresh();
      try {
        broadcast(new NewMessageSent($message));
      } catch (\Throwable $e) {
        \Log::error('Broadcast failed: ' . $e->getMessage());
      }
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
    $message->update(['body' => $data['body'], 'edited' => true]);
    broadcast(new MessageUpdated($message));
    return response(['message' => 'Message Updated Successfully']);
  }
  public function deleteMessage(Message $message)
  {
    $userId = Auth::id();
    if ($userId != $message->user_id) {
      return response(['message' => 'You Don`t have Permission To Delete This Post']);
    }
    $message->update(['deleted' => true]);
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
          'is_group' => true,
          'owner' => auth()->id()
        ]);
        $users = $data['users']; // assume this is an array
        array_unshift($users, auth()->id());
        foreach ($users as $user) {
          if ($user == auth()->id()) {
            ChatUser::create([
              'chat_id' => $chat->id,
              'user_id' => $user,
              'admin' => true
            ]);
          } else {
            ChatUser::create([
              'chat_id' => $chat->id,
              'user_id' => $user,
            ]);
          }
        }
        $chat->refresh();
        broadcast(new ChatCreated($chat, $users))->toOthers();
        return response([
          'message' => 'Chat Created Successfully',
          'chat' => new ChatResource($chat)
        ], 200);
      }
    } catch (\Throwable $th) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function muteChat(Request $request, Chat $chat)
  {
    try {
      $data = $request->validate([
        'mute' => ['boolean', 'required']
      ]);
      $status = $data['mute'];
      $chatStatus = ChatsStatus::where('chat_id', $chat->id)
        ->where('user_id', auth()->id())
        ->first();
      if ($chatStatus) {
        $chatStatus->update([
          'mute' => $status
        ]);
      } else {
        $chatStatus = ChatsStatus::create([
          'chat_id' => $chat->id,
          'user_id' => auth()->id(),
          'mute' => $status
        ]);
      }
      $message = !!$status
        ? 'The Chat Muted Successfully'
        : 'The Chat Unmuted Successfully';
      return response(['message' => $message], 200);
    } catch (\Throwable $th) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function BlockChat(Request $request, Chat $chat)
  {
    try {
      $data = $request->validate([
        'block' => ['boolean', 'required']
      ]);
      $status = $data['block'];
      $chatStatus = ChatsStatus::where('chat_id', $chat->id)
        ->where('user_id', auth()->id())
        ->first();
      if ($chatStatus) {
        $chatStatus->update([
          'blocked' => $status
        ]);
      } else {
        $chatStatus = ChatsStatus::create([
          'chat_id' => $chat->id,
          'user_id' => auth()->id(),
          'blocked' => $status
        ]);
      }
      $message = !!$status ? 'The Chat Blocked Successfully' : 'The Chat Unblocked Successfully';
      return response(['message' => $message], 200);
    } catch (\Throwable $th) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function leaveChatGroup(Chat $chat)
  {
    try {
      if ($chat->owner == auth()->id()) {
        return response(['message' => 'The Owner Can`t Leave The Group'], 401);
      }
      if (!!$chat->is_group) {
        $chatUser = ChatUser::where('chat_id', $chat->id)
          ->where('user_id', auth()->id())
          ->first();
        if ($chatUser) {
          $chatUser->delete();
          $chat->refresh();
          broadcast(new ChatUpdated($chat));
          return response(['message' => 'You Have Left The Group'], 200);
        }
      }
    } catch (\Throwable $th) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function deleteChat(Chat $chat)
  {
    try {
      if ($chat->owner !== auth()->id()) {
        return response(['message' => 'You Don`t have Permission To Delete This chat Group'], 401);
      }
      DeleteChatGroup::dispatch($chat->id)->delay(now()->addSeconds(15));
      return response(['message' => 'Yor Task Is In Process You Will be Notified On Success'], 200);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function ChangeChatGroupImage(ChangeChatGroupImage $request, Chat $chat)
  {
    try {
      $data = $request->validated();
      /**
       * @var \Illuminate\Http\UploadedFile $image
       */
      $image = $data['image'];
      if ($chat->avatar_path) {
        Storage::disk('public')->delete($chat->avatar_path);
      }
      $avatarPath = $image->store("chats/{$chat->id}", 'public');
      $chat->update([
        'avatar_path' => $avatarPath
      ]);
      broadcast(new ChatUpdated($chat));
      return response(
        [
          'message' => 'Chat Image Updated Successfully',
          'image' => Storage::url($avatarPath)
        ]
      );
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function ChangeChatName(Request $request, Chat $chat)
  {
    try {
      if (!$chat->isCurrentUserAdmin)
        return response(['message' => 'You Don`t have Permission Change Group Name'], 401);
      $data = $request->validate([
        'name' => ['string', 'required']
      ]);
      $chat->update(['name' => $data['name']]);
      broadcast(new ChatUpdated($chat));
      return response(["message" => 'The Chat Group Name Was Updated Successfully'], 200);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function addUsersToChat(AddUsersToChatRequest $request, Chat $chat)
  {
    try {
      $data = $request->validated();
      $users = $data['users'];
      foreach ($users as $user) {
        $chatUser = ChatUser::where('user_id', $user)
          ->where('chat_id', $chat->id)
          ->first();
        if (!$chatUser) {
          ChatUser::create([
            'chat_id' => $chat->id,
            'user_id' => $user,
            'admin' => false
          ]);
        }
      }
      $chat->refresh();
      broadcast(new ChatUpdated($chat));
      broadcast(new AddMemberToChatGroup($chat, $user));
      return response(
        [
          'message' => 'Users Were Added Successfully',
          'chat' => new ChatResource($chat)
        ],
        200
      );
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function ChangeRoleInChat(ChangeRoleForChatRequest $request, Chat $chat)
  {
    try {
      $data = $request->validated();
      $role = $data['role'];
      $userId = $data['user_id'];
      $eventMessage = '';
      $user = ChatUser::where('user_id', $userId)
        ->where('chat_id', $chat->id)
        ->first();
      if ($user) {
        switch ($role) {
          case 'admin':
            $user->update([
              'admin' => 1
            ]);
            $eventMessage = "You Have Been Promoted To Admin In {$chat->name} Chat";
            break;
          case 'user':
            $user->update([
              'admin' => 0
            ]);
            $eventMessage = "You Have Been Demoted To Regular Member In {$chat->name} Chat";
            break;
        }
      } else {
        return response(['message' => 'This User Is Not Member Of This Chat'], 400);
      }
      $message = $role == 'admin' ? 'This Member Is Now Admin' : 'This user Is Now User';
      broadcast(new ChatUpdated($chat));
      broadcast(new MemberRoleChanged($chat->name, $userId, $eventMessage));
      return response(['message' => $message], 200);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function kickOut(Request $request, Chat $chat)
  {
    try {
      if (!$chat->isCurrentUserAdmin()) {
        return response(['You Must Be Admin To make This Action'], 403);
      }
      $data = $request->validate([
        'user_id' => ['required', 'exists:users,id']
      ]);
      $userId = $data['user_id'];
      $chatUser = ChatUser::where('chat_id', $chat->id)
        ->where('user_id', $userId)
        ->first();
      if (!!$chatUser) {
        $chatUser->delete();
        broadcast(new ChatUpdated($chat));
        broadcast(new MemberKickOutFormChat($chat, $userId));
        return response(['message' => 'This User Is Now Kicked Out'], 200);
      }
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function videoCall(Request $request, Chat $chat)
  {
    $signal = $request->signal ?? null;
    broadcast(new VideoCallSignal(
      $chat->id,
      auth()->id(),
      $signal
    ));
    return response(['message' => 'From BackEnd']);
  }
  public function callDecline(Chat $chat)
  {
    broadcast(new CallEnded($chat));
    return response(['message' => 'Call Decline']);
  }
  public function voiceCall(Request $request, Chat $chat)
  {
    $signal = $request->signal ?? null;
    broadcast(new VoiceCallSignal(
      $chat->id,
      auth()->id(),
      $signal
    ));

  }
}
