<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
  protected $fillable = ['last_message_id', 'last_message', 'last_message_date', 'name', 'is_group', 'owner', 'avatar_path'];

  use HasFactory;
  public function users()
  {
    return $this->belongsToMany(User::class, 'chat_users')->withPivot('admin');
    ;
  }

  public function messages()
  {
    return $this->hasMany(Message::class)
      ->where('deleted', '0')
      ->orderBy('created_at', 'desc')
      ->limit(20);
  }
  // public function unreadMessages()
  // {
  //   return $this->hasManyThrough(
  //     related: MessageStatus::class,
  //     through: Message::class,
  //     firstKey: 'chat_id',           // Foreign key on Message table
  //     secondKey: 'message_id',        // Foreign key on MessageStatus table
  //     localKey: 'id',                // Local key on Chat table
  //     secondLocalKey: 'id'                 // Local key on Message table
  //   )
  //     ->where('message_statuses.user_id', auth()->id())
  //     ->where('is_read', false);
  // }
  // public function unread()
  // {
  //   return $this->hasMany(Message::class)
  //     ->where('my_status', function ($query) {
  //       $query->where('is_read', false);
  //     })->count();
  // }
  // public function unreadMessagesFor($userId)
  // {
  //   return $this->hasManyThrough(MessageStatus::class, Message::class)
  //     ->where('message_statuses.user_id', $userId)
  //     ->where('message_statuses.is_read', false);
  // }
  public function unreadMessagesCountFor($userId)
  {
    return $this->messages()
      ->whereDoesntHave('statuses', function ($query) use ($userId) {
        $query->where('user_id', $userId);
      })
      ->count();
  }
  public function status()
  {
    return $this->hasOne(ChatsStatus::class);
  }
  public function isCurrentUserAdmin()
  {
    return $this->hasOne(ChatUser::class)
      ->where('chat_id', $this->id)
      ->where('user_id', auth()->id())
      ->where('admin', 1);
    // ->first();
  }
}
