import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
const PostCard = ({ post }) => {
  const [more, setMore] = useState(false);
  return (
    <div className="w-full bg-gray-900 rounded-lg py-4 px-6 flex gap-6 flex-col duration-200">
      <div className="flex gap-4 flex-row items-center">
        <img
          src={post.ownerImage}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="flex flex-col ">
          <h2 className="text-gray-400 text-lg ">{post.ownerName}</h2>
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
                  <hr className="border-[1px] border-gray-800 my-2" />
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
      {/* {post.caption} */}
    </div>
  );
};

export default PostCard;
