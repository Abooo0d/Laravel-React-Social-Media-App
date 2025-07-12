import React from "react";
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
  setImageIndex,
}) => {
  const isImage = (attachment) => {
    const mime = attachment.mime.split("/");
    return mime[0] === "image";
  };
  return (
    <PopupCard showForm={show} index="z-[600]">
      <div className="max-h-[650px]">
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
        <div className="max-h-[400px] overflow-auto my-4 rounded-lg">
          {post.attachments && (
            <div className="h-full">
              <div className={`w-full h-full flex gap-3 flex-col`}>
                {post.attachments.map((attachment, index) => (
                  <img
                    key={index}
                    src={attachment.url}
                    className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer "
                    onClick={() => {
                      setImage(attachment.url);
                      setShowImage(true);
                      setImageIndex(index);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PopupCard>
  );
};

export default FullPostCard;
