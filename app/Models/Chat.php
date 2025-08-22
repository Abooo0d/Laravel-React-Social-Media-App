<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
  protected $fillable = ['last_message_id', 'last_message', 'last_message_date', 'name', 'is_group', 'owner', 'avatar_path', 'withAI'];

  use HasFactory;
  public function users()
  {
    return $this->belongsToMany(User::class, 'chat_users')->withPivot('admin');
  }
  public function messages()
  {
    return $this->hasMany(Message::class)->where('deleted', '0')
      ->where('from', '')->orderBy('created_at', 'desc')->limit(20);
  }
  public function AImessages()
  {
    return $this->hasMany(Message::class)->orderBy('created_at', 'desc')->limit(20);
  }
  public function unreadMessagesCountFor($userId)
  {
    return $this->messages()
      ->whereDoesntHave('statuses', function ($query) use ($userId) {
        $query->where('user_id', $userId); })->count();
  }
  public function status()
  {
    return $this->hasOne(ChatsStatus::class);
  }
  public function isCurrentUserAdmin()
  {
    return $this->hasOne(ChatUser::class)->where('chat_id', $this->id)->where('user_id', auth()->id())->where('admin', 1);
  }
}