import { Link, router } from "@inertiajs/react";
import React from "react";
import { PrimaryButton } from "./Buttons";
import axiosClient from "@/AxiosClient/AxiosClient";

const ChatCard = ({ chat, setChat, isGroup = false }) => {
  const getChat = () => {
    let props = !!isGroup
      ? { is_group: !!isGroup, chat_id: chat.id }
      : { is_group: !!isGroup, chat_id: chat.friend_id };
    if (window.location.pathname == "/chats") {
      axiosClient
        .post(route("getChat"), props)
        .then(({ data }) => {
          console.log(data, "ABood");

          setChat(data.chat_with_friend);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.get(route("chats"), props);
    }
  };
  return (
    <PrimaryButton
      classes={`relative min-h-[80px] w-full duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-[10px] group overflow-hidden group border-[1px] border-solid border-gray-500/50 hover:border-gray-600`}
      event={() => {
        getChat();
      }}
    >
      <img
        src={chat.cover_url || "/images/default_cover_image.jpg"}
        alt=""
        className="absolute inset-0 h-[80px] w-[100%] object-cover z-0 rounded-[10px] group-hover:scale-110 duration-200"
      />
      <div className="z-1 bg-black/30 backdrop-blur-sm w-[100%] h-[80px] py-2 px-4 rounded-[10px] overflow-hidden absolute inset-0 flex flex-col gap-2 justify-between items-start">
        <div className="flex gap-4 w-full justify-start items-center rounded-[10px]">
          <img
            src={chat.avatar_url || "/images/default_avatar_image.png"}
            alt="follower-img"
            className="w-[60px] h-[60px] rounded-full object-cover duration-200"
          />
          <h3 className="font-bold text-md dark:text-gray-200">{chat.name}</h3>
        </div>
      </div>
      <div>{chat.name}</div>
    </PrimaryButton>
  );
};

export default ChatCard;
