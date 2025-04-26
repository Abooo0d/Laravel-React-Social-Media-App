<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
  use HasFactory;
  use SoftDeletes;
  public $fillable = [
    'body',
    'user_id',
    'group_id'
  ];
  public function user()
  {
    return $this->belongsTo(User::class);
  }
  public function group()
  {
    return $this->belongsTo(Group::class);
  }
  public function attachments()
  {
    return $this->hasMany(PostAttachments::class);
  }
  public function reactions()
  {
    return $this->hasMany(PostReactions::class);
  }
  public function comments()
  {
    return $this->hasMany(PostComments::class);
  }
  public function latest5Comments()
  {
    return $this->hasMany(PostComments::class)->latest()->limit(5);
  }
  public static function PostsForTimeLine($userId): Builder
  {
    return Post::query()
      ->withCount('reactions')
      ->withCount('comments')
      ->with([
        'latest5Comments',
        'comments' => function ($query) use ($userId) {
          $query->whereNull('parent_id');
        },
        'reactions' => function ($query) use ($userId) {
          $query->where('user_id', $userId);
        },
        'comments.postCommentsReactions' => function ($query) use ($userId) {
          // Load reactions for each comment and filter by user
          $query->where('user_id', $userId);
        }
      ]);
  }
}
