import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { CiCirclePlus } from "react-icons/ci";
import FullPostCard from "./FullPostCard";
import { PiThumbsUpBold } from "react-icons/pi";
import { FaRegCommentDots } from "react-icons/fa";
import ImageFullView from "./ImageFullView";

const PostCard = ({ post }) => {
  const [showPost, setShowPost] = useState(false);
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const isImage = (attachment) => {
    const mime = attachment.mime.split("/");
    if (mime[0] === "image") return true;
    return false;
  };
  const ShowFullPost = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="max-w-[700px] w-full dark:bg-gray-900 bg-gray-200 rounded-lg py-4 lg:px-6 px-4 flex lg:gap-6 gap-2 flex-col duration-200 shadow-md">
        {/* User Info */}
        <div className="flex lg:gap-4 gap-2 flex-row items-center">
          <img
            src={post.ownerImage}
            alt=""
            className="w-[60px] h-[60px] rounded-full border-[3px] border-transparent hover:border-indigo-500 duration-200"
          />
          <div className="flex flex-col ">
            <h2 className=" text-lg ">
              <a
                href="/"
                className="dark:text-gray-400 text-gray-900  hover:underline duration-200"
              >
                {post.ownerName}
              </a>{" "}
              {post?.groupe !== "" && (
                <>
                  :{" "}
                  <a
                    href="/"
                    className="dark:text-gray-500 text-gray-400 hover:underline duration-200"
                  >
                    {post.groupe}
                  </a>
                </>
              )}
            </h2>
            <p className="text-gray-600 text-sm cursor-default">
              {post.createdAt}
            </p>
          </div>
        </div>
        {/* Post Caption  */}
        <div>
          <Disclosure>
            {({ open }) => (
              <>
                {!open ? (
                  <>
                    <div className="dark:text-gray-400 text-gray-700 lg:text-xl text-lg">
                      {post.caption.substring(0, 200) + ".."}
                    </div>
                    {/* <hr className="border-[1px] border-gray-800 my-2" /> */}
                  </>
                ) : (
                  <Disclosure.Panel>
                    <div className="dark:text-gray-400 text-gray-700 lg:text-xl text-lg">
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
                    <>
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
                              <div
                                className="relative w-full h-full"
                                key={index}
                              >
                                <img
                                  key={index}
                                  src={attachment.url}
                                  className="w-full h-full max-h-[500px] object-cover rounded-lg cursor-pointer"
                                  // onClick={() => setImage(attachment.url)}
                                />
                                <div
                                  className="absolute top-0 left-0 w-full h-full bg-white opacity-40 z-10 flex justify-center items-center rounded-lg cursor-pointer"
                                  onClick={() => setShowPost(true)}
                                  key={index + "div"}
                                >
                                  <CiCirclePlus className="absolute text-7xl text-gray-800 duration-200 font-extrabold cursor-pointer" />
                                </div>
                              </div>
                            )}
                          </>
                        )
                      )}
                    </>
                  ))}
                </>
              ) : (
                <>
                  {post.attachments.map((attachment, index) => (
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
                  ))}
                </>
              )}
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
      <FullPostCard
        show={showPost}
        post={post}
        setShow={setShowPost}
        setImage={setImage}
        setShowImage={setShowImage}
      />
      <ImageFullView
        image={image}
        show={showImage}
        setShowImage={setShowImage}
      />
    </>
  );
};

export default PostCard;
