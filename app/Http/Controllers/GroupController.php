<?php

namespace App\Http\Controllers;

use App\Http\Enums\GroupUserRuleEnum;
use App\Http\Enums\GroupUserStatusEnum;
use App\Http\Requests\InviteUserRequest;
use App\Models\Group;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\GroupResource;
use App\Http\Resources\GroupUserResource;
use App\Models\GroupUsers;
use App\Notifications\GroupInvitation;
use App\Notifications\InvitationApproved;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Stringable;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GroupController extends Controller
{
  public function index(Group $group)
  {
    return Inertia::render('Group/View', ['group' => new GroupResource($group)]);
  }
  public function store(StoreGroupRequest $request)
  {
    $data = $request->validated();
    $user_id = Auth::id();
    $group = Group::create([
      'name' => $data['name'],
      'auto_approval' => $data['autoApproval'],
      'about' => $data['about'],
      'user_id' => $user_id,
    ]);
    $groupUser = GroupUsers::create([
      'user_id' => $user_id,
      'group_id' => $group->id,
      'created_by' => $user_id,
      'status' => GroupUserStatusEnum::APPROVED->value,
      'role' => GroupUserRuleEnum::ADMIN->value,
    ]);
    $group['role'] = 'admin';
    $group['status'] = 'approved';
    return response(
      [
        'group' => new GroupResource($group),
      ],
      201
    );
  }
  public function update(UpdateGroupRequest $request, Group $group)
  {
    //
  }
  public function destroy(Group $group)
  {
    //
  }
  public function changeImages(Request $request, Group $group)
  {
    $data = $request->validate([
      'coverImage' => ['nullable', 'file', 'mimes:jpg,png'],
      'avatarImage' => ['nullable', 'file', 'mimes:jpg,png'],
      'group_id' => ['required']
    ]);
    $group = Group::query()
      ->with('currentUserGroups')
      ->where('id', $data['group_id'])->first();
    if ($group->currentUserGroups['role'] !== 'admin') {
      return back()->withErrors(['message' => 'You do not have permission to change images.']);
    }
    /**
     * @var UploadedFile $cover
     */
    $cover = $data['coverImage'] ?? null;
    /**
     * @var UploadedFile $thumbnail
     */
    $thumbnail = $data['avatarImage'] ?? null;
    if ($cover) {
      if ($group->cover_path) {
        Storage::disk('public')->delete($group->cover_path);
      }
      $coverPath = $cover->store("group-{$group->id}", 'public');
      $group->update(['cover_path' => $coverPath]);
    }
    if ($thumbnail) {
      if ($group->thumbnail_path) {
        Storage::disk('public')->delete($group->thumbnail_path);
      }
      $thumbnail_path = $thumbnail->store("group-{$group->id}", 'public');
      $group->update(['thumbnail_path' => $thumbnail_path]);
    }
    return back();
  }
  public function inviteUser(InviteUserRequest $request, Group $group)
  {
    $data = $request->validated();
    $user = $request->user;
    $groupUser = $request->groupUser;
    if ($groupUser) {
      $groupUser->delete();
    }
    $hours = 24;
    $token = Str::random(265);
    GroupUsers::create([
      'user_id' => $user->id,
      'group_id' => $group->id,
      'created_by' => Auth::id(),
      'status' => GroupUserStatusEnum::PENDING->value,
      'role' => GroupUserRuleEnum::USER->value,
      'token' => $token,
      'token_expire_date' => Carbon::now()->addHours($hours),
      'token_used' => '',
      'created_at' => '',
    ]);
    $user->notify(new GroupInvitation($group, $hours, $token));
    return back()->with('success', 'User Has Been Invited Successfully');
  }
  public function acceptInvitation(string $token)
  {
    $groupUser = GroupUsers::query()->where('token', $token)->first();
    $message = '';
    if (!$groupUser) {
      $message = 'This Link Isn`t Valid!';
    } elseif ($groupUser->status == GroupUserStatusEnum::APPROVED->value || $groupUser->token_used) {
      $message = 'This Link Is Already Used!';
    } elseif ($groupUser->token_expire_date < Carbon::now()) {
      $message = 'This Link Is Expired!';
    }
    if ($message !== '') {
      return inertia('Error', [
        'message' => $message
      ]);
    }
    $groupUser->status = GroupUserStatusEnum::APPROVED->value;
    $groupUser->token_used = Carbon::now();
    $groupUser->save();
    $adminUser = $groupUser->adminUser;
    $group = $groupUser->group;
    $adminUser->notify(new InvitationApproved($group, $groupUser->user));
    return redirect(route('group.profile', $groupUser->group))->with('success', 'You Are Now A Member Of This Group');
  }
}