import React, { useEffect } from "react";
import "animate.css";
import { HiMiniXMark } from "react-icons/hi2";
import DOMPurify from "dompurify";
import { FaFile } from "react-icons/fa";
const PostPreview = ({
  post,
  setPost,
  show,
  setShow,
  setImage,
  setShowImage,
}) => {
  const isImage = (attachment) => {
    let mime = attachment.type || attachment.mime;
    mime = mime.split("/");
    return mime[0] === "image";
  };

  return (
    <div
      className={`overlay items-start flex duration-200 delay-150  ${
        show ? "visible " : "invisible"
      }`}
    >
      <div className="max-w-[700px] lg:max-h-[500px] max-h-full relative">
        <button
          className={`bg-gray-800/70 absolute top-[-50px] right-0 rounded-md flex justify-center items-center p-2 border-[1px] border-solid border-gray-700 hover:bg-gray-800 duration-200 ${
            show ? "visible opacity-100 " : "invisible opacity-0"
          }`}
          onClick={() => {
            setShow(false);
          }}
        >
          <HiMiniXMark className="w-5 h-5 text-gray-200" />
        </button>
        <div
          className={`relative overflow-y-auto max-w-[700px] lg:max-h-[600px] max-h-full w-full bg-gray-900/50 border-[1px] border-solid border-gray-700 p-6 backdrop-blur-2xl bg-gray-200 rounded-lg lg:py-4 lg:px-6 px-2 py-3 flex lg:gap-6 gap-2 flex-col duration-200 shadow-md ${
            show ? "visible opacity-100 " : "invisible opacity-0 scale-[95%]"
          }`}
        >
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
              <div className={`w-full h-full flex gap-3 flex-col`}>
                {post.attachments.map((attachment, index) => (
                  <div key={index} className="relative">
                    <span className="absolute top-[10px] right-[60px] p-2 flex justify-center items-center text-gray-300 h-[40px] w-[40px] rounded-md cursor-default bg-gray-800/80 border-solid border-[1px] border-gray-700">
                      {index + 1}
                    </span>
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
                      <div className="w-full h-[250px] max-h-[500px] object-cover rounded-lg cursor-default bg-gray-800 flex justify-center items-center flex-col gap-4">
                        <FaFile className="w-20 h-20 text-gray-500" />
                        <h3 className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                          {attachment.file.name}
                        </h3>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
