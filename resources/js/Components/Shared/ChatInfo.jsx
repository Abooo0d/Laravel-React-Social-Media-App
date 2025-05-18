import { useChatsContext } from "@/Contexts/ChatsContext";
import { useMainContext } from "@/Contexts/MainContext";
import { useUserContext } from "@/Contexts/UserContext";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

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
      users = currentChat?.users?.map((user) => user.name);
      users = users?.join(", ");
    }
    return users;
  };
  useEffect(() => {
    setOnline(onlineUsersIds.includes(currentChat.user_id));
  }, [onlineUsersIds]);
  return (
    <div
      className="w-full bg-gray-900 z-[50] py-2 px-8 gap-4 border-b-solid border-b-[1px] border-gray-600/50 backdrop-blur-md cursor-pointer flex justify-between items-center"
      onClick={() => setShowChatInfo(true)}
    >
      <div className="flex justify-start items-center gap-4">
        <div className="relative ">
          <img
            src={currentChat?.avatar_url}
            alt="chat_image"
            className="w-[50px] h-[50px] rounded-full object-cover border-solid border-[1px] border-gray-600"
          />
          {online && (
            <span className="absolute top-0 right-0 w-[15px] h-[15px] rounded-full bg-green-500 backdrop-blur-md animate-pulse" />
          )}
        </div>
        <div className="flex justify-start items-start flex-col">
          <h2 className="text-gray-400 text-xl cursor-default">
            {currentChat?.name}
          </h2>
          <div className="text-gray-500 text-sm">{showUsers()}</div>
        </div>
      </div>
      <div
        className=" text-gray-400 w-8 h-8 flex justify-center items-center cursor-pointer duration-200 hover:bg-white/5 rounded-md"
        // onClick={() => setShowMenu(!showMenu)}
      >
        <HiDotsVertical className="w-5 h-5" />
      </div>
    </div>
  );
};

export default ChatInfo;
