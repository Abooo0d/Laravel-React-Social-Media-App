<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->uuid,
      'body' => $this->body,
      'created_at' => $this->created_at->format('Y-m-d H:i:s'),
      'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
      'user' => new UserResource($this->user),
      'attachments' => PostAttachmentResource::collection($this->attachments),
      'group' => new GroupResource($this->group),
      'num_of_reactions' => $this->reactions->count(),
      'user_has_reaction' => $this->reactions->count() > 0,
      'comments' => CommentResource::collection($this->comments),
      'num_of_comments' => $this->comments->count(),
      'latest5Comments' => CommentResource::collection($this->latest5Comments),
    ];
  }
}
