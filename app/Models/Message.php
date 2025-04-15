<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
  use HasFactory;
  protected $fillable = ['body', 'chat_id', 'user_id'];
  public function status()
  {
    return $this->hasOne(MessageStatus::class)->first;
  }
}