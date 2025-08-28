import React, { useState } from "react";
import { SecondaryButton } from "./Buttons";
import { BiSolidSend } from "react-icons/bi";
import { useUserContext } from "@/Contexts/UserContext";
import axiosClient from "@/AxiosClient/AxiosClient";
import CommentCard from "./CommentCard";
import { useMainContext } from "@/Contexts/MainContext";
const PostCommentSection = ({ show, post, setPost, currentUser }) => {
  const { user } = useUserContext();
  const [comment, setComment] = useState("");
  const { setSuccessMessage, setErrors } = useMainContext();
  const createComment = () => {
    axiosClient
      .post(route("post.commentCreate", post), {
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
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <>
      <div
        className={`flex justify-start items-center flex-col gap-4 max-h-[500px] overflow-auto dark:border-gray-800 border-gray-300 border-t-[2px] border-solid py-2 ${
          show ? "visible opacity-100 h-fit" : "invisible opacity-0 h-0"
        }`}
      >
        {post.comments.length > 0 ? (
          post.comments.map((comment, index) => {
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
                {post.comments.length > 1 &&
                  index < post.comments.length - 1 && (
                    <div className="w-[80%] h-[1px] bg-gray-700/20" />
                  )}
              </div>
            );
          })
        ) : (
          <div className="w-full dark:text-gray-600 text-gray-400 text-center pt-4">
            No Comments On This Post
          </div>
        )}
      </div>
      <div
        className={`flex justify-between items-start gap-2 pt-2 w-full duration-200 text-gray-400 border-t-[1px] border-solid dark:border-gray-700 border-gray-300 mt-0 overflow-hidden  ${
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
            className="flex-1 px-2 py-1 bg-gray-200 hover:bg-gray-300/40 text-gray-700 placeholder:text-gray-500 border-gray-300 hover:border-gray-300 focus:border-gray-300 dark:bg-gray-700/50 dark:hover:bg-gray-800 dark:hover:border-gray-600 dark:text-gray-400 dark:placeholder:text-gray-600 resize-none overflow-scroll h-[80px] dark:border-gray-800 rounded-md outline-none dark:focus:border-gray-600 ring-0 focus:ring-0 duration-200 cursor-pointer"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <SecondaryButton
            classes={
              "px-2 py-1.5 absolute top-[5px] right-[5px] bg-transparent border-none"
            }
            event={() => createComment()}
          >
            <BiSolidSend className="dark:text-gray-400 text-gray-600" />
          </SecondaryButton>
        </div>
      </div>
    </>
  );
};

export default PostCommentSection;
