<?php

namespace App\Http\Middleware;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
  /**
   * The root template that is loaded on the first page visit.
   *
   * @var string
   */
  protected $rootView = 'app';

  /**
   * Determine the current asset version.
   */
  public function version(Request $request): string|null
  {
    return parent::version($request);
  }

  /**
   * Define the props that are shared by default.
   *
   * @return array<string, mixed>
   */
  public function share(Request $request): array|RedirectResponse
  {
    $user = $request->user() !== null ? new UserResource($request->user()) : null;
    return [
      ...parent::share($request),
      'auth' => [
        'user' => $user
      ],
      'flash' => [
        'success' => session('success'),
        'error' => session('error'),
      ],
    ];
  }
}