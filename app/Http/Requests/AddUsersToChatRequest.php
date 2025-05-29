<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddUsersToChatRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return !!$this->chat->isCurrentUserAdmin;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'users' => ['array', 'nullable'],
      'users[]*' => [
        'user_id' => ['required', 'exists:users,id']
      ]
    ];
  }
}