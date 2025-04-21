import React, { useEffect, useRef, useState } from "react";
import ChatForm from "../ChatForm";
import { useUserContext } from "@/Contexts/UserContext";
import ChatInfo from "../Shared/ChatInfo";
import MessageCard from "../Shared/MessageCard";

const MessagesContainer = ({ chat }) => {
  const [chatData, setChatData] = useState(chat);
  const { user } = useUserContext();
  useEffect(() => {
    setChatData(chat);
  }, [chat]);
  const containerRef = useRef();
  useEffect(() => {
    window.Echo.channel("chat").listen("NewMessageSent", (e) => {
      console.log("Abood From The Function");
      if (e.message.user_id == user.id) {
        console.log("Abood From The If");
      } else {
        console.log("Abood From The else");
        setChatData((prev) => ({
          ...prev,
          messages: [e.message, ...prev.messages],
        }));
      }
    });
  }, []);

  return (
    <div className="order-2 relative bg-gray-300 dark:bg-homeFeed bg-chat-pattern min-h-full max-h-barHeight flex-1 overflow-scroll flex flex-col justify-end items-center gap-2">
      <div className="absolute inset-0 w-full h-full bg-[rgba(17,24,39,58%)]" />
      {!!chatData && <ChatInfo chat={chat} />}
      {!!chatData && (
        <div
          className="w-full max-h-[calc(100dvh-225px)] relative z-[50] p-4 overflow-auto flex flex-col-reverse flex-1 "
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
