import React, { useState } from "react";
import CommentCard from "./CommentCard";
import SubCommentCard from "./SubCommentCard";
import { SecondaryButton } from "./Buttons";
import { BiSolidSend } from "react-icons/bi";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";
import { useMainContext } from "@/Contexts/MainContext";

const SubCommentsSection = ({ show, comments, post, comment, setComment }) => {
  const { user } = useUserContext();
  const { setSuccessMessage, setErrors } = useMainContext();
  const [newComment, setNewComment] = useState("");
  const createComment = () => {
    axiosClient
      .post(route("post.commentCreate", post), {
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
        setSuccessMessage("Comment Posted Successfully");
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <div className="pl-[50px] w-full max-h-[500px] h-full border-solid border-gray-700/20 border-b-[1px] overflow-auto">
      <div className="relative flex-1 flex justify-center items-center w-full gap-[10px] mb-4">
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
          classes={"px-2 py-1.5 absolute top-[5px] right-[5px]"}
          event={() => createComment()}
        >
          <BiSolidSend className="text-gray-400" />
        </SecondaryButton>
      </div>
      <div
        className={`w-full duration-200 flex gap-2 flex-col justify-start items-start ${
          show ? "h-full visible opacity-100" : "h-[0] invisible opacity-0"
        }`}
      >
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <SubCommentCard
              key={index}
              comment={comment}
              setMainComment={setComment}
            />
            {comments.length > 1 && index < comments.length - 1 && (
              <div className="w-[80%] h-[1px] bg-gray-700/20" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SubCommentsSection;
