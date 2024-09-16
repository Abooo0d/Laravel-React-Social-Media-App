import React, { useEffect } from "react";
import "animate.css";
import { HiMiniXMark } from "react-icons/hi2";
import DOMPurify from "dompurify";
import PostOwnerInfo from "./PostOwnerInfo";
import { SecondaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
import PostAttachmentCard from "./PostAttachmentCard";
const PostPreview = ({
  user,
  post,
  show,
  update,
  attachmentsErrors,
  setShow,
  setImage,
  setShowImage,
  setImageIndex,
  onDelete,
  undoDelete,
}) => {
  return (
    <PopupCard showForm={show}>
      <div className="flex justify-between items-center">
        <PostOwnerInfo user={user} />
        <SecondaryButton event={() => setShow(false)} classes="px-3 py-1.5">
          <HiMiniXMark className="w-5 h-5 text-gray-200" />
        </SecondaryButton>
      </div>
      {/* Post Caption */}
      <div
        className="post-content dark:text-gray-300 text-gray-700 lg:text-xl text-lg"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.body),
        }}
      ></div>
      {/* Post Attachments */}
      {post.attachments && (
        <>
          <div
            className={`w-full max-h-[500px] overflow-y-auto h-full flex gap-3 flex-col my-4`}
          >
            {post.attachments.map((attachment, index) => (
              <div key={index} className="relative">
                <PostAttachmentCard
                  attachment={attachment}
                  attachmentsErrors={attachmentsErrors}
                  index={index}
                  onDelete={onDelete}
                  undoDelete={undoDelete}
                  update={update}
                  setImage={setImage}
                  setImageIndex={setImageIndex}
                  setShowImage={setShowImage}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </PopupCard>
  );
};

export default PostPreview;
