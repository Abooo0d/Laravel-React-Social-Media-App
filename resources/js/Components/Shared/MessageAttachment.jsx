import {
  MessageIsAudio,
  MessageIsPDF,
  MessageIsImage,
  MessageIsVideo,
} from "@/Functions";
import React from "react";
import { HiMiniXMark } from "react-icons/hi2";
import CustomAudioPlayer from "./CustomAudioPlayer";

const MessageAttachment = ({
  attachment,
  allAttachments,
  setAllAttachments,
  index,
}) => {
  const RemoveAttachment = () => {
    setAllAttachments((prev) =>
      prev.filter((file) => file?.file?.name != attachment?.file?.name)
    );
  };

  return (
    <div
      className={`h-20 relative rounded-md flex justify-start items-enter cursor-pointer duration-200 border-transparent border-[1px] border-solid hover:border-gray-500 hover:scale-105 group
    ${MessageIsAudio(attachment) ? "w-60" : "w-20"}`}
    >
      <span
        className="absolute top-1 right-1 w-5 h-5 rounded-md flex justify-center items-center bg-gray-300/20 text-gray-300 group-hover:opacity-100 opacity-0 duration-200"
        onClick={() => {
          console.log("delete");
          RemoveAttachment();
        }}
      >
        <HiMiniXMark className="w-5 h-5 text-gray-200" />
      </span>
      <span className="absolute top-1 right-7 w-5 h-5 rounded-md flex justify-center items-center bg-gray-300/20 text-gray-300 group-hover:opacity-100 opacity-0 duration-200">
        {index}
      </span>
      {MessageIsImage(attachment) && (
        <img
          src={attachment?.url}
          alt="attachment"
          className="min-w-20 min-h-20 rounded-md object-cover"
        />
      )}
      {MessageIsVideo(attachment) && (
        <video
          src={attachment?.url}
          className="object-cover w-full h-20"
        ></video>
      )}
      {MessageIsAudio(attachment) && (
        // <audio src={attachment?.url} className="w-full" controls></audio>
        <CustomAudioPlayer attachment={attachment} />
      )}
      {/* {MessageIsVideo(attachment) ? "Video" : ""}
      {MessageIsAudio(attachment) ? "Audio" : ""}
      {MessageIsPDF(attachment) ? "isPDF" : ""} */}
    </div>
  );
};

export default MessageAttachment;
