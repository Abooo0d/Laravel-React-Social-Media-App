import { formatBytes, isImage, isVideo } from "@/Functions";
import React from "react";
import { FaFile, FaPlay } from "react-icons/fa";
const PostCardPostAttachments = ({
  post,
  setImage,
  setShowImage,
  setShowPost,
  setImageIndex,
}) => {
  return (
    <>
      {post.attachments && post.attachments.length > 0 && (
        <>
          <div
            className={`w-full lg:min-h-[300px] min-h-[200px] overflow-hidden grid gap-3 mt-2
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
                        {isImage(attachment) ? (
                          <img
                            key={index}
                            src={attachment.url}
                            className="w-full h-full max-h-[400px] object-cover rounded-lg cursor-pointer"
                            loading="lazy"
                            onClick={() => {
                              setImage(attachment.url);
                              setShowImage(true);
                              setImageIndex(index);
                            }}
                          />
                        ) : isVideo(attachment) ? (
                          <video
                            key={index}
                            src={attachment.url}
                            className="w-full h-full max-h-[400px] object-cover rounded-lg cursor-pointer"
                            loading="lazy"
                            onClick={() => {
                              setImage(attachment.url);
                              setShowImage(true);
                              setImageIndex(index);
                            }}
                            // controls
                          />
                        ) : (
                          <div
                            className="w-full min-h-[200px] h-full max-h-[400px] object-cover rounded-lg cursor-pointer bg-gradient-to-r from-homeFeed via-gray-700 to-gray-600 flex justify-center items-center flex-col gap-4"
                            onClick={() => {
                              setImage("");
                              setShowImage(true);
                              setImageIndex(index);
                            }}
                          >
                            <FaFile className="w-20 h-20 text-gray-300" />
                            <h3 className="text-gray-300 font-bold text-xl max-w-[80%] break-words text-center">
                              {attachment?.name}
                            </h3>
                          </div>
                        )}
                      </>
                    ) : (
                      index === 1 && (
                        <>
                          {isImage(attachment) ? (
                            <div className="relative w-full h-full" key={index}>
                              <img
                                key={index}
                                src={attachment.url}
                                loading="lazy"
                                className="w-full h-full max-h-[400px] object-cover rounded-lg cursor-pointer"
                                onClick={() => setImage(attachment.url)}
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
                          ) : isVideo(attachment) ? (
                            <video
                              key={index}
                              src={attachment.url}
                              className="w-full h-full max-h-[400px] object-cover rounded-lg cursor-pointer"
                              loading="lazy"
                              onClick={() => {
                                setImage(attachment.url);
                                setShowImage(true);
                                setImageIndex(index);
                              }}
                              // controls
                            />
                          ) : (
                            <div
                              className="w-full min-h-[200px] h-full max-h-[400px] object-cover rounded-lg cursor-pointer bg-gradient-to-r from-homeFeed via-gray-700 to-gray-600 flex justify-center items-center flex-col gap-4"
                              onClick={() => {
                                setImage("");
                                setShowImage(true);
                                setImageIndex(index);
                              }}
                            >
                              <FaFile className="w-20 h-20 text-gray-300" />
                              <h3 className="text-gray-300 font-bold text-xl max-w-[80%] break-words text-center">
                                {attachment?.name}
                              </h3>
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
                    {isImage(attachment) ? (
                      <img
                        key={index}
                        src={attachment.url}
                        loading="lazy"
                        className="w-full h-full max-h-[400px] object-cover rounded-lg cursor-pointer"
                        onClick={() => {
                          setImage(attachment.url);
                          setShowImage(true);
                          setImageIndex(index);
                        }}
                      />
                    ) : isVideo(attachment) ? (
                      <div className="relative w-full h-full" key={index}>
                        <video
                          key={index}
                          src={attachment.url}
                          className="w-full h-full max-h-[400px] object-cover rounded-lg cursor-pointer"
                          loading="lazy"
                          onClick={() => {
                            setImage(attachment.url);
                            setShowImage(true);
                            setImageIndex(index);
                          }}
                        />
                        <span className="absolute top-[50%] left-[50%] bg-gray-500/50 w-[100px] h-[100px] backdrop-blur-sm rounded-full flex justify-center items-center translate-x-[-50%] translate-y-[-50%] cursor-pointer text-gray-400">
                          <FaPlay className="text-[30px] ml-2" />
                        </span>
                      </div>
                    ) : (
                      <div
                        className="w-full min-h-[200px] h-full max-h-[400px] object-cover rounded-lg cursor-pointer bg-gradient-to-r from-homeFeed via-gray-700 to-gray-600 flex justify-center items-center flex-col gap-4"
                        onClick={() => {
                          setImage("");
                          setShowImage(true);
                          setImageIndex(index);
                        }}
                      >
                        <FaFile className="w-20 h-20 text-gray-300" />
                        {/* <h3 className="text-gray-300 font-bold text-xl max-w-[80%] break-words text-center">
                          {attachment?.name}
                        </h3> */}
                        <div className="flex flex-col w-full justify-center items-center px-2">
                          <h3 className="flex-1 text-[20px] font-bold text-gray-300 break-all">
                            {attachment?.name}
                          </h3>
                          <div className="flex flex-col justify-start items-center w-[80%]">
                            <span className="text-gray-400">
                              {formatBytes(attachment.size)}
                            </span>
                            <span className="text-gray-400 ">
                              {attachment.mime.split(".")[0]}
                            </span>
                          </div>
                        </div>
                      </div>
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
