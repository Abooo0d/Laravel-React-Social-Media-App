<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Group extends Model
{
  use HasFactory;
  use SoftDeletes;
  use HasSlug;

  protected $fillable = ['name', 'about', 'auto_approval', 'user_id'];
  public function getSlugOptions(): SlugOptions
  {
    return SlugOptions::create()
      ->generateSlugsFrom('name')
      ->saveSlugsTo('slug')
      ->doNotGenerateSlugsOnUpdate();
  }
}
