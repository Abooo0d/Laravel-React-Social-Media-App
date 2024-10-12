import axiosClient from "@/AxiosClient/AxiosClient";
import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { PiThumbsUpBold } from "react-icons/pi";

const PostCardPostActions = ({ post, setPost }) => {
  const sendReaction = () => {
    axiosClient
      .post(route("post.reaction", post), {
        reaction: "like",
      })
      .then(({ data }) => {
        setPost({
          ...post,
          user_has_reaction: data.user_has_reaction,
          num_of_reactions: data.num_of_reactions,
        });
      });
  };

  return (
    <div className="flex justify-between items-center gap-3">
      <button
        className="flex-1 group flex justify-center items-center dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-400 dark:text-gray-300 text-gray-700 gray-300 rounded-lg cursor-pointer duration-200 h-[40px]"
        onClick={sendReaction}
      >
        <PiThumbsUpBold className="group-hover:text-indigo-500 text-xl mr-2 duration-200" />
        {post.num_of_reactions}
        Like
      </button>
      <button className="flex-1 group flex justify-center items-center dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-400 dark:text-gray-300 text-gray-700 gray-300 rounded-lg cursor-pointer duration-200 h-[40px]">
        {/* <FaComments className="group-hover:text-indigo-500 text-xl mr-2 duration-200" /> */}
        <FaRegCommentDots className="group-hover:text-indigo-500 text-xl mr-2 duration-200" />
        Comment
      </button>
    </div>
  );
};

export default PostCardPostActions;
