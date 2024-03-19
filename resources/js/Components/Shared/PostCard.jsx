import React from "react";
import { Disclosure } from "@headlessui/react";
import { CiCirclePlus } from "react-icons/ci";
const PostCard = ({ post }) => {
  const isImage = (attachment) => {
    const mime = attachment.mime.split("/");
    if (mime[0] === "image") return true;
    return false;
  };
  return (
    <div className="max-w-[700px] w-full bg-gray-900 rounded-lg py-4 px-6 flex gap-6 flex-col duration-200 shadow-md">
      <div className="flex gap-4 flex-row items-center">
        <img
          src={post.ownerImage}
          alt=""
          className="w-[60px] h-[60px] rounded-full border-[3px] border-transparent hover:border-indigo-500 duration-200"
        />
        <div className="flex flex-col ">
          <h2 className=" text-lg ">
            <a href="/" className="text-gray-400 hover:underline duration-200">
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
          <p className="text-gray-600 text-sm ">{post.createdAt}</p>
        </div>
      </div>
      {/* <div className="text-gray-400 text-xl">{post.caption}</div> */}
      <div>
        <Disclosure>
          {({ open }) => (
            <>
              {!open ? (
                <>
                  <div className="text-gray-400 text-xl">
                    {post.caption.substring(0, 200) + ".."}
                  </div>
                  {/* <hr className="border-[1px] border-gray-800 my-2" /> */}
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
      {post.attachments && (
        <>
          <div
            className={`w-full min-h-[300px] overflow-hidden grid gap-3
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
                            className="w-full h-full rounded-lg "
                          />
                        )}
                      </>
                    ) : (
                      index === 1 && (
                        <>
                          {isImage(attachment) && (
                            <div className="relative w-full h-full">
                              <img
                                key={index}
                                src={attachment.url}
                                className="w-full h-full rounded-lg "
                              />
                              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40 z-10 flex justify-center items-center rounded-lg">
                                <CiCirclePlus className="absolute text-7xl cursor-pointer text-gray-800 duration-200 font-extrabold" />
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
                        className="w-full h-full rounded-lg "
                      />
                    )}
                  </>
                ))}
              </>
            )}
          </div>
        </>
      )}
      <div className="flex justify-between items-center">
        <div>Like</div>
        <div>Comments</div>
      </div>
      {/* {post.caption} */}
    </div>
  );
};

export default PostCard;
