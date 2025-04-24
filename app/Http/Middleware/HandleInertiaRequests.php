<?php

namespace App\Http\Middleware;
use App\Http\Resources\ChatResource;
use App\Http\Resources\GroupResource;
use App\Models\Group;
use App\Models\User;
use Auth;
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
    if (Auth::id()) {
      $notifications = Auth::user()->notifications()->paginate(10);
      $groups = Group::query()
        ->with('currentUserGroups')
        ->select(['groups.*'])
        ->join('group_users AS gu', 'gu.group_id', 'groups.id')
        ->where('gu.user_id', Auth::id())
        ->orderBy('gu.role')
        ->orderBy('name')
        ->get();
      $groupsData = GroupResource::collection($groups);
      $user = $request->user() !== null ? new UserResource($request->user()) : null;
      $groupChats = auth()->user()->chats()->where('is_group', '1')->with('users', 'messages')->get();
    }
    return [
      ...parent::share($request),
      'auth' => [
        'user' => $user ?? null
      ],
      'notifications' => $notifications ?? null,
      'groups' => $groupsData ?? null,
      'flash' => [
        'success' => session('success'),
        'error' => session('error'),
      ],
      'groupChats' => auth()?->user() ? ChatResource::collection($groupChats) : null
    ];
  }
}
