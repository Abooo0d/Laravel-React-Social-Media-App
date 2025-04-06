import React, { useState } from "react";
import { formatRelativeTime } from "../../Functions";
import { Link } from "@inertiajs/react";
import { MdOutlineArrowRight } from "react-icons/md";
const PostOwnerInfo = ({ post, user }) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="flex gap-4 flex-row items-center">
        <img
          src={user?.avatar_url || "/images/default_avatar_image.png"}
          alt=""
          className="w-[60px] h-[60px] rounded-full border-[1px] border-gray-600/50 hover:border-gray-600 duration-200 object-cover"
        />
        <div className="flex flex-col w-full">
          <h2 className=" flex justify-start items-center text-lg dark:text-gray-400 lg:text-[18px] text-[16px] text-gray-900 duration-200">
            {post?.user && (
              <Link
                href={route("profile.view", user?.name)}
                className=" hover:no-underline"
              >
                {user?.name}
              </Link>
            )}
            {post && (
              <>
                {post.group && (
                  <>
                    <MdOutlineArrowRight className="max-h-full w-[25px] h-[25px] text-gray-600" />
                    <Link href={route("group.profile", post.group.slug)}>
                      {post.group.name}
                    </Link>
                  </>
                )}
              </>
            )}
          </h2>
          {post && (
            <p className="text-gray-500 lg:text-sm text-[12px] cursor-default">
              {formatRelativeTime(post.updated_at)}
            </p>
          )}
        </div>
      </div>
    </div>
    // <div>Abood</div>
  );
};

export default PostOwnerInfo;
