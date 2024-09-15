import "animate.css";
import { Disclosure } from "@headlessui/react";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { PiThumbsUpBold } from "react-icons/pi";
import { TiArrowBack } from "react-icons/ti";
import PostOwnerInfo from "./PostOwnerInfo";
import { HiMiniXMark } from "react-icons/hi2";
import PostCardPostBody from "./PostCardPostBody";
import { SecondaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
const FullPostCard = ({
  post,
  show,
  setShow,
  setImage,
  setShowImage,
  user,
  setAttachment,
  setImageIndex,
  attachment,
}) => {
  const isImage = (attachment) => {
    const mime = attachment.mime.split("/");
    return mime[0] === "image";
  };
  return (
    <PopupCard showForm={show}>
      {/* User Info */}
      <div className="flex flex-1 justify-between items-center">
        <PostOwnerInfo post={post} user={user} />
        <SecondaryButton
          classes={"px-3 py-1.5"}
          event={() => {
            setShow(false);
          }}
        >
          <HiMiniXMark className="w-5 h-5 text-gray-200" />
        </SecondaryButton>
      </div>
      {/* Post Caption */}
      {post.body && <PostCardPostBody post={post} />}
      {/* Post Attachments */}
      {post.attachments && (
        <div className="max-h-[500px] overflow-auto my-4">
          <div className={`w-full h-full flex gap-3 flex-col`}>
            {post.attachments.map((attachment, index) => (
              <img
                key={index}
                src={attachment.url}
                className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer "
                onClick={() => {
                  setImage(attachment.url);
                  setShowImage(true);
                  setAttachment(attachment.id);
                  setImageIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between items-center gap-3">
        <div className="flex-1 group flex justify-center items-center dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-400 dark:text-gray-300 text-gray-700 gray-300 rounded-lg cursor-pointer duration-200 h-[40px]">
          <PiThumbsUpBold className="group-hover:text-indigo-500 text-xl mr-2 duration-200" />
          Like
        </div>
        <div className="flex-1 group flex justify-center items-center dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-400 dark:text-gray-300 text-gray-700 gray-300 rounded-lg cursor-pointer duration-200 h-[40px]">
          {/* <FaComments className="group-hover:text-indigo-500 text-xl mr-2 duration-200" /> */}
          <FaRegCommentDots className="group-hover:text-indigo-500 text-xl mr-2 duration-200" />
          Comment
        </div>
      </div>
    </PopupCard>
  );
};

export default FullPostCard;
