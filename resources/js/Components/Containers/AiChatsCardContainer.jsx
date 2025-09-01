import React from "react";
import AIChatCard from "../Shared/AIChatCard";
import { useAIContext } from "@/Contexts/AIContext";

const AiChatsCardContainer = ({ setShow }) => {
  const { AIChats } = useAIContext();
  return (
    <div className="flex flex-col-reverse overflow-auto max-h-[450px]">
      {AIChats?.length > 0 ? (
        <>
          {AIChats.map((chat, index) => (
            <AIChatCard chat={chat} setShow={setShow} key={index} />
          ))}
        </>
      ) : (
        <div className="w-full text-gray-500 text-center p-4">
          No Chats In The History Yet
        </div>
      )}
    </div>
  );
};

export default AiChatsCardContainer;
