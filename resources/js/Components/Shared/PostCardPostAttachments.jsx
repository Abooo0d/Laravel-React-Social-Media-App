import { isImage } from "@/Functions";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";

const PostCardPostAttachments = ({
  post,
  setImage,
  setShowImage,
  setShowPost,
}) => {
  return (
    <>
      {post.attachments && post.attachments.length > 0 && (
        <>
          <div
            className={`w-full lg:min-h-[300px] min-h-[200px] overflow-hidden grid gap-3
      ${
        post.attachments.length === 1
          ? ` grid-cols-1`
          : post.attachments.length >= 2
          ? ` grid-cols-2`
          : ""
      }
      `}
          >
            {post.attachments.length > 2 ? (
              <>
                {post.attachments.map((attachment, index) => (
                  <React.Fragment key={index}>
                    {index === 0 ? (
                      <>
                        {isImage(attachment) && (
                          <img
                            key={index}
                            src={attachment.url}
                            className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                            onClick={() => {
                              setImage(attachment.url);
                              setShowImage(true);
                            }}
                          />
                        )}
                      </>
                    ) : (
                      index === 1 && (
                        <>
                          {isImage(attachment) && (
                            <div className="relative w-full h-full" key={index}>
                              <img
                                key={index}
                                src={attachment.url}
                                className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                                onClick={() => setImage(attachment.url)}
                              />
                              <div
                                className="absolute top-0 left-0 w-full h-full bg-gray-800/50 backdrop-blur-sm flex justify-center items-center rounded-lg cursor-pointer z-[1]"
                                onClick={() => setShowPost(true)}
                                key={index + "div"}
                              >
                                <span className="text-3xl text-gray-200 rounded-full border-[1px] border-solid border-gray-200/50 p-2 h-[60px] w-[60px] flex justify-center items-center hover:bg-gray-800/20 duration-200 hover:scale-105">
                                  +{post.attachments.length - 2}
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      )
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <>
                {post.attachments.map((attachment, index) => (
                  <React.Fragment key={index}>
                    {isImage(attachment) && (
                      <img
                        key={index}
                        src={attachment.url}
                        className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                        onClick={() => {
                          setImage(attachment.url);
                          setShowImage(true);
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PostCardPostAttachments;
