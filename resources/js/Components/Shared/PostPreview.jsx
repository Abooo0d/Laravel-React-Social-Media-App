import React, { useEffect } from "react";
import "animate.css";
import { HiMiniXMark } from "react-icons/hi2";
import DOMPurify from "dompurify";
import { FaFile } from "react-icons/fa";
import PostOwnerInfo from "./PostOwnerInfo";
import { isImage } from "@/Functions";
import { SecondaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
import { CiUndo } from "react-icons/ci";
const PostPreview = ({
  finalPost,
  setFinalPost,
  post,
  setPost,
  show,
  setShow,
  setImage,
  setShowImage,
  user,
  setAttachment,
  imageIndex,
  setImageIndex,
}) => {
  const onDelete = (attachment) => {
    if (attachment.file) {
      setPost((prevPost) => ({
        ...prevPost,
        attachments: prevPost.attachments.filter((f) => f !== attachment),
      }));
      setFinalPost((prevPost) => ({
        ...prevPost,
        attachments: prevPost.attachments.filter((f) => f !== attachment),
      }));
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        attachments: prevPost.attachments.map((f) => ({
          ...f,
          isDeleted: f === attachment || f.isDeleted === true ? true : false,
        })),
      }));
      setFinalPost((prevPost) => ({
        ...prevPost,
        deletedFilesIds: [...prevPost.deletedFilesIds, attachment.id],
      }));
    }
  };
  const undoDelete = (attachment) => {
    setPost((prevPost) => ({
      ...prevPost,
      attachments: prevPost.attachments.map((f) => ({
        ...f,
        isDeleted: f === attachment ? false : f.isDeleted,
      })),
    }));
    setFinalPost((prevPost) => ({
      ...prevPost,
      deletedFilesIds: [
        ...prevPost.deletedFilesIds.filter((f) => f !== attachment.id),
      ],
    }));
  };
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
                <SecondaryButton
                  event={() => {}}
                  classes="px-3 py-1.5 absolute top-[10px] right-[60px] h-[40px]"
                >
                  {index + 1}
                </SecondaryButton>
                {attachment.file && (
                  <SecondaryButton
                    event={() => {}}
                    classes="px-3 py-1.5 absolute top-[10px] right-[100px] h-[40px]"
                  >
                    new
                  </SecondaryButton>
                )}
                <SecondaryButton
                  event={() => onDelete(attachment)}
                  classes="px-3 py-1.5 absolute top-[10px] right-[10px] h-[40px]"
                >
                  <HiMiniXMark className="w-5 h-5" />
                </SecondaryButton>
                {attachment.isDeleted && (
                  <SecondaryButton
                    event={() => {
                      undoDelete(attachment);
                    }}
                    classes="absolute top-[60px] right-[10px] px-3 py-1.5 gap-2"
                  >
                    Deleted <CiUndo className="w-4 h-4" />
                  </SecondaryButton>
                )}
                {isImage(attachment.file ? attachment.file : attachment) ? (
                  <img
                    key={index}
                    src={attachment.url}
                    className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                    onClick={() => {
                      setImage(attachment.url);
                      setShowImage(true);
                      setImageIndex(index);
                      setAttachment(attachment.id);
                      console.log("Abood");
                    }}
                  />
                ) : (
                  <div className="w-full h-[250px] max-h-[500px] object-cover rounded-lg cursor-default bg-gray-800 flex justify-center items-center flex-col gap-4">
                    <FaFile className="w-20 h-20 text-gray-500" />
                    <h3 className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                      {attachment.file ? attachment.file.name : attachment.name}
                    </h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </PopupCard>
  );
};

export default PostPreview;
