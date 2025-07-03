<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AIMessageResource extends JsonResource
{

  public function toArray(Request $request): array
  {
    return [
      "id" => $this->id,
      "body" => $this->body,
      "attachments" => MessageAttachmentResource::collection($this->attachments),
      'created_at' => $this?->created_at->format('M:d - H:i'),
      'chat_id' => $this->chat_id,
      'from' => $this->from
    ];
  }
}