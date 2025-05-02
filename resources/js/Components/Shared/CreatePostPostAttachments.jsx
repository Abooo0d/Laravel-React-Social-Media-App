import React from "react";
import PostAttachmentCard from "./PostAttachmentCard";
const CreatePostPostAttachments = ({
  post,
  attachmentsErrors,
  onDelete,
  setImage,
  setShowImage,
  setShowPost,
  setImageIndex,
}) => {
  const isImage = (attachment) => {
    let mime = attachment.type || attachment.mime;
    mime = mime.split("/");
    return mime[0] === "image";
  };
  return (
    <div>
      {post.attachments && post.attachments.length > 0 ? (
        <>
          <div
            className={`w-full lg:min-h-[300px] min-h-[200px] overflow-hidden grid gap-3 mt-4
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
                      <div className="relative">
                        <PostAttachmentCard
                          attachment={attachment}
                          index={index}
                          attachmentsErrors={attachmentsErrors}
                          onDelete={onDelete}
                          setImage={setImage}
                          setImageIndex={setImageIndex}
                          setShowImage={setShowImage}
                        />
                      </div>
                    ) : (
                      index === 1 && (
                        <>
                          <div className="relative w-full h-full" key={index}>
                            <PostAttachmentCard
                              attachment={attachment}
                              index={index}
                              attachmentsErrors={attachmentsErrors}
                              onDelete={onDelete}
                              setImage={setImage}
                              setImageIndex={setImageIndex}
                              setShowImage={setShowImage}
                              showActions={false}
                            />
                            <div
                              className="absolute top-0 left-0 w-full h-full bg-gray-800/50 backdrop-blur-sm flex justify-center items-center rounded-lg cursor-pointer z-[1] group"
                              onClick={() => setShowPost(true)}
                              key={index + "div"}
                            >
                              <span className="text-3xl text-gray-200 rounded-full border-[1px] border-solid border-gray-200/50 p-2 h-[60px] w-[60px] flex justify-center items-center group-hover:bg-gray-800/20 duration-200 group-hover:scale-105">
                                +{post.attachments.length - 2}
                              </span>
                            </div>
                          </div>
                        </>
                      )
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <>
                {post.attachments.map((attachment, index) => (
                  <div className="relative" key={index}>
                    <PostAttachmentCard
                      attachment={attachment}
                      index={index}
                      attachmentsErrors={attachmentsErrors}
                      onDelete={onDelete}
                      setImage={setImage}
                      setImageIndex={setImageIndex}
                      setShowImage={setShowImage}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreatePostPostAttachments;
