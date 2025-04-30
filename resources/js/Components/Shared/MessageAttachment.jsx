import {
  MessageIsAudio,
  MessageIsPDF,
  MessageIsImage,
  MessageIsVideo,
  isPreviewAble,
} from "@/Functions";
import React, { useEffect } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import CustomAudioPlayer from "./CustomAudioPlayer";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { FaFile } from "react-icons/fa";

const MessageAttachment = ({
  attachment,
  index,
  controls = true,
  setAllAttachments = () => {},
}) => {
  const RemoveAttachment = () => {
    setAllAttachments((prev) =>
      prev.filter((file) => file?.file?.name != attachment?.file?.name)
    );
  };

  return (
    <div
      className={`relative rounded-md overflow-hidden flex justify-start items-enter cursor-pointer duration-200 border-transparent border-[1px] border-solid hover:border-gray-500 hover:scale-105 group
    ${
      MessageIsAudio(attachment)
        ? "w-60 h-20"
        : MessageIsVideo(attachment)
        ? "w-60 h-60"
        : MessageIsPDF(attachment)
        ? "w-20 h-24"
        : MessageIsImage(attachment)
        ? "w-20 h-20"
        : "w-240h-20"
    }`}
    >
      <span className="absolute top-1 right-7 w-5 h-5 rounded-md flex justify-center items-center bg-gray-300/20 text-gray-300 group-hover:opacity-100 opacity-0 duration-200">
        {index}
      </span>
      {MessageIsImage(attachment) && (
        <>
          <span
            className="absolute top-1 right-1 w-5 h-5  rounded-md flex justify-center items-center bg-gray-300/20 text-gray-300 group-hover:opacity-100 opacity-0 duration-200 z-10"
            onClick={() => {
              RemoveAttachment();
            }}
          >
            <HiMiniXMark className="w-5 h-5 text-gray-200" />
          </span>
          <img
            src={attachment?.url}
            alt="attachment"
            className="min-w-20 min-h-20 rounded-md object-cover"
          />
        </>
      )}
      {MessageIsVideo(attachment) && (
        <CustomVideoPlayer
          attachment={attachment}
          remove={RemoveAttachment}
          controls={controls}
        />
      )}
      {MessageIsAudio(attachment) && (
        <CustomAudioPlayer
          attachment={attachment}
          remove={RemoveAttachment}
          controls={controls}
        />
      )}
      {MessageIsPDF(attachment) && (
        <iframe
          src={attachment.url}
          className="min-w-20 min-h-40 overflow-hidden"
        ></iframe>
      )}
      {!isPreviewAble(attachment) && (
        <>
          <span
            className="absolute top-1 right-1 w-5 h-5  rounded-md flex justify-center items-center bg-gray-300/20 text-gray-300 group-hover:opacity-100 opacity-0 duration-200 z-10"
            onClick={() => {
              RemoveAttachment();
            }}
          >
            <HiMiniXMark className="w-5 h-5 text-gray-200" />
          </span>
          <div className="w-full h-full  flex justify-between items-center gap-2 p-2">
            <span className="min-w-10 h-10 rounded-md flex justify-center items-center bg-gray-600 text-gray-300">
              <FaFile />
            </span>
            <h3 className="flex-1 text-[15px] text-gray-400 break-all">
              {attachment?.file?.name}
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageAttachment;
