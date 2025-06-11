import axiosClient from "@/AxiosClient/AxiosClient";
import { useChatsContext } from "@/Contexts/ChatsContext";
import { useMainContext } from "@/Contexts/MainContext";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
const ChatMemberMenu = ({ user }) => {
  const { currentChat, setCurrentChat } = useChatsContext();
  const [showMenu, setShowMenu] = useState(false);
  const { setSuccessMessage, setErrors } = useMainContext();
  const [isAdmin, setIsAdmin] = useState(user.is_admin ?? false);
  const setAdmin = () => {
    axiosClient
      .post(route("chat.setAdmin", currentChat.id), {
        user_id: user.id,
        role: isAdmin ? "user" : "admin",
      })
      .then((data) => {
        setCurrentChat((prev) => ({
          ...prev,
          users: prev.users.map((u) =>
            u.id == user.id ? { ...u, is_admin: isAdmin ? false : true } : u
          ),
        }));
        setIsAdmin(isAdmin ? false : true);
        setSuccessMessage(data?.data?.message);
        setShowMenu(false);
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };

  const kickOut = () => {
    axiosClient
      .post(route("chat.kickOut", currentChat.id), {
        user_id: user.id,
      })
      .then((data) => {
        let chat = {
          ...currentChat,
          users: currentChat.users.filter((u) => u.id !== user.id),
        };
        setCurrentChat(chat);
        setSuccessMessage(data.data.message);
        setShowMenu(false);
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
        setShowMenu(false);
      });
  };

  return (
    <>
      <div
        className="z-[10] text-gray-400 w-8 h-8 p-1.5 flex justify-center items-center cursor-pointer duration-200 hover:bg-gray-700/50 rounded-md"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <HiDotsVertical className="w-full h-full" />
      </div>
      <div
        className={`w-[130px] h-10 top-[20px] right-[45px] rounded-md shadow-2xl overflow-hidden min-h-fit absolute bg-gray-800 duration-200 z-10 ${
          showMenu ? "opacity-100 visible" : "opacity-0 invisible "
        }`}
      >
        <button
          className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
          onClick={() => {
            setAdmin();
          }}
        >
          <span className="flex 1">
            {isAdmin ? "Set As User" : "Set As Admin"}
          </span>
        </button>
        <button
          className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
          onClick={() => {
            kickOut();
          }}
        >
          <span className="flex 1">kick Out</span>
        </button>
      </div>
    </>
  );
};

export default ChatMemberMenu;
