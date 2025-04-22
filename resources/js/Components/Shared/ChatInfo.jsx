import { useMainContext } from "@/Contexts/MainContext";
import React, { useEffect, useState } from "react";

const ChatInfo = ({ chat }) => {
  const { onlineUsersIds } = useMainContext();
  const [online, setOnline] = useState();
  useEffect(() => {
    setOnline(onlineUsersIds.includes(chat.user_id));
  }, [onlineUsersIds]);
  return (
    <div className="w-full bg-gray-900 z-[50] py-2 px-8 flex justify-start items-center gap-4 border-b-solid border-b-[1px] border-gray-600/50">
      <div className="relative">
        <img
          src={chat?.avatar_url}
          alt="chat_image"
          className="w-[50px] h-[50px] rounded-full object-cover border-solid border-[1px] border-gray-600"
        />
        {online && (
          <span className="absolute top-0 right-0 w-[15px] h-[15px] rounded-full bg-green-500 animate-pulse" />
        )}
      </div>
      <h2 className="text-gray-400 text-xl cursor-default">{chat?.name}</h2>
    </div>
  );
};

export default ChatInfo;
