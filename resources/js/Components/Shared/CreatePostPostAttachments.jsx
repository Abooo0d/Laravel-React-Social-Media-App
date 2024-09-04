import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import { FaFile } from "react-icons/fa";

const PostAttachments = ({
  post,
  setPost,
  setImage,
  setShowImage,
  setShowPost,
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
                        <button
                          className="absolute top-[10px] right-[10px] h-[40px] w-[40px] p-2 flex justify-center items-center text-gray-300 rounded-md cursor-pointer bg-gray-800/80 hover:bg-gray-700/80 duration-200 border-solid border-[1px] border-gray-700"
                          onClick={() => {
                            setPost((prevPost) => ({
                              ...prevPost,
                              attachments: prevPost.attachments.filter(
                                (f) => f !== attachment
                              ),
                            }));
                          }}
                        >
                          <HiMiniXMark className="w-8 h-8" />
                        </button>
                        {isImage(attachment.file) ? (
                          <img
                            key={index}
                            src={attachment.url}
                            className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                            onClick={() => {
                              setImage(attachment.url);
                              setShowImage(true);
                            }}
                          />
                        ) : (
                          <div className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-default bg-gray-800 flex justify-center items-center flex-col gap-4">
                            <FaFile className="w-20 h-20 text-gray-500" />
                            <h3 className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                              {attachment.file.name}
                            </h3>
                          </div>
                        )}
                      </div>
                    ) : (
                      index === 1 && (
                        <>
                          <div className="relative w-full h-full" key={index}>
                            {isImage(attachment.file) ? (
                              <img
                                key={index}
                                src={attachment.url}
                                className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                                onClick={() => {
                                  setImage(attachment.url);
                                  setShowImage(true);
                                }}
                              />
                            ) : (
                              <div className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-default bg-gray-800 flex justify-center items-center flex-col gap-4">
                                <FaFile className="w-20 h-20 text-gray-500" />
                                <h3 className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                                  {attachment.file.name}
                                </h3>
                              </div>
                            )}
                            <div
                              className="absolute top-0 left-0 w-full h-full bg-gray-800/20 backdrop-blur-sm flex justify-center items-center rounded-lg cursor-pointer z-[1]"
                              onClick={() => setShowPost(true)}
                              key={index + "div"}
                            >
                              <CiCirclePlus className="absolute text-7xl text-gray-500 duration-200 font-extrabold cursor-pointer" />
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
                    <button
                      className="absolute top-[10px] right-[10px] h-[40px] w-[40px] p-2 flex justify-center items-center text-gray-300 rounded-md cursor-pointer bg-gray-800/80 hover:bg-gray-700/80 duration-200 border-solid border-[1px] border-gray-700"
                      onClick={() => {
                        setPost((prevPost) => ({
                          ...prevPost,
                          attachments: prevPost.attachments.filter(
                            (f) => f !== attachment
                          ),
                        }));
                      }}
                    >
                      <HiMiniXMark className="w-8 h-8" />
                    </button>
                    {isImage(attachment.file) ? (
                      <img
                        key={index}
                        src={attachment.url}
                        className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                        onClick={() => {
                          setImage(attachment.url);
                          setShowImage(true);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-default bg-gray-800 flex justify-center items-center flex-col gap-4">
                        <FaFile className="w-20 h-20 text-gray-500" />
                        <h3 className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                          {attachment.file.name}
                        </h3>
                      </div>
                    )}
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

export default PostAttachments;
