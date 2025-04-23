import React, { useRef } from "react";
import ChatForm from "../ChatForm";
import ChatInfo from "../Shared/ChatInfo";
import MessageCard from "../Shared/MessageCard";
import { useChatsContext } from "@/Contexts/ChatsContext";

const MessagesContainer = ({}) => {
  const { currentChat } = useChatsContext();
  const containerRef = useRef();

  return (
    <div className="order-2 relative bg-gray-300 dark:bg-homeFeed bg-chat-pattern bg-cover min-h-full max-h-barHeight flex-1 overflow-scroll flex flex-col justify-end items-center gap-2">
      <div className="absolute inset-0 w-full h-full bg-[rgba(17,24,39,58%)]" />
      {!!currentChat && <ChatInfo />}
      {!!currentChat && (
        <div
          className="w-full max-h-[calc(100dvh-225px)] relative z-[50] p-4 overflow-auto flex flex-col-reverse flex-1 "
          ref={containerRef}
        >
          {currentChat?.messages?.map((message, index) => (
            <MessageCard message={message} key={index} />
          ))}
        </div>
      )}

      {!!currentChat && <ChatForm />}
      {!currentChat && (
        <div className="w-full h-full flex justify-center items-center z-[50]">
          <div className="bg-gray-900 text-gray-500 rounded-md px-8 py-4 cursor-default border-solid border-gray-600/50 border-[1px]">
            Select A Chat To Start
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesContainer;
