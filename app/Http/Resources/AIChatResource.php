<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AIChatResource extends JsonResource
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
      'messages' => AIMessageResource::collection(
        $this->AImessages,
      ),
      'created_at' => $this->created_at?->format('m/d H:i'),
      'updated_at' => $this->updated_at?->format('m/d H:i'),
    ];
  }
}
