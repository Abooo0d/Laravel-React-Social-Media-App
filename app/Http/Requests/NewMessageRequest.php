<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class NewMessageRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return !!Auth::id();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'body' => ['nullable', 'string', 'required_without:attachments',],
      'chat_id' => ['required', 'exists:chats,uuid'],
      'user_id' => ['required', 'exists:users,uuid'],
      'attachments' => ['array', 'nullable', 'max:10', 'required_without:body'],
      'attachments.*' => ['file', 'max:20480']
    ];
  }
}
