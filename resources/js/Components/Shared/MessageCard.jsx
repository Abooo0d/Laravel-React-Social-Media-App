import { useUserContext } from "@/Contexts/UserContext";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownRenderer from "./MarkdownRenderer";
import MessageAttachmentContainer from "./MessageAttachmentContainer";
import AttachmentFullView from "./AttachmentFullView";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
const MessageCard = ({ message }) => {
  console.log(message);

  const { user } = useUserContext();
  const [showAttachmentView, setShowAttachmentView] = useState(false);
  const [attachmentIndex, setAttachmentIndex] = useState(0);
  return (
    <div
      className={`w-full flex gap-1 flex-col justify-end ${
        message.user.id != user.id ? "items-start" : " items-end"
      }`}
    >
      <div
        className={`flex items-center justify-end gap-4 w-full
        ${
          message.user.id != user.id
            ? "justify-start flex-row-reverse"
            : " justify-end flex-row"
        }`}
      >
        <div
          className={`backdrop-blur-sm relative w-fit px-4 py-2 rounded-md text-gray-400 word-wrap cursor-default max-w-[80%] overflow-auto flex justify-center items-start flex-col break-all  ${
            message.user.id != user.id
              ? "bg-[rgba(46,59,78,100%)]"
              : "bg-[rgba(12,36,51,100%)]"
          }`}
        >
          {message?.attachments.length > 0 && (
            <MessageAttachmentContainer
              attachments={message.attachments}
              setIndex={setAttachmentIndex}
              setShow={setShowAttachmentView}
            />
          )}
          <MarkdownRenderer content={message.body}>
            {message.body}
            {message?.status}
          </MarkdownRenderer>
          <div className={`flex justify-start items-center gap-2 ml-auto  `}>
            <span className="text-gray-400 text-[8px]">
              {message.created_at}
            </span>
            <IoCheckmarkDoneSharp
              className={`${message.user.id != user.id && "hidden"} ${
                !!message?.status ? "text-blue-500" : "text-gray-600"
              }`}
            />
          </div>
          <div
            className={`absolute bottom-0 ${
              message.user.id != user.id
                ? "left-[-10px] w-[20px] h-[20px] border-[10px] border-solid border-transparent border-b-[rgba(46,59,78,100%)] z-10"
                : "right-[-10px] w-[20px] h-[20px] border-[10px] border-solid border-transparent border-b-[rgba(12,36,51,100%)] z-10"
            }`}
          />
        </div>
        <img
          src={message.user.avatar_url}
          className="w-[30px] h-[30px] rounded-full mt-auto"
        />
      </div>
      <span className="text-xs text-gray-500 opacity-50">Delivered</span>
      <AttachmentFullView
        attachments={message?.attachments}
        show={showAttachmentView}
        setShow={setShowAttachmentView}
        index={attachmentIndex}
        setIndex={setAttachmentIndex}
      />
    </div>
  );
};

export default MessageCard;
