import { useAIContext } from "@/Contexts/AIContext";
import React from "react";

const AIChatCard = ({ chat, setShow }) => {
  const { setCurrentAIChat } = useAIContext();
  return (
    <div
      className="min-h-[50px] w-[230px] relative flex items-center justify-start gap-2 py-2 px-4 text-gray-400 duration-200 rounded-md hover:bg-gray-800/60 cursor-pointer"
      onClick={() => {
        setShow(false);
        setCurrentAIChat(chat);
      }}
    >
      <h3 className="text-[15px] w-full text-nowrap overflow-hidden">
        {chat?.name?.length > 16 ? chat.name.substr(0, 16) + "..." : chat?.name}
        <div className="absolute h-full right-[4px] top-0 flex flex-col items-end justify-center">
          <span className="text-[12px] text-gray-500">
            {chat?.created_at.split(" ")[0]}
          </span>
          <span className="text-[12px] text-gray-500">
            {chat?.created_at.split(" ")[1]}
          </span>
        </div>
      </h3>
    </div>
  );
};

export default AIChatCard;
