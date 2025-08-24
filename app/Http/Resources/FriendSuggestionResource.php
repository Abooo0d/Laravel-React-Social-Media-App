<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class FriendSuggestionResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'username' => $this->username,
      'cover_url' => $this->cover_path ? asset(Storage::url($this->cover_path)) : asset('images/default_cover_image.jpg'),
      'avatar_url' => $this->avatar_path
        ? asset(Storage::url($this->avatar_path))
        : asset('images/default_avatar_image.png'),
      'is_friend' => auth()->user()->isFriend($this->id)
    ];
  }
}