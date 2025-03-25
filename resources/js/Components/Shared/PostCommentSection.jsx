import React, { useEffect, useState } from "react";
import { SecondaryButton } from "./Buttons";
import { BiSolidSend } from "react-icons/bi";
import { useUserContext } from "@/Contexts/UserContext";
import axiosClient from "@/AxiosClient/AxiosClient";
import { FaRegCommentDots } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import DOMPurify from "dompurify";
import CommentMenu from "./CommentMenu";
import CommentCard from "./CommentCard";
import { useMainContext } from "@/Contexts/MainContext";
const PostCommentSection = ({ show, post, setPost, currentUser }) => {
  const { user } = useUserContext();
  const [comment, setComment] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { setSuccessMessage } = useMainContext();
  const createComment = () => {
    axiosClient
      .post(route("post.comment.create", post), {
        comment: comment,
        parent_id: null,
      })
      .then((data) => {
        setPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, data.data[0]],
          num_of_comments: prevPost.num_of_comments + 1,
        }));
        setComment("");
        setSuccessMessage("Comment Posted Successfully");
      });
  };
  return (
    <>
      <div
        className={`flex justify-start items-start flex-col gap-4 max-h-[300px] overflow-auto border-gray-800 border-t-[2px] border-solid py-2 ${
          show ? "visible opacity-100 h-[150px]" : "invisible opacity-0 h-[0px]"
        }`}
      >
        {post.comments.map((comment, index) => {
          return (
            <div
              className="flex flex-col w-full h-full items-center"
              key={index}
            >
              <CommentCard
                currentComment={comment}
                post={post}
                setPost={setPost}
                currentUser={currentUser}
              />
              {post.comments.length > 1 && index < post.comments.length - 1 && (
                <div className="w-[80%] h-[1px] bg-gray-700/20" />
              )}
            </div>
          );
        })}
      </div>
      <div
        className={`flex justify-between items-start gap-2 pt-2 w-full duration-200 text-gray-400 border-t-[1px] border-solid border-gray-700 mt-0 overflow-hidden  ${
          show ? "visible opacity-100 h-[100px]" : "invisible opacity-0 h-[0px]"
        }`}
      >
        <img
          src={user.avatar_url}
          alt="Avatar Image"
          className="w-[40px] h-[40px] rounded-full"
        />
        <div className="relative flex-1 flex justify-center items-center">
          <textarea
            placeholder="Your comment"
            className="flex-1 px-2 py-1 bg-gray-700/50 text-gray-400 placeholder:text-gray-600 resize-none overflow-scroll h-[80px] border-gray-800 rounded-md outline-none focus:border-gray-600 ring-0 focus:ring-0 duration-200 cursor-pointer"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <SecondaryButton
            classes={
              "px-2 py-1.5 absolute top-[5px] right-[5px] bg-transparent border-none"
            }
            event={() => createComment()}
          >
            <BiSolidSend className="text-gray-400" />
          </SecondaryButton>
        </div>
      </div>
    </>
  );
};

export default PostCommentSection;
