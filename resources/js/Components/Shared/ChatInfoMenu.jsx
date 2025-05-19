import { useChatsContext } from "@/Contexts/ChatsContext";
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { HiUserAdd } from "react-icons/hi";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
import { MdDeleteOutline, MdLogout } from "react-icons/md";
import { TbLock } from "react-icons/tb";
const ChatInfoMenu = ({ swtShowChatInfo }) => {
  const { currentChat } = useChatsContext();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className=" text-gray-400 w-8 h-8 p-1.5 flex justify-center items-center cursor-pointer duration-200 hover:bg-gray-800/50 rounded-md"
        onClick={() => setShowMenu(!showMenu)}
      >
        <HiDotsVertical className="w-full h-full" />
      </div>
      <div
        className={`w-36 h-10 top-[40px] right-[65px] rounded-md overflow-hidden min-h-fit absolute bg-gray-800 duration-200 z-10 max-w-[250px]  ${
          showMenu ? "opacity-100 visible" : "opacity-0 invisible "
        }`}
      >
        {currentChat.is_group ? (
          <>
            <button className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left">
              <span className="flex 1"> Add Users</span>
              <HiUserAdd className="w-4 h-4" />
            </button>
            <button
              className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
              onClick={() => {
                swtShowChatInfo(true);
                setShowMenu(false);
              }}
            >
              <span className="flex-1">Info</span>
              <IoInformationCircleSharp className="w-4 h-4" />
            </button>
            <button className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left">
              <span className="flex-1">Mute</span>
              <IoVolumeMute className="w-4 h-4" />
            </button>
            <button className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left">
              <span className="flex-1">Delete</span>
              <MdDeleteOutline className="w-4 h-4" />
            </button>
            <button className="duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left">
              <span className="flex-1">Leave</span>
              <MdLogout className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
              onClick={() => {
                swtShowChatInfo(true);
                setShowMenu(false);
              }}
            >
              <span className="flex-1">Info</span>
              <IoInformationCircleSharp className="w-4 h-4" />
            </button>
            <button className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left">
              <span className="flex-1">Mute</span>
              <IoVolumeMute className="w-4 h-4" />
            </button>
            <button className=" duration-300 flex gap-2 justify-between items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left">
              <span className="flex-1">Block</span>
              <TbLock className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ChatInfoMenu;
