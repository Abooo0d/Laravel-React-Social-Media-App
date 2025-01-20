<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
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
  Route::get('/profile', [ProfileController::class, 'index'])->name('profile.view');
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
  Route::post('/post/{post}/comment', [PostController::class, 'postCommentCreate'])->name('post.comment.create');
});
// Comment Group
Route::middleware('auth')->group(function () {
  Route::delete('/comment/{comment}', [PostController::class, 'DeleteComment'])->name('comment.delete');
  Route::put('/comment/{comment}', [PostController::class, 'EditComment'])->name('comment.edit');
  Route::post('/comment/{comment}/reaction', [PostController::class, 'CommentReaction'])->name('comment.reaction');
});
Route::middleware('auth')->group(function () {
  Route::post('/group', [GroupController::class, 'store'])->name('group.create');
  Route::get('/profile/{group:slug}', [GroupController::class, 'index'])->name('group.profile');
  Route::post('/group/change_images', [GroupController::class, 'changeImages'])->name('group.changeImages');
  Route::post('/group/invite/{group:slug}', [GroupController::class, 'inviteUser'])->name('group.inviteUser');
  Route::get('/group/accept-invitation/{token}', [GroupController::class, 'acceptInvitation'])->name('group.acceptInvitation');
});
require __DIR__ . '/auth.php';