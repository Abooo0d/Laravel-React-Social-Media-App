<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
  use HasFactory;
  protected $fillable = ['body', 'chat_id', 'user_id', 'edited', 'deleted'];
  public function status()
  {
    return $this->hasOne(MessageStatus::class)
      ->where('message_id', $this->id)
      ->where('user_id', auth()->id());
  }
  public function unreadFor($userId)
  {
    return $this->hasOne(MessageStatus::class)
      ->where('message_id', $this->id)
      ->where('user_id', $userId)
      ->where('is_read', true)
      ->first();
  }
  public function user()
  {
    return $this->belongsTo(User::class);
  }
  public function attachments()
  {
    return $this->hasMany(MessageAttachment::class);
  }
  public function statuses()
  {
    return $this->hasMany(MessageStatus::class);
  }
  public function chat()
  {
    return $this->belongsTo(Chat::class);
  }
}
