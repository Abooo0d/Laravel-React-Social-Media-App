<?php

namespace App\Models;

use App\Http\Enums\FriendsRequestEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  use HasSlug;
  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'username',
    'email',
    'password',
    'cover_path',
    'avatar_path'
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
  ];
  public function getSlugOptions(): SlugOptions
  {
    return SlugOptions::create()
      ->generateSlugsFrom('name')
      ->saveSlugsTo('username')
      ->doNotGenerateSlugsOnUpdate();
  }
  protected function gate(): void
  {
    Gate::define('viewTelescope', function (User $user) {
      return in_array($user->email, [
        'taylor@laravel.com',
      ]);
    });
  }
  public function groups()
  {
    return $this->hasMany(GroupUsers::class, 'user_id')->
      where('user_id', auth()->id());
  }
  public function posts($user_id)
  {
    return $this->hasMany(Post::class, 'user_id')
      ->where('user_id', $user_id);
  }
  public function sentFriendRequests()
  {
    return $this->hasMany(Friends::class, 'user_id')
      ->where('status', FriendsRequestEnum::ACCEPTED->value);
  }
  public function receivedFriendRequests()
  {
    return $this->hasMany(Friends::class, 'friend_id')
      ->where('status', FriendsRequestEnum::ACCEPTED->value);
  }
  public function getAllFriendsAttribute()
  {
    $sent = $this->sentFriendRequests()->with('friendUser')->get();
    $received = $this->receivedFriendRequests()->with('user')->get();
    $data = $sent->merge($received);
    return $data;
  }
  public function getFriendsWithRequestsAttribute()
  {
    $sent = $this->sentFriendRequests()->with('friendUser')->get();
    $received = $this->receivedFriendRequests()->with('user')->get();
    $comingRequests = $this->comingRequests()->with('user')->get();
    $sentRequest = $this->sentRequests()->with('friendUser')->get();
    $data = $sent->merge($received)->merge($comingRequests)->merge($sentRequest);
    return $data;
  }
  public function isFriend($user_id)
  {
    return Friends::where('user_id', $user_id)
      ->where('friend_id', Auth::id())
      ->orWhere('user_id', Auth::id())
      ->Where('friend_id', $user_id)
      ->exists();
  }
  public function comingRequests()
  {
    return $this->hasMany(Friends::class, 'friend_id')->where('status', FriendsRequestEnum::PENDING->value);
  }
  public function sentRequests()
  {
    return $this->hasMany(Friends::class, 'user_id')->where('status', FriendsRequestEnum::PENDING->value);
  }
  public function chats()
  {
    return $this->belongsToMany(Chat::class, 'chat_users')->where('withAI', 0)->withTimestamps();
  }
  public function AIChats()
  {
    return $this->belongsToMany(Chat::class, 'chat_users')->where('withAI', 1)->withTimestamps();
  }
}
