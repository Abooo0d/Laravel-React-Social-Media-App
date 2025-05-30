<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MessageResource extends JsonResource
{
  protected $targetUserId;
  protected $isGroup;

  public static function collectionWithTarget($resourceCollection, $targetUserId, $isGroup)
  {
    return $resourceCollection->map(
      fn($item) => new self($item, $targetUserId, $isGroup)
    );
  }
  public function __construct($resource, $targetUserId = null, $isGroup = false)
  {
    // dd($this->targetUserId, 'Abood');
    parent::__construct($resource);
    $this->targetUserId = $targetUserId;
    $this->isGroup = $isGroup;
  }
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $unRead = $this->unreadFor($this->targetUserId);
    return [
      'id' => $this->id,
      'body' => $this->body,
      'attachments' => MessageAttachmentResource::collection($this->attachments),
      'created_at' => $this?->created_at->format('M:d - H:i'),
      'user' => [
        'id' => $this->user->id,
        'name' => $this->user->name,
        'username' => $this->user->username,
        'avatar_url' => $this->user->avatar_path
          ? Storage::url($this->user->avatar_path)
          : asset('images/default_avatar_image.png'),
      ],
      'edited' => (bool) $this->edited,
      'deleted' => (bool) $this->deleted,
      'chat_id' => $this->chat_id,
      'is_read' => $this->isGroup ? 'group' : $unRead?->is_read,
      'my_status' => (bool) $this->status()
    ];
  }
}