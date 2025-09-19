import React, { useEffect } from "react";
import { SecondaryButton } from "./Buttons";
import { HiMiniXMark } from "react-icons/hi2";
import { FaFile } from "react-icons/fa";
import { CiUndo } from "react-icons/ci";
import { isVideo } from "@/Functions";
import { FaPlay } from "react-icons/fa";
const PostAttachmentCard = ({
  index,
  attachment,
  attachmentsErrors,
  onDelete,
  setImage,
  setShowImage,
  setImageIndex,
  showActions = true,
  showDownload = false,
  update = false,
  undoDelete = () => {},
}) => {
  const isImage = (attachment) => {
    let mime = attachment.type || attachment.mime;
    mime = mime ? mime.split("/") : "";
    return mime[0] === "image";
  };

  return (
    <>
      {showActions && (
        <>
          <SecondaryButton
            classes="absolute top-[10px] right-[10px] py-1.5 px-3 h-[40px] hover:bg-red-500 z-10"
            event={() => {
              onDelete(attachment, index, update);
            }}
          >
            <HiMiniXMark className="w-5 h-5 dark:text-gray-300 text-gray-600" />
          </SecondaryButton>
          <SecondaryButton
            event={() => {}}
            classes={
              "absolute right-[60px] top-[10px] px-3 py-1.5 h-[40px] cursor-default z-10"
            }
          >
            <span className="dark:text-gray-300 text-gray-600">
              {index + 1}
            </span>
          </SecondaryButton>
          {attachment.file && (
            <SecondaryButton
              event={() => {}}
              classes="px-3 py-1.5 absolute top-[10px] right-[100px] h-[40px] z-10"
            >
              <span className="dark:text-gray-300 text-gray-600">new</span>
            </SecondaryButton>
          )}
          {attachment.isDeleted && (
            <SecondaryButton
              event={() => {
                undoDelete(attachment, update);
              }}
              classes="absolute top-[60px] right-[10px] px-3 py-1.5 gap-2"
            >
              Deleted <CiUndo className="w-4 h-4" />
            </SecondaryButton>
          )}
        </>
      )}
      {attachmentsErrors?.map((error, index) => {
        index == parseInt(error.index) && (
          <div className="bg-red-500 text-white w-[200px] h-[50px]" key={index}>
            {error.message}
          </div>
        );
      })}
      {isImage(attachment.file ? attachment.file : attachment) ? (
        <div className="w-full h-full max-h-[500px] flex justify-center items-center relative z-0">
          <img
            key={index}
            src={attachment.url}
            className=" h-full object-cover rounded-lg cursor-pointer"
            onClick={() => {
              setImage(attachment.url);
              setShowImage(true);
              setImageIndex(index);
            }}
          />
        </div>
      ) : isVideo(attachment.file ? attachment.file : attachment) ? (
        <div
          className="w-full h-full max-h-[400px] flex justify-center items-center relative z-0"
          onClick={() => {
            setImage(attachment.url);
            setShowImage(true);
            setImageIndex(index);
          }}
        >
          <video
            key={index}
            src={attachment.url}
            className=" h-full max-h-[400px] w-full object-cover rounded-lg cursor-pointer"
            loading="lazy"
            autoPlay={false}
            // controls
          />
          <span className="absolute top-[50%] left-[50%] bg-gray-500/50 w-[100px] h-[100px] backdrop-blur-sm rounded-full flex justify-center items-center translate-x-[-50%] translate-y-[-50%] cursor-pointer text-gray-400">
            <FaPlay className="text-[30px] ml-2" />
          </span>
        </div>
      ) : (
        <div
          className="w-full min-h-[200px] h-full max-h-[500px] object-cover rounded-lg cursor-pointer bg-gray-800 flex justify-center items-center flex-col gap-4"
          onClick={() => {
            setShowImage(true);
            setImageIndex(index);
          }}
        >
          <FaFile className="w-20 h-20 text-gray-500" />
          <h3 className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
            {attachment?.file ? attachment?.file?.name : attachment?.name}
          </h3>
        </div>
      )}
      {attachmentsErrors?.map((error, inx) => (
        <div key={inx}>
          {index == parseInt(error.index) ? (
            <div className="bg-red-600/80 backdrop-blur-md rounded-md flex justify-center items-center absolute bottom-[10px] left-[10px] text-white w-[150px] h-[40px] cursor-default">
              {error.message}
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
};

export default PostAttachmentCard;
