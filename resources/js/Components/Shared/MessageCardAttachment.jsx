import {
  MessageIsAudio,
  MessageIsPDF,
  MessageIsImage,
  MessageIsVideo,
  isPreviewAble,
  formatBytes,
} from "@/Functions";
import React, { useEffect } from "react";
import CustomAudioPlayer from "./CustomAudioPlayer";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { FaFile } from "react-icons/fa";
import { useChatsContext } from "@/Contexts/ChatsContext";
import { useUserContext } from "@/Contexts/UserContext";
const MessageCardAttachment = ({ attachment, index, message }) => {
  const { setAttachmentIndex, setShowAttachmentFullView, setMessage } =
    useChatsContext();
  const { user } = useUserContext();
  return (
    <div
      className={`relative max-w-[250px] rounded-md overflow-hidden flex justify-end items-enter cursor-pointer duration-200 border-transparent group`}
      onClick={() => {
        if (MessageIsAudio(attachment)) return;
        setMessage(message);
        setAttachmentIndex(index);
        setShowAttachmentFullView(true);
      }}
    >
      {MessageIsImage(attachment) && (
        <img
          src={attachment?.url}
          alt="attachment"
          className="min-w-full rounded-md object-cover aspect-square"
        />
      )}
      {MessageIsVideo(attachment) && (
        <CustomVideoPlayer
          attachment={attachment}
          remove={RemoveAttachment}
          controls={false}
        />
      )}
      {MessageIsAudio(attachment) && (
        <CustomAudioPlayer attachment={attachment} controls={false} />
      )}
      {MessageIsPDF(attachment) && (
        <div className="w-full h-full  flex justify-between items-center gap-2 p-2">
          <span
            className={`min-w-10 h-10 rounded-md flex justify-center items-center border-solid border-[1px] text-gray-300 ${
              message.user.id == user.id
                ? "bg-blue-500/50 border-gray-300/50"
                : "bg-gray-600 border-gray-600/50"
            }`}
          >
            <FaFile />
          </span>
          <div className="flex flex-col w-full">
            <h3 className="flex-1 text-[15px] text-gray-300 break-all">
              {attachment?.name}
            </h3>
            <div className="flex w-full justify-between items-center">
              <span className="text-gray-400 text-[12px]">
                {formatBytes(attachment.size)}
              </span>
              <span className="text-gray-400 text-[12px]">
                {attachment.mime.split(".")[0]}
              </span>
            </div>
          </div>
        </div>
      )}
      {!isPreviewAble(attachment) && (
        <div className="w-full h-full  flex justify-between items-center gap-2 p-2">
          <span
            className={`min-w-10 h-10 rounded-md flex justify-center items-center border-solid border-[1px] text-gray-300 ${
              message.user.id == user.id
                ? "bg-blue-500/50 border-gray-300/50"
                : "bg-gray-600 border-gray-600/50"
            }`}
          >
            <FaFile />
          </span>
          <div className="flex flex-col w-full">
            <h3 className="flex-1 text-[15px] text-gray-300 break-all">
              {attachment.name.length > 22
                ? attachment?.name.slice(0, 22) + "..."
                : attachment?.name}
            </h3>
            <div className="flex w-full justify-between items-center">
              <span className="text-gray-400 text-[12px]">
                {formatBytes(attachment.size)}
              </span>
              <span className="text-gray-400 text-[12px]">
                {attachment.mime.split(".")[0]}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCardAttachment;
