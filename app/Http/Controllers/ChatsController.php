<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatsController extends Controller
{
  public function index(Request $request)
  {
    $conversations = auth()->user()->conversation()->with('users', 'messages')->get();
    $data = $request->validate([
      'chat_id' => ['nullable']
    ]);
    // dd($data);
    return Inertia::render('Chats', ['chat' => $data['chat_id'] == null ? 'Abood Data' : 'Saad Data', 'data' => $conversations]);
  }
}