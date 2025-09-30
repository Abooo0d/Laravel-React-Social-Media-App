<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
  // Redirect to provider
  public function redirect($provider)
  {
    return Socialite::driver($provider)->redirect();
  }

  // Callback from provider
  public function callback($provider)
  {
    $socialUser = Socialite::driver($provider)->user();
    // $avatarUrl = $socialUser->getAvatar();
    $name = $socialUser->getName() ?? $socialUser->getNickname();
    $email = $socialUser->getEmail();
    // Find or create user
    $user = User::updateOrCreate(
      [$provider . '_id' => $socialUser->getId()],
      [
        'name' => $name,
        'email' => $email,
      ]
    );
    Auth::login($user);
    return redirect('/'); // redirect to React/Inertia app home
  }
}
