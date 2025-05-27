import { useChatsContext } from "@/Contexts/ChatsContext";
import React from "react";
import { useState } from "react";
import { HiDotsVertical, HiUserAdd } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
const ChatInfoFormMenu = ({ setShowChangeGroupNameForm }) => {
  const { currentChat } = useChatsContext();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className="absolute top-[20px] right-[70px] z-[10] text-gray-400 w-8 h-8 p-1.5 flex justify-center items-center cursor-pointer duration-200 hover:bg-gray-800/50 rounded-md"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <HiDotsVertical className="w-full h-full" />
      </div>
      <div
        className={`w-[200px] h-10 top-[60px] right-[70px] rounded-md shadow-2xl overflow-hidden min-h-fit absolute bg-gray-800 duration-200 z-10 ${
          showMenu ? "opacity-100 visible" : "opacity-0 invisible "
        }`}
      >
        <button
          className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
          onClick={() => {
            setShowChangeGroupNameForm(true);
            setShowMenu(false);
          }}
        >
          <span className="flex 1"> Change Group Name</span>
          <FaEdit className="w-4 h-4" />
        </button>
        <button className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left">
          <span className="flex 1"> Add Users</span>
          <HiUserAdd className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default ChatInfoFormMenu;
