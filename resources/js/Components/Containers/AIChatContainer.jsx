import React, { useEffect, useState } from "react";
import AIChatForm from "../Shared/AIChatForm";
import { useUserContext } from "@/Contexts/UserContext";
import { useAIContext } from "@/Contexts/AIContext";
import AIMessageCard from "../Shared/AIMessageCard";
import AISpinner from "../Shared/AISpinner";
import AiChatMessagesContainer from "./AiChatMessagesContainer";

const AIChatContainer = () => {
  return (
    <div className="order-2 relative bg-gray-300 dark:bg-homeFeed z-[10] min-h-barHeight max-h-barHeight flex-1 overflow-hidden flex flex-col justify-between items-center">
      {/* <div className="relative flex-1 flex justify-between items-center flex-col w-full"> */}
      <AiChatMessagesContainer />
      <AIChatForm />
    </div>
  );
};

export default AIChatContainer;
{
}
