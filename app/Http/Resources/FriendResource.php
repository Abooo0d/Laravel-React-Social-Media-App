<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class FriendResource extends JsonResource
{

  protected $targetUserId;

  public static function collectionWithTarget($resourceCollection, $targetUserId)
  {
    return $resourceCollection->map(function ($item) use ($targetUserId) {
      return new self($item, $targetUserId);
    });
  }

  public function __construct($resource, $targetUserId = null)
  {
    parent::__construct($resource);
    $this->targetUserId = $targetUserId ?? auth()->id();
  }

  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $friendUser = $this->user_id === $this->targetUserId
      ? $this->friendUser // You sent the request
      : $this->user; // You received the request
    return [
      'request_id' => $this->id,
      'friend_id' => $friendUser->uuid,
      'name' => $friendUser->name,
      'username' => $friendUser->username,
      'email' => $friendUser->email,
      'cover_url' => $friendUser->cover_path
        ? asset(Storage::url($friendUser->cover_path))
        : asset('images/default_cover_image.jpg'),
      'avatar_url' => $friendUser->avatar_path
        ? asset(Storage::url($friendUser->avatar_path))
        : asset('images/default_avatar_image.png')
    ];
  }
}