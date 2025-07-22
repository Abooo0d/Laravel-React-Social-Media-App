<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;
use Pest\Bootstrappers\BootOverrides;

class StorePostRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
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
      'body' => ['nullable', "string", 'required_without:attachments'],
      'attachments' => ['array', 'nullable', 'max:10', 'required_without:body'],
      'attachments.*' => ['file', 'max:1024000'],
      // 'attachments' => ['array', 'max:10'],
      // 'attachments.*' => [
      //   'file',
      //   File::types([
      //     'jpg',
      //     'jpeg',
      //     'png',
      //     'gif',
      //     'mp3',
      //     'webp',
      //     'wav',
      //     'mp4',
      //     'doc',
      //     'docx',
      //     'pdf',
      //     'csv',
      //     'xls',
      //     'xlsx',
      //     'zip'
      //   ])->max(512 * 1024 * 1024)
      // ],
      "user_id" => ['required', 'exists:users,id'],
      'group_id' => ['nullable', 'exists:groups,id']
    ];
  }
  protected function prepareForValidation()
  {
    $this->merge(['user_id' => auth()->user()->id]);
  }
  public function messages()
  {
    return [
      'attachments.*' => 'Invalid File Type'
    ];
  }
}