<?php

namespace App\Http\Controllers;

use App\Http\Enums\GroupUserRuleEnum;
use App\Http\Enums\GroupUserStatusEnum;
use App\Http\Requests\InviteUserRequest;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Group;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\GroupResource;
use App\Http\Resources\GroupUserResource;
use App\Models\GroupUsers;
use App\Models\Post;
use App\Models\User;
use App\Notifications\GroupInvitation;
use App\Notifications\InvitationApproved;
use App\Notifications\JoinRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GroupController extends Controller
{
  public function index(Group $group)
  {
    $users = User::query()
      ->select(['users.*', 'gu.role', 'gu.status', 'gu.group_id'])
      ->join('group_users AS gu', 'gu.user_id', 'users.id')
      ->orderBy('users.name')
      ->where('group_id', $group->id)
      ->get();
    $posts = Post::PostsForTimeLine(Auth::id())
      ->where('group_id', $group->id)
      ->latest()
      ->paginate(15);
    $allPosts = PostResource::collection($posts);
    return Inertia::render(component: 'Group/View', props: [
      'group' => new GroupResource(resource: $group),
      'requests' => UserResource::collection($group->requestUsers()->get()),
      'users' => GroupUserResource::collection($users),
      'isAdmin' => $group->isAdmin(Auth::id()),
      'posts' => [
        'posts' => $allPosts,
        'meta' => [
          'total' => $posts->total(),
          'current_page' => $posts->currentPage(),
          'per_page' => $posts->perPage(),
          'last_page' => $posts->lastPage(),
          'from' => $posts->firstItem(),
          'to' => $posts->lastItem(),
        ]
      ]
    ]);
  }
  public function store(StoreGroupRequest $request)
  {
    // dd('ABood');
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
    $group->update($request->validated());
    // return redirect()->back()->with('success', 'Group updated successfully!');
    // return redirect()->route('group.update', $group)->with('success', 'Group updated successfully!');
    return redirect()->back()->with('success', 'Group updated successfully');
  }
  public function destroy(Group $group)
  {
    //
  }
  public function changeImages(Request $request, Group $group)
  {
    $message = '';
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
      // return redirect()->back()->with('error', 'You do not have permission to change images');
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
      $message = 'Cover Image Updated Successfully';
    }
    if ($thumbnail) {
      if ($group->thumbnail_path) {
        Storage::disk('public')->delete($group->thumbnail_path);
      }
      $thumbnail_path = $thumbnail->store("group-{$group->id}", 'public');
      $group->update(['thumbnail_path' => $thumbnail_path]);
      $message = 'Thumbnail Image Updated Successfully';
    }
    return redirect()->back()->with('success', $message);
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
    return redirect()->back()->with('success', `$user.name Was Invited Successfully`);
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
    // return redirect(route('group.profile', $groupUser->group))->with('success', 'You Are Now A Member Of This Group');
    return redirect()->back()->with('success', 'You Are New A Member Of Thi Group');
  }
  public function joinGroup(Request $request, Group $group)
  {
    $user = $request->user();
    $status = GroupUserStatusEnum::APPROVED->value;
    $message = 'You Have Joined ' . $group->name . ' Successfully';
    if (!$group->auto_approval) {
      $message = 'Your Request Has Been Received, You Will Be Notified When Accepted';
      $status = GroupUserStatusEnum::PENDING->value;
      $group->adminUsers->each(function ($adminUser) use ($group, $user) {
        Notification::send(
          $adminUser,
          new JoinRequest($group, $user)
        );
      });
    }
    GroupUsers::create([
      'user_id' => $user->id,
      'group_id' => $group->id,
      'created_by' => Auth::id(),
      'status' => $status,
      'role' => GroupUserRuleEnum::USER->value,
    ]);
    return response()->json([
      'message' => $message,
      'group' => new GroupResource($group)
    ]);
  }
  public function approveRequest(Request $request, Group $group)
  {
    $data = $request->validate([
      'user_id' => 'required'
    ]);
    $groupUser = GroupUsers::where('user_id', $data['user_id'])
      ->where('group_id', $group->id)
      ->where('status', GroupUserStatusEnum::PENDING->value)
      ->first();
    if (!$groupUser) {
      return response(['message' => "There IS An Error With The Request"], 404);
    }
    $groupUser->status = GroupUserStatusEnum::APPROVED->value;
    $groupUser->save();
    return response(['message' => "The User Have Been Approved"], 200);
  }
  public function reject(Request $request, Group $group)
  {
    $data = $request->validate([
      'user_id' => 'required'
    ]);
    $groupUser = GroupUsers::where('user_id', $data['user_id'])
      ->where('group_id', $group->id)
      ->where('status', GroupUserStatusEnum::PENDING->value)
      ->first();
    if ($groupUser) {
      $groupUser->status = GroupUserStatusEnum::REJECTED->value;
      $groupUser->save();
      return response(['message' => 'User Have Been Rejected'], 200);
    }
    return response(['message' => 'There Is An Error In The Request'], 400);
  }
  public function changeRole(Request $request, Group $group)
  {
    $data = $request->validate([
      'user_id' => 'required',
      'role' => Rule::enum(GroupUserRuleEnum::class)
    ]);
    $user_id = $data['user_id'];
    $groupUser = GroupUsers::where('user_id', $data['user_id'])
      ->where('group_id', $group->id)
      ->where('status', GroupUserRuleEnum::USER->value)
      ->first();
    if ($group->isOwner($user_id)) {
      return response(['message' => 'You Can`t Change The Role Of The Owner Of The Group', 400]);
    }
    if ($groupUser) {
      if ($group->isAdmin(Auth::id())) {
        $groupUser->role = $data['role'];
        $groupUser->save();
        // return response(['message' => 'The Role Changed Successfully'], 200);
        return redirect()->back()->with('success', 'THe Role Changed Successfully');
      }
    }
    return response(['message' => 'there Is An Unexpected Error']);
  }
}