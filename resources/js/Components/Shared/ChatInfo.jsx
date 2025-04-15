import React from "react";

const ChatInfo = ({ chat }) => {
  return (
    <div className="w-full bg-gray-900 z-[50] py-2 px-8 flex justify-start items-center gap-4 border-b-solid border-b-[1px] border-gray-600/50">
      <img
        src={chat.avatar_url}
        alt="chat_image"
        className="w-[50px] h-[50px] rounded-full object-cover border-solid border-[1px] border-gray-600"
      />
      <h2 className="text-gray-400 text-xl cursor-default">{chat.name}</h2>
    </div>
  );
};

export default ChatInfo;
