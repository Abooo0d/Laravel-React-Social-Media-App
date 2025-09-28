<?php

use App\Http\Controllers\AIController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ChatsController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------

| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('Home');
Route::middleware('auth')->group(function () {
  Route::get('/get-posts', [HomeController::class, 'getPosts'])->name('getPosts');
  Route::get('/get-groups', [HomeController::class, 'getGroups'])->name('getGroups');
  Route::get('/get-notifications', [HomeController::class, 'getNotifications'])->name('getNotifications');
  Route::get('/get-chat-groups', [HomeController::class, 'getChatGroups'])->name('getChatGroups');
  Route::post('/notification/read/{notificationId}', [HomeController::class, 'readNotification'])->name('read.notification');
  Route::post('/notification/readAll', [HomeController::class, 'readAllNotifications'])->name('read.allNotifications');
  Route::get('/getSuggestion', [HomeController::class, 'getSuggestions'])->name('getSuggestions');
});
// Profile Group
Route::middleware('auth')->group(function () {
  Route::get('my-profile', [ProfileController::class, 'myProfile'])->name('profile.myProfile');
  Route::get('/profile/{user:uuid}', [ProfileController::class, 'index'])->name('profile.view');
  Route::post('/profile/change_images', [ProfileController::class, 'changeImages'])->name('profile.changeImages');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
  Route::get('profile/posts/{user:uuid}', [ProfileController::class, 'getPostsForUser'])->name('postsForUser');
  Route::get('/profile/download/{user:uuid}/{type}', [ProfileController::class, 'downloadImage'])->name('download.userImage');
});
// Post Group
Route::middleware('auth')->group(function () {
  Route::post('/post', [PostController::class, 'store'])->name('post.create');
  Route::post('/post/{post:uuid}', [PostController::class, 'update'])->name('post.update');
  Route::delete('/post/{post:uuid}', [PostController::class, 'destroy'])->name('post.delete');
  Route::get('/post/download/{attachment:id}', [PostController::class, 'downloadAttachment'])->name('post.download');
  Route::post('/post/{post:uuid}/reaction', [PostController::class, 'postReaction'])->name('post.reaction');
  Route::post('/post/{post:uuid}/comment', [PostController::class, 'postCommentCreate'])->name('post.commentCreate');
});
Route::get('/public/post/{post:uuid}', [PostController::class, 'publicView'])->name('post.publicView');
// Comment Group
Route::middleware('auth')->group(function () {
  Route::delete('/comment/{comment:id}', [PostController::class, 'DeleteComment'])->name('comment.delete');
  Route::put('/comment/{comment:id}', [PostController::class, 'EditComment'])->name('comment.edit');
  Route::post('/comment/{comment:id}/reaction', [PostController::class, 'CommentReaction'])->name('comment.reaction');
});
Route::middleware('auth')->group(function () {
  Route::post('/group', [GroupController::class, 'store'])->name('group.create');
  Route::get('/group/{group:slug}', [GroupController::class, 'index'])->name('group.profile');
  Route::post('/group/change_images', [GroupController::class, 'changeImages'])->name('group.changeImages');
  Route::post('/group/invite/{group:slug}', [GroupController::class, 'inviteUser'])->name('group.inviteUser');
  Route::get('/group/accept-invitation/{token}', [GroupController::class, 'acceptInvitation'])->name('group.acceptInvitation');
  Route::post('/group/join/{group:slug}', [GroupController::class, 'joinGroup'])->name('group.join');
  Route::post('/group/approve/{group:slug}', [GroupController::class, 'approveRequest'])->name('group.approveRequest');
  Route::post('/group/reject/{group:slug}', [GroupController::class, 'reject'])->name('group.rejectRequest');
  Route::post('/group/change-role/{group:slug}', [GroupController::class, 'changeRole'])->name('group.changeRole');
  Route::delete('/group/kick-out/{group:slug}', [GroupController::class, 'kickOut'])->name('group.kickOut');
  Route::put('/group/{group:slug}', [GroupController::class, 'update'])->name('group.update');
  Route::get('/group/getPosts/{group:slug}', [GroupController::class, 'getPostsForGroup'])->name('postsForGroup');
  Route::post('/group/search', [GrouPController::class, 'searchForGroups'])->name('group.searchForGroup');
  Route::get('/group/download/{group:slug}/{type}', [GroupController::class, 'downloadImage'])->name('download.groupImage');
  Route::delete('/group/{group:slug}/destroy', [GroupController::class, 'destroy'])->name('group.destroy');
});
Route::middleware('auth')->group(function () {
  Route::post('/user/search', [UserController::class, 'searchForUser'])->name('user.searchForUser');
  Route::post('/user/invite/{user:uuid}', [UserController::class, 'addFriend'])->name('user.addFriend');
  Route::post('/user/add/{user:uuid}', [UserController::class, 'addFriendFormSuggestion'])->name('user.addFriendFormSuggestion');
  Route::post('/user/reject-request/{user:uuid}', [UserController::class, 'rejectRequest'])->name('user.rejectRequest');
  Route::post('/user/accept-request', [UserController::class, 'acceptRequest'])->name('user.acceptRequest');
  Route::post('/user/cancel-request-suggestion/{user:uuid}', [UserController::class, 'cancelRequestFromSuggestion'])->name('user.cancelRequestFromSuggestion');
  Route::post('/user/cancel-request/{user:uuid}', [UserController::class, 'cancelRequest'])->name('user.cancelRequest');
  Route::post('/user/unfriend/{user:uuid}', [UserController::class, 'unfriend'])->name('user.unfriend');
});
Route::middleware('auth')->group(function () {
  Route::get('/chats', [ChatsController::class, 'index'])->name('chats');
  Route::post('/chats', [ChatsController::class, 'getChat'])->name('getChat');
  Route::post('/chat/new_message/{chat:uuid}', [chatsController::class, 'newMessage'])->name('newMessage');
  Route::post('/chat/read-message/{message:id}', [ChatsController::class, 'messageRead'])->name('readMessage');
  Route::get('/chat/get_more_messages/{message:id}', [ChatsController::class, 'getMoreMessages'])->name('getMoreMessages');
  Route::post('/chat/search', [ChatsController::class, 'searchForChat'])->name('chat.searchForChat');
  Route::get('/chat/download/{attachment}', [ChatsController::class, 'downloadAttachment'])->name('chat.download');
  Route::post('/chat/update-message/{message:id}', [ChatsController::class, 'UpdateMessage'])->name('chat.updateMessage');
  Route::delete('/chat/delete-message/{message:id}', [ChatsController::class, 'deleteMessage'])->name('chat.deleteMessage');
  Route::post('/chat/create-groupChat', [ChatsController::class, 'createChatGroup'])->name('chat.createGroupChat');
  Route::post('/chat/{chat:uuid}/mute', [ChatsController::class, 'muteChat'])->name('chat.mute');
  Route::post('/chat/{chat:uuid}/block', [ChatsController::class, 'blockChat'])->name('chat.block');
  Route::post('/chat/{chat:uuid}/delete', action: [ChatsController::class, 'deleteChat'])->name('chat.delete');
  Route::post('/chat/{chat:uuid}/change-image', [ChatsController::class, 'ChangeChatGroupImage'])->name('chat.changeImage');
  Route::post('/chat/{chat:uuid}/change-name', [ChatsController::class, 'ChangeChatName'])->name('chat.changeName');
  Route::post('/chat/{chat:uuid}/add-users', [ChatsController::class, 'addUsersToChat'])->name('chat.addMembers');
  Route::post('chat/{chat:uuid}/set-admin', [chatsController::class, 'ChangeRoleInChat'])->name('chat.setAdmin');
  Route::post('chat/{chat:uuid}/kick-out', [ChatsController::class, 'kickOut'])->name('chat.kickOut');
  Route::post('/chat/{chat:uuid}/video-call', [ChatsController::class, 'videoCall'])->name('chat.videoCall');
  Route::post('/chat/{chat:uuid}/voice-call', [ChatsController::class, 'voiceCall'])->name('chat.voiceCall');
  Route::post('/chat/{chat:uuid}/decline-call', [ChatsController::class, 'callDecline'])->name('call.decline');
});
Route::middleware('auth')->group(function () {
  Route::get('/ai-chats', [AIController::class, 'index'])->name('aiChats');
  Route::post('/post/aiPost/post', [AIController::class, 'aiPost'])->name('post.aiPost');
  Route::post('/ai-chat/new-message', [AIController::class, 'newMessage'])->name('AIChat.newMessage');

});
Route::post('/login-mobile', [AuthenticatedSessionController::class, 'storeMobile']);
require __DIR__ . '/auth.php';
