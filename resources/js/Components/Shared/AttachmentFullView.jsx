import React, { useEffect, useState } from "react";
import PopupCard from "./PopupCard";
import { SecondaryButton } from "./Buttons";
import { RiArrowGoBackFill } from "react-icons/ri";
import { GoDownload } from "react-icons/go";
import { FaAngleLeft, FaAngleRight, FaFile } from "react-icons/fa";
import CustomAudioPlayer from "./CustomAudioPlayer";
import {
  isPreviewAble,
  MessageIsAudio,
  MessageIsImage,
  MessageIsPDF,
  MessageIsVideo,
} from "@/Functions";
import CustomVideoPlayer from "./CustomVideoPlayer";

const AttachmentFullView = ({ attachments, index, show, setShow }) => {
  const [attachmentIndex, setAttachmentIndex] = useState(index);
  const [attachmentId, setAttachmentId] = useState(0);
  useEffect(() => {
    setAttachmentId(attachments[index]);
  }, [show]);
  const next = (index) => {
    if (index < attachments?.length - 1) {
      setAttachmentIndex(index + 1);
      setAttachmentId(attachments[index + 1]);
    } else {
      setAttachmentIndex(0);
      setAttachmentId(attachments[0]);
    }
  };
  const back = (index) => {
    if (index > 0) {
      setAttachmentIndex(index - 1);
      setAttachmentId(attachments[index - 1]);
    } else {
      setAttachmentIndex(attachments?.length - 1);
      setAttachmentId(attachments[attachments?.length - 1]);
    }
  };
  return (
    <div
      className={`fixed inset-0 z-[900] w-screen overflow-y-auto flex min-h-full items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm duration-200 ${
        show ? `visible opacity-100` : `invisible opacity-0 scale-[95%]`
      }`}
    >
      <div
        className={`animate-scaleUp h-full w-full rounded-lg relative flex items-center bg-gray-900/60 border-solid border-[1px] border-gray-700 backdrop-blur-md p-4 ${
          attachments.length > 1 ? " justify-between" : " justify-center"
        }`}
      >
        <div className="absolute top-[30px] right-[12px] h-20 flex justify-center items-center gap-2 flex-col">
          <SecondaryButton
            classes="py-1.5 px-3 right-0"
            event={() => setShow(false)}
          >
            <RiArrowGoBackFill className="w-5 h-5 text-gray-200" />
          </SecondaryButton>
          <>
            {attachmentId !== 0 && (
              <a
                href={route("chat.download", attachmentId ?? 0)}
                className="no-underline"
              >
                <SecondaryButton
                  classes="relative py-1.5 px-3"
                  event={() => {}}
                >
                  <GoDownload className="w-5 h-5 text-gray-200" />
                </SecondaryButton>
              </a>
            )}
          </>
          <SecondaryButton
            classes=" py-1.5 px-3 right-0 w-[46px] cursor-default"
            event={() => {}}
          >
            {attachmentIndex ? attachmentIndex + 1 : 1}
          </SecondaryButton>
        </div>
        {attachments?.length > 1 && (
          <SecondaryButton
            event={() => back(attachmentIndex)}
            classes="h-[100px] w-[35px] "
          >
            <FaAngleLeft className="w-6 h-6 flex justify-center items-center" />
          </SecondaryButton>
        )}
        {show && (
          <div className="relative h-full flex justify-center items-center flex-1 max-w-[80%]">
            <div
              className={`relative rounded-md overflow-hidden flex justify-start items-enter cursor-pointer duration-200 border-transparent border-[1px] border-solid hover:border-gray-500 hover:scale-105 group
                      ${
                        MessageIsAudio(attachments[attachmentIndex])
                          ? "w-80 h-20 max-w-[70%]"
                          : MessageIsVideo(attachments[attachmentIndex])
                          ? "w-80 h-80 max-w-[70%]"
                          : MessageIsPDF(attachments[attachmentIndex])
                          ? "w-40 h-60 max-h-[80%] max-w-[70%]"
                          : MessageIsImage(attachments[attachmentIndex])
                          ? "w-96 h-96 max-h-[80%] max-w-[70%]"
                          : "w-20 h-20 max-h-[80%] max-w-[70%]"
                      }`}
            >
              {MessageIsImage(attachments[attachmentIndex]) && (
                <>
                  <img
                    src={attachments[attachmentIndex]?.url}
                    alt="attachment"
                    className="min-w-20 min-h-20 rounded-md object-cover"
                  />
                </>
              )}
              {MessageIsVideo(attachments[attachmentIndex]) && (
                <CustomVideoPlayer
                  attachment={attachments[attachmentIndex]}
                  // controls={controls}
                />
              )}
              {MessageIsAudio(attachments[attachmentIndex]) && (
                <CustomAudioPlayer
                  attachment={attachments[attachmentIndex]}
                  // controls={controls}
                />
              )}
              {MessageIsPDF(attachments[attachmentIndex]) && (
                <iframe
                  src={attachments[attachmentIndex].url}
                  className="min-w-20 min-h-40 overflow-hidden"
                ></iframe>
              )}
              {!isPreviewAble(attachments[attachmentIndex]) && (
                <>
                  <span className="absolute top-1 right-1 w-5 h-5  rounded-md flex justify-center items-center bg-gray-300/20 text-gray-300 group-hover:opacity-100 opacity-0 duration-200 z-10"></span>
                  <div className="w-full h-full  flex justify-between items-center gap-2 p-2">
                    <span className="min-w-10 h-10 rounded-md flex justify-center items-center bg-gray-600 text-gray-300">
                      <FaFile />
                    </span>
                    <h3 className="flex-1 text-[15px] text-gray-400 break-all">
                      {attachments[attachmentIndex]?.name}
                    </h3>
                  </div>
                </>
              )}
            </div>
            {/* ))} */}
          </div>
        )}
        {attachments?.length > 1 && (
          <SecondaryButton
            event={() => {
              next(attachmentIndex);
            }}
            classes="h-[100px] w-[35px]"
          >
            <FaAngleRight className="w-6 h-6" />
          </SecondaryButton>
        )}
      </div>
    </div>
  );
};

export default AttachmentFullView;
