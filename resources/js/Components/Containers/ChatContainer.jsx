import React, { useState } from "react";
import ChatForm from "../ChatForm";

const ChatContainer = ({ chat }) => {
  const [chatData, setChatData] = useState(chat);
  return (
    <div className="order-2 bg-gray-300 dark:bg-homeFeed lg:min-h-full min-h-[500px] max-h-barHeight flex-1 overflow-scroll flex flex-col justify-end items-center gap-2">
      {/* {chatData ? (
        <>
          {chatData.map((message, index) => (
            <div key={index}>Abood</div>
          ))}
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center text-gray-600">
          Select A Chat To Start
        </div>
      )} */}
      <ChatForm />
    </div>
  );
};

export default ChatContainer;
