import "animate.css";
import { Disclosure } from "@headlessui/react";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { PiThumbsUpBold } from "react-icons/pi";
import { TiArrowBack } from "react-icons/ti";
const FullPostCard = ({ post, show, setShow }) => {
  const isImage = (attachment) => {
    const mime = attachment.mime.split("/");
    if (mime[0] === "image") return true;
    return false;
  };
  return (
    <div
      className={`bg-overlayBackground absolute top-0 left-0 w-full h-full z-20 flex justify-center items-start p-20 ${
        show ? `flex` : "hidden"
      }`}
    >
      <div className="animate__fadeInDown  max-w-[700px] max-h-[800px] overflow-auto w-full dark:bg-gray-900 bg-gray-200 rounded-lg py-4 px-6 flex gap-6 flex-col duration-200 shadow-md">
        {/* User Info */}
        <div className="flex justify-between">
          <div className="flex gap-4 flex-row items-center">
            <img
              src={post.ownerImage}
              alt=""
              className="w-[60px] h-[60px] rounded-full border-[3px] border-transparent hover:border-indigo-500 duration-200"
            />
            <div className="flex flex-col ">
              <h2 className=" text-lg ">
                <a
                  href="/"
                  className="dark:text-gray-400 text-gray-900 hover:underline duration-200"
                >
                  {post.ownerName}
                </a>{" "}
                {post?.groupe !== "" && (
                  <>
                    <a
                      href="/"
                      className="text-gray-500 hover:underline duration-200"
                    >
                      : {post.groupe}
                    </a>
                  </>
                )}
              </h2>
              <p className="text-gray-500 text-sm cursor-default">
                {post.createdAt}
              </p>
            </div>
          </div>
          <div>
            <TiArrowBack
              className="text-gray-600 hover:text-indigo-600 w-[30px] h-[30px] cursor-pointer duration-200"
              onClick={() => setShow(false)}
            />
          </div>
        </div>
        {/* Post Caption */}
        <div>
          <Disclosure>
            {({ open }) => (
              <>
                {!open ? (
                  <>
                    <div className="dark:text-gray-400 text-gray-800 text-xl">
                      {post.caption.substring(0, 200) + ".."}
                    </div>
                    {/* <hr className="border-[1px] border-gray-800 my-2" /> */}
                  </>
                ) : (
                  <Disclosure.Panel>
                    <div className="dark:text-gray-400 text-gray-700 text-xl">
                      {post.caption}
                    </div>
                  </Disclosure.Panel>
                )}
                <Disclosure.Button className="text-indigo-600 text-lg w-full flex justify-end mt-2">
                  {open ? "Read Less" : "Read more"}
                </Disclosure.Button>
              </>
            )}
          </Disclosure>
        </div>
        {/* Post Attachments */}
        {post.attachments && (
          <>
            <div className={`w-full h-full flex gap-3 flex-col`}>
              {post.attachments.map((attachment, index) => (
                <img
                  key={index}
                  src={attachment.url}
                  className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer "
                />
              ))}
            </div>
          </>
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
