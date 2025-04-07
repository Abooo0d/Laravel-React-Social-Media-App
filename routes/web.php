<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
// Profile Group
Route::middleware('auth')->group(function () {
  Route::get('my-profile', [ProfileController::class, 'myProfile'])->name('profile.myProfile');
  Route::get('/profile/{user:username}', [ProfileController::class, 'index'])->name('profile.view');
  Route::post('/profile/change_images', [ProfileController::class, 'changeImages'])->name('profile.changeImages');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// Post Group
Route::middleware('auth')->group(function () {
  Route::post('/post', [PostController::class, 'store'])->name('post.create');
  Route::post('/post/{post}', [PostController::class, 'update'])->name('post.update');
  Route::delete('/post/{post}', [PostController::class, 'destroy'])->name('post.delete');
  Route::get('/post/download/{attachment}', [PostController::class, 'downloadAttachment'])->name('post.download');
  Route::post('/post/{post}/reaction', [PostController::class, 'postReaction'])->name('post.reaction');
  Route::post('/post/{post}/comment', [PostController::class, 'postCommentCreate'])->name('post.commentCreate');
});
Route::get('/public/post/{post:id}', [PostController::class, 'publicView'])->name('post.publicView');
// Comment Group
Route::middleware('auth')->group(function () {
  Route::delete('/comment/{comment}', [PostController::class, 'DeleteComment'])->name('comment.delete');
  Route::put('/comment/{comment}', [PostController::class, 'EditComment'])->name('comment.edit');
  Route::post('/comment/{comment}/reaction', [PostController::class, 'CommentReaction'])->name('comment.reaction');
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
});
Route::middleware('auth')->group(function () {
  Route::post('/user/search', [UserController::class, 'searchForUser'])->name('user.searchForUser');
  Route::post('/user/invite/{user:id}', [UserController::class, 'addFriend'])->name('user.addFriend');
  Route::post('/user/acceptRequest', [UserController::class, 'acceptRequest'])->name('user.acceptRequest');
});
require __DIR__ . '/auth.php';