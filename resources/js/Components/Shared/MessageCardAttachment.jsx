import {
  MessageIsAudio,
  MessageIsPDF,
  MessageIsImage,
  MessageIsVideo,
  isPreviewAble,
} from "@/Functions";
import React, { useEffect } from "react";
import CustomAudioPlayer from "./CustomAudioPlayer";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { FaFile } from "react-icons/fa";
const MessageCardAttachment = ({
  attachment,
  setIndex,
  attachmentIndex,
  setShow,
}) => {
  return (
    <div
      className={`relative max-w-[250px] rounded-md overflow-hidden flex justify-end items-enter cursor-pointer duration-200 border-transparent group`}
      onClick={() => {
        setIndex(attachmentIndex);
        setShow(true);
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
        <iframe
          src={attachment.url}
          className="min-w-20 min-h-40 overflow-hidden"
        />
      )}
      {!isPreviewAble(attachment) && (
        <div className="w-full h-full  flex justify-between items-center gap-2 p-2">
          <span className="min-w-10 h-10 rounded-md flex justify-center items-center bg-gray-600 text-gray-300">
            <FaFile />
          </span>
          <h3 className="flex-1 text-[15px] text-gray-400 break-all">
            {attachment?.name}
          </h3>
        </div>
      )}
    </div>
  );
};

export default MessageCardAttachment;
