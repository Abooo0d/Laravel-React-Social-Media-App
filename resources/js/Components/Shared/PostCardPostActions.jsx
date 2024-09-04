import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { PiThumbsUpBold } from "react-icons/pi";

const PostCardPostActions = () => {
  return (
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
  );
};

export default PostCardPostActions;
