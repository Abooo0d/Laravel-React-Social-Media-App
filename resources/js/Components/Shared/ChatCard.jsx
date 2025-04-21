import React from "react";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";

const ChatCard = ({ chat, setChat, isGroup = false }) => {
  const { onlineUsersIds } = useMainContext();
  const getChat = () => {
    let props = !!isGroup
      ? { is_group: !!isGroup, chat_id: chat.id }
      : { is_group: !!isGroup, chat_id: chat.id };
    if (window.location.pathname == "/chats") {
      axiosClient
        .post(route("getChat"), props)
        .then(({ data }) => {
          console.log(data);
          setChat(data.chat_with_friend);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const isOnline = () => {
    return onlineUsersIds.includes(chat.user_id);
  };

  return (
    <div
      className="w-full min-h-[50px] flex items-center justify-start gap-2 py-2 px-4 text-gray-400 duration-200 rounded-md hover:bg-gray-800/60 cursor-pointer"
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
        {isOnline() && (
          <span className="absolute top-0 right-0 w-[10px] h-[10px] rounded-full bg-green-500" />
        )}
      </div>
      <div className="flex flex-col ">
        <h3 className="text-[16px] w-full text-nowrap overflow-hidden">
          {chat.name}
        </h3>
        <p className="text-gray-600 text-sm">
          {chat?.last_message ? chat.last_message : "New Chat"}
        </p>
      </div>
    </div>
  );
};

export default ChatCard;
