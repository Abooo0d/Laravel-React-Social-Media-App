import React, { useState } from "react";
import CommentMenu from "./CommentMenu";
import DOMPurify from "dompurify";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";

const CommentCard = ({ comment, post, setPost }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex justify-start items-start flex-col gap-2 w-full cursor-default p-1j">
      <div className="flex gap-4 justify-start items-start w-full flex-col">
        <div className="flex justify-between w-full px-4">
          <div className="flex gap-4 justify-center items-center pt-2">
            <img
              src={comment.user.avatar_url}
              alt="user_image"
              className=" rounded-full w-[40px] h-[40px] "
            />
            <div className="flex flex-col  justify-start items-start gap-1">
              <h3 className="text-gray-400">{post.user.name}</h3>
              <div className="text-gray-700 text-[12px]">
                {comment.updated_at}
              </div>
            </div>
          </div>
          <CommentMenu
            openMenu={showMenu}
            setOpenMenu={setShowMenu}
            post={post}
            comment={comment}
            setPost={setPost}
          />
        </div>
        <div
          className="bg-gray-700/30 text-gray-300 w-fit max-w-[80%] rounded-md p-2 ml-8"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(comment.comment),
          }}
        />
      </div>
      <div className="flex justify-start items-center w-full gap-[30px] pl-[50px]">
        <button className="duration-200 w-[30px] h-[30px] flex justify-center items-center rounded-md hover:bg-gray-700/40 text-gray-300">
          <AiOutlineLike />
        </button>
        <button className="duration-200 w-[30px] h-[30px] flex justify-center items-center rounded-md hover:bg-gray-700/40 text-gray-300">
          <FaRegCommentDots />
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
