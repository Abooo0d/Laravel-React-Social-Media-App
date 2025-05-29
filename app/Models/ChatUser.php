<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatUser extends Model
{
  use HasFactory;
  protected $fillable = ['user_id', 'chat_id', 'admin'];
  public function user()
  {
    return $this->belongsTo(User::class);
  }
  public function chat()
  {
    return $this->belongsTo(Chat::class);
  }
}
