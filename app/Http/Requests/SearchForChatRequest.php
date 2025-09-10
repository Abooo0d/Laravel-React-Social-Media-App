<?php

namespace App\Http\Requests;

use App\Models\Chat;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SearchForChatRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  /**
   * Summary of chat
   * @var  \App\Models\Chat[] $chats
   */
  public $chats = null;
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
      'name' => [
        'required',
        function ($attribute, $value, \Closure $fail) {
          $this->chats = Chat::query()
            ->where('name', 'LIKE', "%{$value}%")
            ->get();
          if (!$this->chats) {
            $fail('There Is No Chat With This Name');
          }
        }
      ]
    ];
  }
}