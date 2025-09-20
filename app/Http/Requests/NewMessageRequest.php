<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;

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
      // 'attachments.*' => ['file', 'max:20480']
      'attachments.*' => [
        'file',
        File::types([
          'jpg',
          'jpeg',
          'png',
          'gif',
          'mp3',
          'webp',
          'wav',
          'mp4',
          'doc',
          'docx',
          'pdf',
          'csv',
          'xls',
          'xlsx',
          'zip',
          'pptx'
        ])->max(100 * 1024 * 1024)
      ],
    ];
  }
}