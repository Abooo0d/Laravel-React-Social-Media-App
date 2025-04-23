<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MessageResource extends JsonResource
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
    // dd($this->targetUserId, 'Abood');
    parent::__construct($resource);
    $this->targetUserId = $targetUserId;
  }
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'body' => $this->body,
      'attachment' => $this->attachment_path,
      'created_at' => $this?->created_at->format('M:d - H:i'),
      'user' => [
        'id' => $this->user->id,
        'name' => $this->user->name,
        'username' => $this->user->username,
        'avatar_url' => $this->user->avatar_path
          ? Storage::url($this->user->avatar_path)
          : asset('images/default_avatar_image.png'),
      ],
      'chat_id' => $this->chat_id,
      'status' => $this->targetUserId != 0 ? $this->status($this->targetUserId)->first() : null
    ];
  }
}
