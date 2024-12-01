import React, { useState } from "react";
import CommentCard from "./CommentCard";
import SubCommentCard from "./SubCommentCard";
import { SecondaryButton } from "./Buttons";
import { BiSolidSend } from "react-icons/bi";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";

const SubCommentsSection = ({ show, comments, post, comment, setComment }) => {
  const { user } = useUserContext();
  const [newComment, setNewComment] = useState("");
  const createComment = () => {
    axiosClient
      .post(route("post.comment.create", post), {
        comment: newComment,
        parent_id: comment.id,
      })
      .then((data) => {
        setComment((prevComment) => ({
          ...prevComment,
          comments: [...prevComment.comments, data.data[0]],
          num_of_comments: prevComment.num_of_comments + 1,
        }));
        setNewComment("");
        // setSuccessMessage("Comment Posted Successfully");
      });
  };
  return (
    <>
      <div className="relative flex-1 flex justify-center items-center w-full pl-[50px] gap-[10px]">
        <img
          src={user.avatar_url}
          alt="Avatar Image"
          className="w-[40px] h-[40px] rounded-full"
        />
        <textarea
          placeholder="Your comment"
          className="flex-1 px-2 py-1 bg-gray-700/50 text-gray-400 placeholder:text-gray-600 resize-none overflow-scroll h-[35px] border-gray-800 rounded-md outline-none focus:border-gray-600 ring-0 focus:ring-0 duration-200 cursor-pointer"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
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
      <div
        className={`w-full duration-200 pl-[80px] flex gap-2 flex-col justify-start items-start ${
          show ? "h-full visible opacity-100" : "h-[0] invisible opacity-0"
        }`}
      >
        {comments.map((comment, index) => (
          <SubCommentCard
            key={index}
            comment={comment}
            setMainComment={setComment}
          />
        ))}
      </div>
    </>
  );
};

export default SubCommentsSection;
