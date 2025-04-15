import React, { useEffect, useRef, useState } from "react";
import ChatForm from "../ChatForm";
import { useUserContext } from "@/Contexts/UserContext";
import ChatInfo from "../Shared/ChatInfo";
import MessageCard from "../Shared/MessageCard";

const MessagesContainer = ({ chat }) => {
  const [chatData, setChatData] = useState(chat);
  useEffect(() => {
    setChatData(chat);
  }, [chat]);
  const containerRef = useRef();

  return (
    <div className="order-2 relative bg-gray-300 dark:bg-homeFeed bg-chat-pattern lg:min-h-full min-h-[500px] max-h-barHeight flex-1 overflow-scroll flex flex-col justify-end items-center gap-2">
      <div className="absolute inset-0 w-full h-full bg-[rgba(17,24,39,58%)]" />
      {!!chatData && <ChatInfo chat={chat} />}
      {!!chatData && (
        <div
          className="w-full h-full relative z-[50] p-4 overflow-auto flex flex-col "
          ref={containerRef}
        >
          {chatData?.messages?.map((message, index) => (
            <MessageCard message={message} key={index} />
          ))}
        </div>
      )}
      {!!chatData && (
        <ChatForm
          chat={chatData}
          chatData={chatData}
          setChatData={setChatData}
        />
      )}
      {!chatData && (
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
