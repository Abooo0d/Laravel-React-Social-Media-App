import { useUserContext } from "@/Contexts/UserContext";
import React from "react";

const MessageCard = ({ message }) => {
  const { user } = useUserContext();

  return (
    <div
      className={`w-full flex gap-1 flex-col justify-end ${
        message.user.id != user.id ? "items-start" : " items-end"
      }`}
    >
      <span className="text-gray-400 text-[11px]">{message.created_at}</span>
      <div
        className={`flex items-center justify-end gap-4 w-full
        ${
          message.user.id != user.id
            ? "justify-start flex-row-reverse"
            : " justify-end flex-row"
        }`}
      >
        <div
          className={`backdrop-blur-sm w-fit px-4 py-2 rounded-md text-gray-400 word-wrap cursor-default max-w-[60%] flex justify-center items-center break-all  ${
            message.user.id != user.id
              ? "bg-[rgba(46,59,78,100%)]"
              : "bg-[rgba(9,73,112,100%)]"
          }`}
        >
          {message.body}
          <div
            className={`absolute bottom-0 ${
              message.user.id != user.id
                ? "left-[-10px] w-[20px] h-[20px] border-[10px] border-solid border-transparent border-b-[rgba(46,59,78,100%)] z-10"
                : "right-[-10px] w-[20px] h-[20px] border-[10px] border-solid border-transparent border-b-[rgba(9,73,112,100%)] z-10"
            }`}
          />
        </div>
        <img
          src={message.user.avatar_url}
          className="w-[30px] h-[30px] rounded-full mt-auto"
        />
      </div>
      <span className="text-xs text-gray-500 opacity-50">Delivered</span>
    </div>
  );
};

export default MessageCard;
