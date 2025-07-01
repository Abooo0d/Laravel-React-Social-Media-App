<?php

namespace App\Http\Controllers;

use Gemini\Laravel\Facades\Gemini;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AIController extends Controller
{
  public function index(Request $request)
  {
    try {
      $userId = Auth::id();
      if (!$userId)
        return redirect()->route('login');
      return Inertia::render('AIChats/View');
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
      // $result = OpenAI::chat()->create([
      //   'model' => 'gpt-4o-mini',
      //   'messages' => [
      //     ['role' => 'user', 'content' => $data],
      //   ],
      // ]);
      return response(['message' => $message->candidates[0]->content->parts[0]->text]);
    } catch (e) {
      return redirect()->back()->with('error', 'Some Thing Wrong Happened');
    }
  }
}
