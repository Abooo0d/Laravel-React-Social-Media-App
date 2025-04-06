<?php

namespace App\Http\Enums;

enum FriendsRequestEnum: string
{
  case PENDING = 'pending';
  case ACCEPTED = 'accepted';
  case REJECTED = 'rejected';
  case BLOCKED = 'blocked';
}
