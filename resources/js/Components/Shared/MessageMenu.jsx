import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import MenuButton from "./MenuButton";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useChatsContext } from "@/Contexts/ChatsContext";

const MessageMenu = ({ message, setShowUpdateForm }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentChat, setCurrentChat } = useChatsContext();
  const updateMessage = () => {
    // axiosClient.post(route('chat.updateMessage',message.id),{body:})
  };
  const deleteMessage = () => {
    if (window.confirm("Are You Sure You Want To Delete The Message?")) {
      axiosClient
        .delete(route("chat.deleteMessage", message.id))
        .then(() => {
          // setCurrentChat((prev) => ({
          //   ...prev,
          //   messages: prev.messages.filter((me) => me.id != message.id),
          // }));
          setShowMenu(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <div
        className="absolute top-[10px] right-[50px] z-10 text-gray-400 w-6 h-6 flex justify-center items-center cursor-pointer duration-200 hover:bg-white/5 rounded-md"
        onClick={() => setShowMenu(!showMenu)}
      >
        <HiDotsVertical />
      </div>
      <div
        className={`w-40 h-10 top-[10px] rounded-md overflow-hidden min-h-fit absolute right-[80px] bg-[rgba(12,36,51,100%)] duration-200 z-10 max-w-[100px]  ${
          showMenu ? "opacity-100 visible" : "opacity-0 invisible "
        }`}
      >
        <button
          className="bg-gray-700 duration-300 flex gap-2 justify-start items-center hover:bg-gray-600 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
          onClick={() => {
            setShowUpdateForm(true);
            setShowMenu(false);
          }}
        >
          Update
        </button>
        <button
          className="bg-gray-700 duration-300 flex gap-2 justify-start items-center hover:bg-gray-600 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
          onClick={() => deleteMessage()}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default MessageMenu;
