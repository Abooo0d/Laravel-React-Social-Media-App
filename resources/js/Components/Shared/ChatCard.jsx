import React, { useEffect, useState } from "react";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";
import { MdGroups2 } from "react-icons/md";
import { useChatsContext } from "@/Contexts/ChatsContext";

const ChatCard = ({ chat, isGroup = false }) => {
  const { setCurrentChat } = useChatsContext();
  const { onlineUsersIds } = useChatsContext();
  const [online, setOnline] = useState(onlineUsersIds.includes(chat.user_id));
  const getChat = () => {
    let props = !!isGroup
      ? { is_group: !!isGroup, chat_id: chat.id }
      : { is_group: !!isGroup, chat_id: chat.id };
    if (window.location.pathname == "/chats") {
      axiosClient
        .post(route("getChat"), props)
        .then(({ data }) => {
          setCurrentChat(data.chat_with_friend);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    setOnline(onlineUsersIds.includes(chat.user_id));
  }, [onlineUsersIds]);

  return (
    <div
      className="min-h-[50px] w-[250px] flex items-center justify-start gap-2 py-2 px-4 text-gray-400 duration-200 rounded-md hover:bg-gray-800/60 cursor-pointer"
      onClick={() => {
        getChat();
      }}
    >
      <div className="relative">
        <img
          src={chat.avatar_url}
          alt="user"
          className="w-[40px] h-[40px] rounded-full"
        />
        {online && (
          <span className="absolute top-0 right-0 w-[10px] h-[10px] rounded-full bg-green-500  animate-pulse" />
        )}
        {isGroup && (
          <span className="absolute bottom-[-5px] right-[-5px] w-[25px] h-[25px] rounded-full flex justify-center items-center bg-gray-800/70 border-solid border-[1px] border-gray-500/50 backdrop-blur-sm">
            <MdGroups2 className="text-gray-300" />
          </span>
        )}
      </div>
      <div className="flex flex-col ">
        <h3 className="text-[16px] w-full text-nowrap overflow-hidden">
          {chat.name.length > 20 ? chat.name.substr(0, 20) + "..." : chat.name}
        </h3>
        <p className="text-gray-600 text-sm">
          {chat?.last_message
            ? chat.last_message.length > 25
              ? chat.last_message.substr(0, 25) + "..."
              : chat.last_message
            : "New Chat"}
        </p>
      </div>
    </div>
  );
};

export default ChatCard;
