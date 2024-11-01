import React, { useEffect, useState } from "react";
import { SecondaryButton } from "./Buttons";
import { BiSolidSend } from "react-icons/bi";
import { useUserContext } from "@/Contexts/UserContext";
import axiosClient from "@/AxiosClient/AxiosClient";
import { FaRegCommentDots } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
const PostCommentSection = ({ show, post }) => {
  const { user } = useUserContext();
  const [comment, setComment] = useState("");
  const [postData, setPostData] = useState(post);
  const createComment = () => {
    axiosClient
      .post(route("post.comment.create", post), { comment: comment })
      .then((data) => {
        console.log(data.data[0]);
        setPostData((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, data.data[0]],
        }));
      });
  };
  console.log(post);

  return (
    <>
      <div
        className={`flex justify-start items-start flex-col gap-4 max-h-[300px] overflow-auto ${
          show ? "visible opacity-100 h-full" : "invisible opacity-0 h-[0px]"
        }`}
      >
        {postData.comments.map((comment, index) => (
          <div
            className="flex justify-start items-start flex-col gap-2 w-full cursor-default p-1j"
            key={index}
          >
            <div className="flex gap-4 justify-start items-start w-full">
              <img
                src={comment.user.avatar_url}
                alt="user_image"
                className=" rounded-full w-[40px] h-[40px] "
              />
              <div className="bg-gray-700/30 text-gray-300 w-fit max-w-[80%] rounded-md p-2">
                {comment.comment}
              </div>
            </div>
            <div className="flex justify-start items-center w-full gap-[30px]">
              <div className="text-gray-700 pl-[50px] text-[12px]">
                {comment.updated_at}
              </div>
              <button className="duration-200 w-[30px] h-[30px] flex justify-center items-center rounded-md hover:bg-gray-700/40 text-gray-300">
                <AiOutlineLike />
              </button>
              <button className="duration-200 w-[30px] h-[30px] flex justify-center items-center rounded-md hover:bg-gray-700/40 text-gray-300">
                <FaRegCommentDots />
              </button>
            </div>
          </div>
        ))}
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
