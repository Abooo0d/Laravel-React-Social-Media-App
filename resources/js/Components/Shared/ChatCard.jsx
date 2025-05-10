import React, { useEffect, useState } from "react";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";
import { MdGroups2 } from "react-icons/md";
import { useChatsContext } from "@/Contexts/ChatsContext";

const ChatCard = ({ chat, setShow, setIsLoading }) => {
  const { setCurrentChat, onlineUsersIds } = useChatsContext();
  const [chatData, setChatData] = useState(chat);
  const [unreadCount, setUnreadCount] = useState(0);
  const [online, setOnline] = useState(
    !!onlineUsersIds.includes(chatData.user_id)
  );
  const [isGroup, setIsGroup] = useState(chatData.is_group);
  const getChat = () => {
    setChatData((prev) => ({
      ...prev,
      messages: [
        ...prev.messages?.map((message) => ({ ...message, my_status: true })),
      ],
    }));
    setIsLoading(true);
    let props = !!isGroup
      ? { is_group: !!isGroup, chat_id: chatData.id }
      : { is_group: !!isGroup, chat_id: chatData.id };
    if (window.location.pathname == "/chats") {
      axiosClient
        .post(route("getChat"), props)
        .then(({ data }) => {
          let newChat = {
            ...data.chat_with_friend,
            messages: data?.chat_with_friend.messages?.map((message) => ({
              ...message,
              my_status: true,
            })),
          };
          setCurrentChat(newChat);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setOnline(onlineUsersIds.includes(chatData.user_id));
  }, [onlineUsersIds]);

  useEffect(() => {
    setChatData(chat);
  }, [chat]);

  useEffect(() => {
    setOnline(!!onlineUsersIds.includes(chatData.user_id));
  }, [chatData]);
  useEffect(() => {
    let unread = 0;
    chatData.messages.map((message) => {
      !message?.my_status && unread++;
    });
    setUnreadCount(unread);
  }, [chatData]);

  return (
    <div
      className="min-h-[50px] w-[250px] relative flex items-center justify-start gap-2 py-2 px-4 text-gray-400 duration-200 rounded-md hover:bg-gray-800/60 cursor-pointer"
      onClick={() => {
        setShow(false);
        getChat();
      }}
    >
      <div className="relative">
        <img
          src={chatData.avatar_url}
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
      <div className="flex flex-col bg-blue-1 flex-1">
        {unreadCount > 0 && (
          // <span className="absolute bottom-4 right-4 w-4 h-4 rounded-md bg-blue-500/50 flex justify-center items-center">
          <span className="w-4 h-4 bg-blue-500/40 border-[1px] border-solid border-blue-500 backdrop-blur-sm absolute bottom-2 right-4 text-[12px] flex justify-center items-center rounded-md text-gray-300  p-0">
            {unreadCount}
          </span>
        )}
        <div className="flex flex-1 gap-1 justify-between items-center w-full ">
          <h3 className="text-[15px] w-full text-nowrap overflow-hidden">
            {chatData.name.length > 20
              ? chatData.name.substr(0, 20) + "..."
              : chatData.name}
          </h3>
          <p className="text-[10px] text-gray-600 w-fit flex flex-col justify-center items-end">
            <span>{chatData?.last_message_date?.split("-")[0]}</span>
            <span>{chatData?.last_message_date?.split("-")[1]}</span>
          </p>
        </div>
        {chat.messages.length > 0 && (
          <p className="text-gray-600 text-sm">
            {chat?.messages[0]?.body?.length > 25
              ? chat?.messages[0]?.body?.substr(0, 25) + "..."
              : chat?.messages[0]?.body}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
