import "animate.css";
import { Disclosure } from "@headlessui/react";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { PiThumbsUpBold } from "react-icons/pi";
import { TiArrowBack } from "react-icons/ti";
import PostOwnerInfo from "./PostOwnerInfo";
import { HiMiniXMark } from "react-icons/hi2";
const FullPostCard = ({
  post,
  show,
  setShow,
  setImage,
  setShowImage,
  user,
}) => {
  const isImage = (attachment) => {
    const mime = attachment.mime.split("/");
    return mime[0] === "image";
  };
  return (
    <div
      className={`overlay items-start flex duration-200 ${
        show ? "visible opacity-100 " : "invisible opacity-0 scale-[95%]"
      }`}
    >
      <div
        className={`relative animate-scaleUp  max-w-[700px] max-h-full h-[800px] duration-200  w-full dark:bg-gray-900/80 backdrop-blur-sm bg-gray-200 rounded-lg lg:py-4 lg:px-6 px-2 py-3 flex lg:gap-6 gap-2 flex-col shadow-md ${
          show ? "visible opacity-100 " : "invisible opacity-0 scale-[95%]"
        }`}
      >
        {/* User Info */}
        <div className="flex flex-1 justify-between items-center">
          <PostOwnerInfo post={post} user={user} />
          <button
            className={`bg-gray-800/70 rounded-md flex justify-center items-center p-2 border-[1px] border-solid border-gray-700 hover:bg-gray-800 duration-200 ${
              show ? "visible opacity-100 " : "invisible opacity-0"
            }`}
            onClick={() => {
              setShow(false);
            }}
          >
            <HiMiniXMark className="w-5 h-5 text-gray-200" />
          </button>
        </div>
        {/* Post Caption */}
        {post.body && (
          <Disclosure>
            {({ open }) => (
              <>
                {!open ? (
                  <>
                    <div className="dark:text-gray-400 text-gray-800 lg:text-xl text-lg">
                      {post.body.substring(0, 200) + ".."}
                    </div>
                  </>
                ) : (
                  <Disclosure.Panel>
                    <div className="dark:text-gray-400 text-gray-700 lg:text-xl text-lg">
                      {post.body}
                    </div>
                  </Disclosure.Panel>
                )}
                <Disclosure.Button className="text-indigo-600 text-lg w-full flex justify-end mt-2">
                  {open ? "Read Less" : "Read more"}
                </Disclosure.Button>
              </>
            )}
          </Disclosure>
        )}
        {/* Post Attachments */}
        {post.attachments && (
          <div className="max-h-[500px] overflow-auto">
            <div className={`w-full h-full flex gap-3 flex-col`}>
              {post.attachments.map((attachment, index) => (
                <img
                  key={index}
                  src={attachment.url}
                  className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer "
                  onClick={() => {
                    setImage(attachment.url);
                    setShowImage(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center gap-3">
          <div className="flex-1 group flex justify-center items-center dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-400 dark:text-gray-300 text-gray-700 gray-300 rounded-lg cursor-pointer duration-200 h-[40px]">
            <PiThumbsUpBold className="group-hover:text-indigo-500 text-xl mr-2 duration-200" />
            Like
          </div>
          <div className="flex-1 group flex justify-center items-center dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-400 dark:text-gray-300 text-gray-700 gray-300 rounded-lg cursor-pointer duration-200 h-[40px]">
            {/* <FaComments className="group-hover:text-indigo-500 text-xl mr-2 duration-200" /> */}
            <FaRegCommentDots className="group-hover:text-indigo-500 text-xl mr-2 duration-200" />
            Comment
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPostCard;
