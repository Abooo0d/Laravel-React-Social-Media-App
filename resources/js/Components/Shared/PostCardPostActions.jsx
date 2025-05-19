import axiosClient from "@/AxiosClient/AxiosClient";
import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useMainContext } from "@/Contexts/MainContext";
const PostCardPostActions = ({ post, setPost, setShowCommentSection }) => {
  const { setErrors } = useMainContext();
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
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <div className="flex justify-between items-center gap-3 flex-col flex-1 mt-4 ">
      <div className=" flex-1 text-gray-300 w-full flex justify-between items-center">
        <div className="cursor-default text-gray-600 lg:text-sm text-[13px]">
          {parseInt(post.num_of_reactions) === 0
            ? "No Reactions"
            : parseInt(post.num_of_reactions) === 1
            ? `${post.num_of_reactions} Person Reacted`
            : parseInt(post.num_of_reactions) > 1
            ? `${post.num_of_reactions} Persons Reacted`
            : "No Reactions"}
        </div>
        <div className="cursor-default text-gray-600 lg:text-sm text-[13px]">
          {post.num_of_comments === 1
            ? post.num_of_comments + " Comment"
            : post.num_of_comments > 1
            ? post.num_of_comments + " Comments"
            : "No Comments"}
        </div>
      </div>
      <div className="flex justify-end items-center gap-2 flex-1 w-full border-t-[2px] border-solid border-gray-800 pt-1">
        <button
          className="flex justify-center items-center relative text-gray-400 rounded-lg cursor-pointer duration-200 h-[40px] flex-1 bg-gray-900"
          onClick={sendReaction}
        >
          <div className="relative mr-2">
            <AiFillLike
              className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl duration-300 ${
                post.user_has_reaction
                  ? "opacity-100 visible"
                  : "scale-50 opacity-0 invisible"
              }`}
            />
            <AiOutlineLike
              className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl duration-300 ${
                post.user_has_reaction
                  ? "scale-50 opacity-0 invisible"
                  : "opacity-100 visible"
              }`}
            />
          </div>
          <span className="w-[60px] lg:text-[16px] text-sm">
            {post.user_has_reaction ? "Liked" : "Like"}
          </span>
        </button>
        <button
          onClick={() => {
            setShowCommentSection((prevState) => !prevState);
          }}
          className="flex justify-center items-center text-gray-400 rounded-lg cursor-pointer duration-200 h-[40px] flex-1 bg-gray-900 lg:text-[16px] text-sm"
        >
          <FaRegCommentDots className=" text-xl duration-200 mr-2" />
          Comment
        </button>
      </div>
    </div>
  );
};

export default PostCardPostActions;
