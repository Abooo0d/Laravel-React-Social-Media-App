import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import { FaFile } from "react-icons/fa";
import { SecondaryButton } from "./Buttons";

const CreatePostPostAttachments = ({
  post,
  setPost,
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
                        <SecondaryButton
                          classes="absolute top-[10px] right-[10px] py-1.5 px-3 h-[40px]"
                          event={() => {
                            setPost((prevPost) => ({
                              ...prevPost,
                              attachments: prevPost.attachments.filter(
                                (f) => f !== attachment
                              ),
                            }));
                          }}
                        >
                          <HiMiniXMark className="w-5 h-5 " />
                        </SecondaryButton>
                        <SecondaryButton
                          event={() => {}}
                          classes={
                            "absolute right-[60px] top-[10px] px-3 py-1.5 h-[40px] cursor-default"
                          }
                        >
                          {index + 1}
                        </SecondaryButton>
                        {isImage(
                          attachment.file ? attachment.file : attachment
                        ) ? (
                          <img
                            key={index}
                            src={attachment.url}
                            className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                            onClick={() => {
                              setImage(attachment.url);
                              setShowImage(true);
                              setImageIndex(index);
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
                            {isImage(
                              attachment.file ? attachment.file : attachment
                            ) ? (
                              <img
                                key={index}
                                src={attachment.url}
                                className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                                onClick={() => {
                                  setImage(attachment.url);
                                  setShowImage(true);
                                  setImageIndex(index);
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
                              className="absolute top-0 left-0 w-full h-full bg-gray-800/50 backdrop-blur-sm flex justify-center items-center rounded-lg cursor-pointer z-[1] group"
                              onClick={() => setShowPost(true)}
                              key={index + "div"}
                            >
                              {/* <CiCirclePlus className="absolute text-xl text-gray-400 duration-200 font-extrabold cursor-pointer" /> */}
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
                    <SecondaryButton
                      classes="absolute top-[10px] right-[10px] h-[40px] px-3 py-1.5"
                      event={() => {
                        setPost((prevPost) => ({
                          ...prevPost,
                          attachments: prevPost.attachments.filter(
                            (f) => f !== attachment
                          ),
                        }));
                      }}
                    >
                      <HiMiniXMark className="w-5 h-5" />
                    </SecondaryButton>
                    <SecondaryButton
                      event={() => {}}
                      classes={
                        "absolute right-[60px] top-[10px] px-3 py-1.5 h-[40px] cursor-default"
                      }
                    >
                      {index + 1}
                    </SecondaryButton>
                    {isImage(attachment.file ? attachment.file : attachment) ? (
                      <img
                        key={index}
                        src={attachment.url}
                        className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                        onClick={() => {
                          setImage(attachment.url);
                          setShowImage(true);
                          setImageIndex(index);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-default bg-gray-800 flex justify-center items-center flex-col gap-4">
                        <FaFile className="w-20 h-20 text-gray-500" />
                        <h3 className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                          {attachment.file
                            ? attachment.file.name
                            : attachment.name}
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

export default CreatePostPostAttachments;
