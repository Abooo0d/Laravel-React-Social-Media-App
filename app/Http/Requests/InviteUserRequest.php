<?php

namespace App\Http\Requests;

use App\Http\Enums\GroupUserStatusEnum;
use App\Models\Group;
use App\Models\GroupUsers;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class InviteUserRequest extends FormRequest
{
  public ?User $user = null;
  public ?GroupUsers $groupUser = null;
  public Group $group;
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    $this->group = $this->route('group');
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'email' => [
        'required',
        function ($attribute, $value, \Closure $fail) {
          $this->user = User::query()->where('email', $value)
            ->orWhere('username', $value)
            ->first();
          if (!$this->user) {
            $fail('User Don`t Exist');
          }
          $this->groupUser = GroupUsers::query()->where('user_id', $this->user->id)->where('group_id', $this->group->id)->first();
          if ($this->groupUser && $this->groupUser->status === GroupUserStatusEnum::APPROVED->value) {
            $fail('User Is Already Member Of The Group');
          }
        }
      ]
    ];
  }
}