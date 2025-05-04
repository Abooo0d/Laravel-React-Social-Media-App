<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
  protected $fillable = ['last_message_id', 'last_message', 'last_message_date'];

  use HasFactory;
  public function users()
  {
    return $this->belongsToMany(User::class, 'chat_users')->withTimestamps();
  }
  public function messages()
  {
    return $this->hasMany(Message::class)->orderBy('created_at', 'desc')->limit(20);
  }
}
