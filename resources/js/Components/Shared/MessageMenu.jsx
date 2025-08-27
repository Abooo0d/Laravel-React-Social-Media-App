import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import MenuButton from "./MenuButton";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useChatsContext } from "@/Contexts/ChatsContext";

const MessageMenu = ({ message, setShowUpdateForm }) => {
  const [showMenu, setShowMenu] = useState(false);
  const deleteMessage = () => {
    if (window.confirm("Are You Sure You Want To Delete The Message?")) {
      axiosClient
        .delete(route("chat.deleteMessage", message.id))
        .then(() => {
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
        className="absolute top-[10px] right-[50px] z-10 dark:text-gray-400 text-gray-600 w-6 h-6 flex justify-center items-center cursor-pointer duration-200 dark:hover:bg-white/5 hover:bg-gray-400/50 rounded-md"
        onClick={() => setShowMenu(!showMenu)}
      >
        <HiDotsVertical />
      </div>
      <div
        className={`w-40 h-10 top-[10px] rounded-md overflow-hidden min-h-fit absolute right-[80px] dark:bg-[rgba(12,36,51,100%)] bg-gray-300 duration-200 z-10 max-w-[100px] border-gray-300 border-[1px] border-solid  ${
          showMenu ? "opacity-100 visible" : "opacity-0 invisible "
        }`}
      >
        <button
          className="dark:bg-gray-700 bg-gray-200 duration-300 flex gap-2 justify-start items-center dark:hover:bg-gray-600 hover:bg-gray-300 w-full py-2 px-4 text-sm font-medium dark:text-white text-gray-600 focus:outline-none text-left"
          onClick={() => {
            setShowUpdateForm(true);
            setShowMenu(false);
          }}
        >
          Update
        </button>
        <button
          className="dark:bg-gray-700 bg-gray-200 duration-300 flex gap-2 justify-start items-center dark:hover:bg-gray-600 hover:bg-gray-300 w-full py-2 px-4 text-sm font-medium dark:text-white text-gray-600 focus:outline-none text-left"
          onClick={() => deleteMessage()}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default MessageMenu;
