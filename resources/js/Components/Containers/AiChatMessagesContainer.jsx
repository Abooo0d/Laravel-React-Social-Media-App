import { useAIContext } from "@/Contexts/AIContext";
import React from "react";
import AIMessageCard from "../Shared/AIMessageCard";
import { useUserContext } from "@/Contexts/UserContext";
import AISpinner from "../Shared/AISpinner";

const AiChatMessagesContainer = () => {
  const { currentAIChat, isLoading } = useAIContext();
  const { user } = useUserContext();
  return (
    <div className="flex justify-start items-center flex-col-reverse max-w-[90%] max-h-[calc(100vh-200px)] h-full w-full overflow-auto px-4 py-2 pb-[40px]">
      {currentAIChat?.messages?.length > 0 ? (
        <>
          {isLoading && <AISpinner />}
          {currentAIChat.messages.map((message, index) => (
            <AIMessageCard
              message={message}
              key={index}
              show={!(index >= currentAIChat.messages.length - 1)}
              isLast={index === currentAIChat.messages.length - 1}
            />
          ))}
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h2 className="text-3xl font-[500] bg-gradient-to-r from-gray-300 via-emerald-500 to-sky-500 bg-clip-text text-transparent">
            Hello,{user?.name}
          </h2>
        </div>
      )}
    </div>
  );
};

export default AiChatMessagesContainer;
