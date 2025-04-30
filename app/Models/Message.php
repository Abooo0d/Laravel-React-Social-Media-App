<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
  use HasFactory;
  protected $fillable = ['body', 'chat_id', 'user_id'];
  public function status($user_id)
  {
    return $this->hasOne(MessageStatus::class)
      ->where('message_id', $this->id)
      ->where('user_id', $user_id);
  }
  public function user()
  {
    return $this->belongsTo(User::class);
  }
  public function attachments()
  {
    return $this->hasMany(MessageAttachment::class);
  }
}
