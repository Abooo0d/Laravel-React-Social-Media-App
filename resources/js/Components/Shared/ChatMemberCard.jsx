import { useChatsContext } from "@/Contexts/ChatsContext";
import { Link } from "@inertiajs/react";
import React from "react";
import ChatMemberMenu from "./ChatMemberMenu";

const ChatMemberCard = ({ user }) => {
  const { currentChat } = useChatsContext();
  return (
    <div className="w-full flex justify-start gap-4 items-center relative hover:bg-gray-800/50 duration-200 rounded-md px-2 py-2">
      <Link
        href={route("profile.view", user?.name)}
        className="flex-1 flex justify-center items-center gap-4"
      >
        <img src={user.avatar} alt="" className="w-12 h-12 rounded-full" />
        <h2 className="flex-1">{user.name}</h2>
      </Link>
      <div className="w-[80px] h-full flex justify-between items-center gap-2">
        {currentChat?.owner == user.id ? (
          <span className="text-[10px] bg-indigo-800/30 border-indigo-800 border-solid border-[1px] rounded-sm text-gray-300 px-1 py-[2px]">
            owner
          </span>
        ) : (
          <>
            {!!user.is_admin ? (
              <span className="text-[10px] bg-emerald-600/40 border-solid border-[1px] border-emerald-600 rounded-sm text-gray-300 px-1 py-[2px]">
                Admin
              </span>
            ) : (
              <div />
            )}
          </>
        )}
        {currentChat.owner != user.id && (
          <>
            {currentChat.is_current_user_admin && (
              <ChatMemberMenu user={user} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMemberCard;
