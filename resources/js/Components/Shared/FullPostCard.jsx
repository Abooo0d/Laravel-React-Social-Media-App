import { Disclosure } from "@headlessui/react";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
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
      <div className="max-w-[700px] w-full bg-gray-900 rounded-lg py-4 px-6 flex gap-6 flex-col duration-200 shadow-md">
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
                  className="text-gray-400 hover:underline duration-200"
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
              <p className="text-gray-600 text-sm cursor-default">
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
                    <div className="text-gray-400 text-xl">
                      {post.caption.substring(0, 200) + ".."}
                    </div>
                  </>
                ) : (
                  <Disclosure.Panel>
                    <div className="text-gray-400 text-xl">{post.caption}</div>
                  </Disclosure.Panel>
                )}
                <Disclosure.Button className="text-indigo-600 text-lg w-full flex justify-end">
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
              className={`w-full min-h-[300px] max-h-[600px] overflow-scroll flex gap-3 flex-col`}
            >
              {post.attachments.map((attachment, index) => (
                <img
                  key={index}
                  src={attachment.url}
                  className="w-full h-full max-h-[500px] object-cover rounded-lg "
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FullPostCard;
