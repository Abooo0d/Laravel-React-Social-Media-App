<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

// use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
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
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
      'email' => $this->email,
      'email_verified_at' => $this->email_verified_at,
      'cover_url' => $this->cover_path ? asset(Storage::url($this->cover_path)) : asset('images/default_cover_image.jpg'),
      'avatar_url' => $this->avatar_path
        ? asset(Storage::url($this->avatar_path))
        : asset('images/default_avatar_image.png'),
      'friends' => FriendResource::collectionWithTarget($this->all_friends, $this->id),
      'pending_requests' => FriendResource::collection($this->comingRequests)->additional(['target_user_id' => $this->id])
    ];
  }
}