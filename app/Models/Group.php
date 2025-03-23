<?php

namespace App\Models;

use App\Http\Enums\GroupUserRuleEnum;
use App\Http\Enums\GroupUserStatusEnum;
use App\Http\Resources\GroupUserResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Framework\Constraint\Operator;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Group extends Model
{
  use HasFactory;
  use SoftDeletes;
  use HasSlug;

  protected $fillable = ['name', 'about', 'auto_approval', 'user_id', 'cover_path', 'thumbnail_path'];
  public function currentUserGroups(): HasOne
  {
    return $this->hasOne(GroupUsers::class)->where('user_id', Auth::id());
  }
  public function isAdmin($userId)
  {
    return GroupUsers::query()
      ->where('user_id', $userId)
      ->where('group_id', $this->id)
      ->where('role', GroupUserRuleEnum::ADMIN->value)
      ->exists();
  }
  public function isOwner($userId)
  {
    return $this->user_id == $userId;
  }
  public function getSlugOptions(): SlugOptions
  {
    return SlugOptions::create()
      ->generateSlugsFrom('name')
      ->saveSlugsTo('slug')
      ->doNotGenerateSlugsOnUpdate();
  }
  public function adminUsers()
  {
    return $this->belongsToMany(User::class, 'group_users')
      ->wherePivot('role', GroupUserRuleEnum::ADMIN->value);
  }
  public function membersUsers(): BelongsToMany
  {
    return $this->belongsToMany(User::class, 'group_users')
      ->wherePivot('status', 'approved')
      ->where('role', GroupUserRuleEnum::USER->value);
  }
  public function requestUsers(): BelongsToMany
  {
    return $this->belongsToMany(User::class, 'group_users')
      ->wherePivot('status', GroupUserStatusEnum::PENDING->value);
  }
}