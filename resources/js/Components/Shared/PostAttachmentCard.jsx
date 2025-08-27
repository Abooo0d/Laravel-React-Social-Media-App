import React, { useEffect } from "react";
import { SecondaryButton } from "./Buttons";
import { HiMiniXMark } from "react-icons/hi2";
import { FaFile } from "react-icons/fa";
import { CiUndo } from "react-icons/ci";

const PostAttachmentCard = ({
  index,
  attachment,
  attachmentsErrors,
  onDelete,
  setImage,
  setShowImage,
  setImageIndex,
  showActions = true,
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
            classes="absolute top-[10px] right-[10px] py-1.5 px-3 h-[40px]"
            event={() => onDelete(attachment, index, update)}
          >
            <HiMiniXMark className="w-5 h-5 dark:text-gray-300 text-gray-600" />
          </SecondaryButton>
          <SecondaryButton
            event={() => {}}
            classes={
              "absolute right-[60px] top-[10px] px-3 py-1.5 h-[40px] cursor-default"
            }
          >
            <span className="dark:text-gray-300 text-gray-600">
              {index + 1}
            </span>
          </SecondaryButton>
          {attachment.file && (
            <SecondaryButton
              event={() => {}}
              classes="px-3 py-1.5 absolute top-[10px] right-[100px] h-[40px]"
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
        <div className="w-full h-full max-h-[500px]">
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
