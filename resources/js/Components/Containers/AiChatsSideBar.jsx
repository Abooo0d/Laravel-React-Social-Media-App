import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { PiChatsCircle } from "react-icons/pi";
import AiChatsCardContainer from "./AiChatsCardContainer";
import { useAIContext } from "@/Contexts/AIContext";

const AiChatsSideBar = () => {
  const [showChats, setShowChats] = useState(false);
  const { setCurrentAIChat } = useAIContext();
  return (
    <div className="relative z-[100]">
      <button
        className={`p-[4px] cursor-pointer z-[101] absolute top-[100px] duration-200 backdrop-blur-lg w-[40px] h-[50px] text-sm flex justify-center items-center flex-col bg-gray-800/80 border-[1px] border-gray-600/70 border-solid rounded-r-md border-l-0 text-gray-400
              ${showChats ? "left-[270px]" : "left-[0px]"}`}
        onClick={() => {
          setShowChats((prev) => !prev);
        }}
      >
        <BsStars className="w-[20px] h-[20px]" />
      </button>
      <div
        className={`absolute z-[100] top-0 max-h-barHeight h-full w-[270px] flex flex-col gap-2 py-2 bg-gray-900 px-2 duration-200 border-r-solid border-r-gray-500/50 border-r-[1px]
            ${showChats ? "left-0 " : "left-[-270px]"}`}
      >
        <div className="flex w-full justify-between items-center h-fit py-1 px-4 ">
          <h2 className="block text-xl font-bold dark:text-gray-300 cursor-default ">
            AI Chat:
          </h2>
        </div>
        <button
          className="bg-gray-900 flex justify-between items-center rounded-md text-gray-300 duration-200 hover:bg-gray-800 px-4 py-2"
          onClick={() => {
            setCurrentAIChat(null);
            setShowChats(false);
          }}
        >
          New Chat
          <FaPlus />
        </button>
        <div className="flex flex-col gap-2 flex-1 px-2 py-2">
          <h2 className="block text-xl font-bold dark:text-gray-300 cursor-default ">
            History:
          </h2>
          <AiChatsCardContainer setShow={setShowChats} />
        </div>
        <div className="flex-1 overflow-auto flex justify-start items-start"></div>
      </div>
    </div>
  );
};

export default AiChatsSideBar;
