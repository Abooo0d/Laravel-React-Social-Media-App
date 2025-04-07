<?php

namespace App\Http\Enums;

enum NotificationTypeEnum: string
{
  case NEWPOST = 'newPost|postActions';
  case UPDATEPOST = 'updatePost|postActions';
  case DELETEPOST = 'deletePost|postActions';
  case POSTREACTION = 'postReaction|postActions';

  case CREATECOMMENT = 'postComment|commentActions';
  case UPDATECOMMENT = 'updateComment|commentActions';
  case DELETECOMMENT = 'deleteComment|commentActions';
  case COMMENTREACTION = 'commentReaction|commentActions';

  case GROUPUPDATED = 'groupUpdated|groupAction';
  case GROUPINVITATION = 'groupInvitation|groupAction';
  case ACCEPTIVITATION = 'acceptInvitation|groupAction';
  case JOINGROUPREQUEST = 'joinGroupRequest|groupAction';
  case REQUESTACTION = 'requestAction|groupAction';
  case GROUPUSERACTION = 'groupUserAction|groupAction';

  case SENDFRIENDREQUEST = 'sendFriendRequest|userAction';
  case ACCEPTFRIENDREQUEST = 'acceptFriendRequest|userAction';
  case BLCOKFRIENDREQUEST = 'blockFriendRequest|userAction';
}
