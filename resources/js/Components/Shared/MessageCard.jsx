import { useUserContext } from "@/Contexts/UserContext";
import React from "react";

const MessageCard = ({ message }) => {
  const { user } = useUserContext();
  return (
    <div
      className={`w-full flex gap-1 flex-col items-start justify-center ${
        message.user_id != user.id ? "items-start" : " items-end"
      }`}
    >
      <div
        className={`bg-gray-600/50 backdrop-blur-sm w-fit px-4 py-2 rounded-md text-gray-400 cursor-default max-w-[60%] `}
      >
        {message.body}
      </div>
      <span className="text-xs text-gray-500">{message.updated_at}</span>
    </div>
  );
};

export default MessageCard;
