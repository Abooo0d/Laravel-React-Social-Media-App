import React, { useState } from "react";
import { formatRelativeTime } from "../../Functions";
const PostOwnerInfo = ({ post, user }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4 flex-row items-center">
        <img
          src={user?.avatar_url}
          alt=""
          className="w-[60px] h-[60px] rounded-full border-[3px] border-transparent hover:border-indigo-500 duration-200"
        />
        <div className="flex flex-col ">
          <h2 className=" text-lg ">
            <a
              href="/"
              className="dark:text-gray-400 text-gray-900 hover:underline duration-200"
            >
              {user?.name}
            </a>{" "}
            {post &&
              (post?.groupe !== "" ||
                (post?.group !== null && (
                  <>
                    <a
                      href="/"
                      className="text-gray-500 hover:underline duration-200"
                    >
                      : {post.groupe}
                    </a>
                  </>
                )))}
          </h2>
          {post && (
            <p className="text-gray-500 text-sm cursor-default">
              {formatRelativeTime(post.updated_at)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostOwnerInfo;
