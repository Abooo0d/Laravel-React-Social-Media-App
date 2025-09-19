import React, { useEffect, useState } from "react";
import { GoDownload } from "react-icons/go";
import { RiArrowGoBackFill } from "react-icons/ri";
import { SecondaryButton } from "./Buttons";
import { FaAngleRight, FaAngleLeft, FaFile } from "react-icons/fa";
import { isImage, isVideo } from "@/Functions";
const ImageFullView = ({
  show,
  post,
  imageIndex,
  setShowImage,
  setImageIndex,
  update,
}) => {
  const [attachmentId, setAttachmentId] = useState(0);
  useEffect(() => {
    post?.attachments?.length > 0 &&
      setAttachmentId(post?.attachments[imageIndex] || 0);
  }, [show]);

  const next = (index) => {
    if (index < post?.attachments?.length - 1) {
      setImageIndex(index + 1);
      setAttachmentId(post?.attachments[index + 1]);
    } else {
      setImageIndex(0);
      setAttachmentId(post?.attachments[0]);
    }
  };
  const back = (index) => {
    if (index > 0) {
      setImageIndex(index - 1);
      setAttachmentId(post?.attachments[index - 1]);
    } else {
      setImageIndex(post?.attachments?.length - 1);
      setAttachmentId(post?.attachments[post?.attachments?.length - 1]);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[800] w-screen overflow-y-auto flex min-h-full items-center justify-center p-4 dark:bg-gray-950/60 bg-gray-100/40 backdrop-blur-sm duration-200 ${
        show ? `visible opacity-100` : `invisible opacity-0 scale-[95%]`
      }`}
    >
      <div className="animate-scaleUp h-full  w-full rounded-lg relative flex justify-between items-center dark:bg-gray-900/60 bg-gray-300/60 border-solid border-[1px] dark:border-gray-700 border-gray-400 backdrop-blur-md p-4">
        <div className="absolute top-[30px] right-[12px] h-20 flex justify-center items-center gap-2 flex-col z-[100]">
          <SecondaryButton
            classes="py-1.5 px-3 right-0"
            event={() => setShowImage(false)}
          >
            <RiArrowGoBackFill className="w-5 h-5 dark:text-gray-200 text-gray-600" />
          </SecondaryButton>
          {!!!update && (
            <>
              {(attachmentId == 0 || !!attachmentId) && (
                <>
                  <a
                    href={route("post.download", attachmentId)}
                    className="no-underline"
                  >
                    <SecondaryButton classes="relative py-1.5 px-3">
                      <GoDownload className="w-5 h-5 dark:text-gray-200 text-gray-600" />
                    </SecondaryButton>
                  </a>
                </>
              )}
            </>
          )}
          <SecondaryButton
            classes=" py-1.5 px-3 right-0 w-[46px] cursor-default z-10"
            event={() => {}}
          >
            {imageIndex ? imageIndex + 1 : 1}
          </SecondaryButton>
        </div>
        {post?.attachments?.length > 1 && (
          <SecondaryButton
            event={() => back(imageIndex)}
            classes="h-[100px] w-[35px]"
          >
            <FaAngleLeft className="w-6 h-6 flex justify-center items-center" />
          </SecondaryButton>
        )}
        {show && (
          <div className="relative w-full h-full flex z-0">
            {post?.attachments?.map((attachment, index) => (
              <React.Fragment key={index}>
                {isImage(attachment) ? (
                  <img
                    src={attachment.url}
                    alt="Post Image"
                    key={index}
                    className={`max-w-[90%] max-h-[90%] object-contain rounded-[10px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-200 ${
                      index === imageIndex
                        ? `visible opacity-100`
                        : `invisible opacity-0 scale-75`
                    }`}
                  />
                ) : isVideo(attachment) ? (
                  <video
                    key={index}
                    src={attachment.url}
                    className={`max-w-[90%] max-h-[90%] object-contain rounded-[10px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-200 ${
                      index === imageIndex
                        ? `visible opacity-100`
                        : `invisible opacity-0 scale-75`
                    }`}
                    loading="lazy"
                    autoPlay={false}
                    controls
                  />
                ) : (
                  <div
                    className={`max-w-[90%] max-h-[90%] w-[400px] h-[400px] rounded-lg cursor-default bg-gradient-to-r from-homeFeed via-gray-700 to-gray-600 flex justify-center items-center flex-col gap-4  absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-200 border-gray-500/50 border-[1px] border-solid ${
                      index === imageIndex
                        ? `visible opacity-100`
                        : `invisible opacity-0 scale-75`
                    }`}
                  >
                    <FaFile className="w-20 h-20 text-gray-300" />
                    <h3 className="text-gray-300 font-bold text-xl max-w-[80%] break-words text-center">
                      {attachment?.file
                        ? attachment?.file?.name
                        : attachment?.name}
                    </h3>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        {post?.attachments?.length > 1 && (
          <SecondaryButton
            event={() => {
              next(imageIndex);
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

export default ImageFullView;
