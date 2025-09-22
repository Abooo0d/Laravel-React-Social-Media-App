import React, { useEffect, useState } from "react";
import { SecondaryButton } from "./Buttons";
import { RiArrowGoBackFill } from "react-icons/ri";
import { GoDownload } from "react-icons/go";
import { FaAngleLeft, FaAngleRight, FaFile } from "react-icons/fa";
import CustomAudioPlayer from "./CustomAudioPlayer";
import {
  formatBytes,
  isPreviewAble,
  MessageIsAudio,
  MessageIsImage,
  MessageIsPDF,
  MessageIsVideo,
} from "@/Functions";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { useChatsContext } from "@/Contexts/ChatsContext";

const AttachmentFullView = () => {
  const {
    message,
    showAttachmentFullView,
    setShowAttachmentFullView,
    attachmentIndex,
    setAttachmentIndex,
  } = useChatsContext();

  const [attachmentId, setAttachmentId] = useState(0);
  const [attachments, setAttachments] = useState([]);
  useEffect(() => {
    attachments?.length > 0 &&
      setAttachmentId(attachments[attachmentIndex]?.id);
  }, [attachments]);

  useEffect(() => {
    setAttachments(message?.attachments);
  }, [message]);

  const next = (index) => {
    if (index < attachments?.length - 1) {
      setAttachmentIndex(index + 1);
      setAttachmentId(attachments[index + 1]?.id);
    } else {
      setAttachmentIndex(0);
      setAttachmentId(attachments[0]?.id);
    }
  };
  const back = (index) => {
    if (index > 0) {
      setAttachmentIndex(index - 1);
      setAttachmentId(attachments[index - 1]?.id);
    } else {
      setAttachmentIndex(attachments?.length - 1);
      setAttachmentId(attachments[attachments?.length - 1]?.id);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[900] w-screen overflow-y-auto flex min-h-full items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm duration-200 ${
        showAttachmentFullView
          ? `visible opacity-100`
          : `invisible opacity-0 scale-[95%]`
      }`}
    >
      <div
        className={`animate-scaleUp h-full w-full rounded-lg relative flex items-center bg-gray-900/60 border-solid border-[1px] border-gray-700 backdrop-blur-md p-4 ${
          attachments?.length > 1 ? " justify-between" : " justify-center"
        }`}
      >
        <div className="absolute top-[30px] right-[12px] h-20 flex justify-center items-center gap-2 flex-col">
          <SecondaryButton
            classes="py-1.5 px-3 right-0"
            event={() => setShowAttachmentFullView(false)}
          >
            <RiArrowGoBackFill className="w-5 h-5 text-gray-200" />
          </SecondaryButton>
          <>
            {!!attachmentId && (
              <a
                href={route("chat.download", attachmentId)}
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
        {attachments?.length > 0 && (
          <>
            {showAttachmentFullView && (
              <div className="relative h-full flex justify-center items-center flex-1 max-w-[80%]">
                <div
                  className={`relative rounded-md overflow-hidden flex justify-center items-center duration-200 border-transparent border-[1px] border-solid group
                      ${
                        MessageIsAudio(attachments[attachmentIndex])
                          ? "w-80 h-20 max-w-[70%]"
                          : MessageIsVideo(attachments[attachmentIndex])
                          ? "max-h-full max-w-full w-full h-full"
                          : MessageIsPDF(attachments[attachmentIndex])
                          ? "w-[400px] h-[600px] max-h-[80%] max-w-[70%]"
                          : MessageIsImage(attachments[attachmentIndex])
                          ? "max-h-full max-w-full w-full h-full"
                          : "w-80 h-80 max-h-[80%] max-w-[70%]"
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
                    <video
                      src={attachments[attachmentIndex].url}
                      className={`max-w-[90%] max-h-[90%] object-contain rounded-[10px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-200 `}
                      loading="lazy"
                      autoPlay={false}
                      controls
                    />
                  )}
                  {MessageIsAudio(attachments[attachmentIndex]) && (
                    <CustomAudioPlayer
                      attachment={attachments[attachmentIndex]}
                    />
                  )}
                  {MessageIsPDF(attachments[attachmentIndex]) && (
                    <iframe
                      src={attachments[attachmentIndex].url}
                      className="flex-1 h-full overflow-hidden"
                    ></iframe>
                  )}
                  {!isPreviewAble(attachments[attachmentIndex]) && (
                    <>
                      {/* <span className="absolute top-1 right-1 w-5 h-5  rounded-md flex justify-center items-center bg-gray-300/20 text-gray-300 group-hover:opacity-100 opacity-0 duration-200 z-10"></span> */}
                      <div className="w-full h-full flex flex-col justify-center items-center gap-2 p-2">
                        <span className="w-60 h-60 rounded-md text-[80px] flex justify-center items-center bg-gray-600 text-gray-300">
                          <FaFile />
                        </span>
                        <div className="flex flex-col w-fit items-center justify-center">
                          <h3 className="flex-1 text-lg text-gray-400 break-all">
                            {attachments[attachmentIndex]?.name}
                          </h3>
                          <div className="flex flex-row w-full justify-between items-start">
                            <span className="text-gray-600">
                              {formatBytes(attachments[attachmentIndex].size)}
                            </span>
                            <span className="text-gray-600">
                              {attachments[attachmentIndex].mime.split(".")[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
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
