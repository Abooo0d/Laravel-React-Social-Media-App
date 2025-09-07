<?php

namespace App\Http\Controllers;

use App\Http\Resources\AIChatResource;
use App\Http\Resources\AIMessageResource;
use App\Http\Resources\ChatResource;
use App\Models\Chat;
use App\Models\ChatUser;
use App\Models\Message;
use App\Models\User;
use Gemini\Data\Content;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Http\Request;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Gemini\Enums\Role;
use Response;

class AIController extends Controller
{
  public function index(Request $request)
  {
    try {
      $userId = Auth::id();
      if (!$userId)
        return redirect()->route('login');
      $userId = Auth::id();
      // $chats = auth()::user()->chats->where('withAI',true)-.
      $chats = auth()
        ->user()
        ->AIChats()
        ->where('is_group', false)
        // ->where('withAI', true)
        ->orderBy('last_message_id', 'desc')
        ->get();
      return Inertia::render('AIChats/View', [
        'chats' => AIChatResource::collection($chats)
      ]);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function aiPost(Request $request)
  {
    try {
      $data = $request->get('message');
      $message = Gemini::geminiFlash()->generateContent("Generate a creative and engaging social media post based on the following idea: '{$data}'.
        Make it friendly, relatable, and around 5-10 sentences with emojis. If relevant, include a question or call to action at the end to boost engagement.
        Avoid hashtags and keep the tone casual.");
      return response(['message' => $message->candidates[0]->content->parts[0]->text]);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
  public function newMessage(Request $request)
  {
    try {
      $data = $request->validate([
        'message' => ['required', 'string'],
        'chat_id' => ['nullable', 'exists:chats,id']
      ]);
      $AIUser = User::firstOrCreate([
        'email' => 'ai@assistant.local'
      ], [
        'name' => 'Gemini AI',
        'password' => bcrypt(Str::random(20)) // random secure password
      ]);
      // Step 1: Find or Create Chat
      $chatId = $data['chat_id'];
      $chat = !!$chatId
        ? Chat::find($chatId)
        : Chat::create([
          'name' => '',
          'is_group' => false,
          'avatar_path' => '',
          'owner' => auth()->id(),
          'withAI' => true
        ]);
      // Attach user to chat if newly created
      if (!$chatId) {
        ChatUser::create([
          'chat_id' => $chat->id,
          'user_id' => auth()->id(),
          'admin' => true
        ]);
      }
      // Step 2: Save User Message
      Message::create([
        'chat_id' => $chat->id,
        'user_id' => auth()->id(),
        'body' => $data['message']
      ]);
      $systemPrompt = Content::parse(
        part: <<<MARKDOWN
        You are an AI assistant. Always respond using proper Markdown formatting:
        - Use `#`, `##`, or `###` for headings
        - Use bullet points `-` or numbered lists `1.` where appropriate
        - Use backticks (\`\`\`) for code blocks with a language hint (e.g., \`\`\`js)
        - Bold key concepts with **double asterisks**
        - Never skip Markdown structure, even for summaries or titles
        MARKDOWN,
        role: Role::USER
      );
      // Step 3: Build full message history
      $history = collect([$systemPrompt])
        ->merge(
          $chat
            ->AImessages()
            ->orderBy('created_at')
            ->get()
            ->map(
              fn($msg) => Content::parse(
                part: $msg->body,
                role: $msg->user_id === auth()->id() ? Role::USER : Role::MODEL
              )
            )
        )
        ->toArray();
      // Step 4: Send to Gemini
      try {
        $geminiChat = Gemini::chat('gemini-2.5-flash')->startChat($history);
        $response = $geminiChat->sendMessage($data['message']);
        $aiResponse = $response->text();
        if (!$chatId) {
          $titlePrompt = "Based on this conversation, suggest a short and clear title for the chat (max 5 words):\n\n\"{$data['message']}\"\n\nResponse:\n\"{$aiResponse}\"";
          $titleResponse = Gemini::chat('gemini-2.5-flash')
            ->sendMessage($titlePrompt);
          $title = trim($titleResponse->text());
          $chat->update(['name' => $title ?? '']);
        }
      } catch (\Throwable $th) {
        return response(['error', 'SomeThing Went Wrong'], 403);
      }
      // Step 5: Save AI Response
      $aiMessage = Message::create([
        'chat_id' => $chat->id,
        'user_id' => $AIUser->id,
        'body' => $aiResponse,
        'from' => 'AI'
      ]);
      if (!$chatId) {
        return response(
          [
            'message' => new AIMessageResource($aiMessage),
            'chat' => new AIChatResource($chat)
          ]
        );
      }
      return response(['message' => new AIMessageResource($aiMessage)]);
    } catch (\Throwable $th) {
      return response(['error', 'SomeThing Went Wrong'], 403);
    }
  }
}