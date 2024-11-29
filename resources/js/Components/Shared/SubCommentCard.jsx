import React, { useState } from "react";
import CommentMenu from "./CommentMenu";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import DOMPurify from "dompurify";
import axiosClient from "@/AxiosClient/AxiosClient";

const SubCommentCard = ({ comment }) => {
  const [editing, setEditing] = useState(false);
  const [currentComment, setCurrentComment] = useState(comment);
  const sendCommentReaction = () => {
    axiosClient
      .post(route("comment.reaction", comment.id), {
        reaction: "like",
      })
      .then(({ data }) => {
        setCurrentComment((prevComment) => ({
          ...prevComment,
          user_has_reactions: data.user_has_reactions,
          num_of_reactions: data.num_of_reactions,
        }));
      });
  };
  return (
    <div className=" flex flex-1 w-full items-start justify-start flex-col relative">
      <div className="absolute top-[calc(100%-37px)] left-[-43px] w-[30px] h-[30px] bg-transparent border-l-solid border-l-[4px] border-l-[#1d2533] border-b-solid border-b-[4px] border-b-[#1d2533] rounded-bl-full" />
      <div className="absolute top-[calc(100%-10px)] left-[-13px] h-[3px] w-[calc(100%-50px)] bg-[#1d2533]" />
      <div className="flex gap-4 justify-center items-center">
        <img
          src={currentComment.user.avatar_url}
          alt="user_image"
          className=" rounded-full w-[40px] h-[40px] "
        />
        <div className="flex flex-col  justify-start items-start gap-1">
          <h3 className="text-gray-400">{currentComment.user.name}</h3>
          <div className="text-gray-700 text-[12px]">
            {currentComment.updated_at}
          </div>
        </div>
      </div>
      {/* {comment.user.id === user.id && (
        <CommentMenu
          openMenu={showMenu}
          setOpenMenu={setShowMenu}
          post={post}
          comment={comment}
          // setPost={setPost}
          // setEditing={setEditing}
        />
      )} */}
      <div className="w-full flex flex-col gap-2 p-2">
        <div
          className={`bg-gray-700/30 text-gray-300 w-fit max-w-[80%] rounded-md rounded-tl-none p-2 ml-8 duration-200 ${
            editing ? "h-0 opacity-0" : " h-full opacity-100"
          }`}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(currentComment.comment),
          }}
        />

        <div
          className={`flex justify-start items-center w-full gap-[30px] pl-[50px] duration-200  ${
            editing ? "invisible opacity-0 h-0" : "visible opacity-100 h-full"
          }`}
        >
          <button
            className="duration-200 relative w-[45px] h-[30px] flex justify-start pl-2 items-center rounded-md hover:bg-gray-700/40 text-gray-300 gap-[4px] px-1"
            onClick={() => sendCommentReaction()}
          >
            {currentComment.num_of_reactions}{" "}
            <AiFillLike
              className={`w-[18px] h-[18px] duration-200 absolute top-[50%] left-[22px] translate-y-[-50%] ${
                currentComment.user_has_reactions
                  ? "opacity-100 scale-100 visible"
                  : "opacity-50 scale-50 invisible"
              }`}
            />
            <AiOutlineLike
              className={`w-[18px] h-[18px] duration-200 absolute top-[50%] left-[22px] translate-y-[-50%] ${
                currentComment.user_has_reactions
                  ? "opacity-50 scale-50 invisible"
                  : "opacity-100 scale-100 visible"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubCommentCard;
