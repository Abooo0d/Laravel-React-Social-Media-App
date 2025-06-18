import { useChatsContext } from "@/Contexts/ChatsContext";
import { useUserContext } from "@/Contexts/UserContext";
import React, { useEffect, useState } from "react";
import ChatInfoMenu from "./ChatInfoMenu";
import { IoVolumeMute } from "react-icons/io5";
import { TbLock } from "react-icons/tb";

const ChatInfo = () => {
  const { currentChat, setShowChatInfo } = useChatsContext();
  const { onlineUsersIds } = useChatsContext();
  const { user } = useUserContext();
  const [online, setOnline] = useState();
  const showUsers = () => {
    let users = [];
    if (currentChat?.users?.length > 3) {
      users = currentChat?.users
        ?.slice(0, 3)
        ?.map((u) => (u.name == user.name ? "You" : u.name));
      users = users?.join(", ");
      users = users + ", and " + `${currentChat.users.length - 3}` + " others";
    } else {
      users = currentChat?.users?.map((u) =>
        u.name == user.name ? "You" : u.name
      );
      users = users?.join(", ");
    }
    return users;
  };
  useEffect(() => {
    setOnline(onlineUsersIds.includes(currentChat.user_id));
  }, [onlineUsersIds]);
  return (
    <div className="w-full bg-gray-900 z-[50] md:py-2 md:px-8 py-1 px-4 gap-4 border-b-solid border-b-[1px] border-gray-600/50 backdrop-blur-md cursor-pointer flex justify-between items-center">
      <div
        className="flex justify-start items-center gap-4 flex-1 hover:bg-gray-800/50 duration-200 rounded-md px-2"
        onClick={(e) => {
          setShowChatInfo(true);
        }}
      >
        <div className="relative ">
          <img
            src={currentChat?.avatar_url}
            alt="chat_image"
            className="md:w-[50px] md:h-[50px] w-[40px] h-[40px] rounded-full object-cover border-solid border-[1px] border-gray-600"
          />
          {online && (
            <span className="absolute top-0 right-0 w-[15px] h-[15px] rounded-full bg-green-500 backdrop-blur-md animate-pulse" />
          )}
        </div>
        <div className="flex justify-start items-start flex-col">
          <div className="flex justify-start items-center w-full gap-6">
            <h2 className="text-gray-400 md:text-xl text-lg cursor-default">
              {currentChat?.name}
            </h2>
            <div className="flex justify-end items-center gap-2 w-[40px]">
              {currentChat.status?.muted && (
                <span className="w-6 h-6 flex justify-center items-center bg-gray-800 rounded-md p-1">
                  <IoVolumeMute className="w-6 h-6 text-gray-500" />
                </span>
              )}
              {currentChat.status?.blocked && (
                <span className="w-6 h-6 flex justify-center items-center bg-gray-800 rounded-md p-1">
                  <TbLock className="w-6 h-6 text-gray-500" />
                </span>
              )}
            </div>
          </div>
          <div className="text-gray-500 md:text-sm  text-xs">
            {currentChat.is_group ? showUsers() : currentChat?.data?.email}
          </div>
        </div>
      </div>
      <ChatInfoMenu swtShowChatInfo={setShowChatInfo} />
    </div>
  );
};

export default ChatInfo;
