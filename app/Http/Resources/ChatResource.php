<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class ChatResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    $user_id = !(bool) $this->is_group ? $this->users()->where(function ($q) {
      $q->where('user_id', '!=', auth()->id());
    })->first()?->id : null;

    $image = '';
    $data = '';
    if (!(bool) $this->is_group) {
      $data = $this->users->firstWhere('id', '!=', auth()->id());
    }
    if ((bool) $this->is_group) {
      $image = $this->avatar_path
        ? Storage::url($this->avatar_path)
        : asset('images/default_avatar_image.png');
    } else
      $image = !!$this->users->firstWhere('id', '!=', auth()->id())?->avatar_path
        ? Storage::url($this->users->firstWhere('id', '!=', auth()->id())?->avatar_path)
        : asset('images/default_avatar_image.png');
    return [
      'id' => $this->id,
      'name' => (bool) $this->is_group
        ? $this->name
        : $this->users->firstWhere('id', '!=', auth()->id())?->name,
      'users' => $this->users->map(
        fn($user) => [
          'id' => $user->id,
          'name' => $user->name,
          'avatar' => $user->avatar_path ? Storage::url($user->avatar_path) : asset('images/default_avatar_image.png'),
          'is_admin' => $user->pivot->admin
        ]
      ),
      // 'allUsersData' => $this->users,
      'user_id' => $user_id,
      'avatar_url' => $image,
      'is_group' => !!$this->is_group,
      'messages' => MessageResource::collectionWithTarget(
        resourceCollection: $this->messages,
        targetUserId: $user_id,
        isGroup: !!$this->is_group
      ),
      'created_at' => $this->created_at?->format('Y-m-d'),
      'updated_at' => $this->updated_at?->format('Y-m-d'),
      'data' => !$this->is_group ? new UserResource($data) : '',
      'status' => [
        'blocked' => !!$this->status?->blocked,
        'muted' => !!$this->status?->mute
      ],
      'is_current_user_admin' => !!$this->isCurrentUserAdmin,
      'owner' => (bool) $this->owner
      // 'last_message' => $this->last_message,
      // 'last_message_id' => $this->last_message_id,
      // 'last_message_date' => $this->last_message_date,
      // 'unread_messages_count' => $this->unread_messages_count
      // 'unread_count' => $this?->unreadMessagesCountFor(auth()->id()),
    ];
  }
}
