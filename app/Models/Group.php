<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
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
  public function getSlugOptions(): SlugOptions
  {
    return SlugOptions::create()
      ->generateSlugsFrom('name')
      ->saveSlugsTo('slug')
      ->doNotGenerateSlugsOnUpdate();
  }
}