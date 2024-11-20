import React, { useEffect, useState } from "react";
import CommentMenu from "./CommentMenu";
import DOMPurify from "dompurify";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useUserContext } from "@/Contexts/UserContext";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";

const CommentCard = ({ currentComment, post, setPost }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(currentComment);
  const [editingComment, setEditingComment] = useState({
    ...currentComment,
    comment: currentComment.comment.replace(/<br\s*\/?>/gi, "\n"),
  });
  const { user } = useUserContext();
  const { setSuccessMessage } = useMainContext();
  const UpdateComment = () => {
    axiosClient
      .put(route("comment.edit", comment.id), {
        comment: editingComment.comment,
      })
      .then((data) => {
        setShowMenu(false);
        setEditing(false);
        setComment(data.data);
        setPost((prevPost) => ({
          ...prevPost,
          comments: prevPost.comments.map((com, index) => {
            if (com.id !== data.data.id) return com;
            else return data.data;
          }),
        }));
        setEditingComment(data.data);
        setSuccessMessage("Comment Updated Successfully");
      });
  };
  const sendCommentReaction = () => {
    axiosClient
      .post(route("comment.reaction", comment.id), {
        reaction: "like",
      })
      .then(({ data }) => {
        setComment((prevComment) => ({
          ...prevComment,
          user_has_reactions: data.user_has_reactions,
          num_of_reactions: data.num_of_reactions,
        }));
      });
  };

  return (
    <div className="flex justify-start items-start flex-col gap-2 w-full cursor-default duration-200">
      <div className="flex gap-4 justify-start items-start w-full flex-col">
        <div className="flex justify-between w-full px-4">
          <div className="flex gap-4 justify-center items-center">
            <img
              src={comment.user.avatar_url}
              alt="user_image"
              className=" rounded-full w-[40px] h-[40px] "
            />
            <div className="flex flex-col  justify-start items-start gap-1">
              <h3 className="text-gray-400">{comment.user.name}</h3>
              <div className="text-gray-700 text-[12px]">
                {comment.updated_at}
              </div>
            </div>
          </div>
          {comment.user.id === user.id && (
            <CommentMenu
              openMenu={showMenu}
              setOpenMenu={setShowMenu}
              post={post}
              comment={comment}
              setPost={setPost}
              setEditing={setEditing}
            />
          )}
        </div>
        {!editing ? (
          <div className="w-full flex flex-col gap-2 p-2">
            <div
              className={`bg-gray-700/30 text-gray-300 w-fit max-w-[80%] rounded-md p-2 ml-8 duration-200 ${
                editing ? "h-0 opacity-0" : " h-full opacity-100"
              }`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(comment.comment),
              }}
            />

            <div
              className={`flex justify-start items-center w-full gap-[30px] pl-[50px] duration-200  ${
                editing
                  ? "invisible opacity-0 h-0"
                  : "visible opacity-100 h-full"
              }`}
            >
              <button
                className="duration-200 relative w-[45px] h-[30px] flex justify-start pl-2 items-center rounded-md hover:bg-gray-700/40 text-gray-300 gap-[4px] px-1"
                onClick={() => sendCommentReaction()}
              >
                {comment.num_of_reactions}{" "}
                <AiFillLike
                  className={`w-[18px] h-[18px] duration-200 absolute top-[50%] left-[22px] translate-y-[-50%] ${
                    comment.user_has_reactions
                      ? "opacity-100 scale-100 visible"
                      : "opacity-50 scale-50 invisible"
                  }`}
                />
                <AiOutlineLike
                  className={`w-[18px] h-[18px] duration-200 absolute top-[50%] left-[22px] translate-y-[-50%] ${
                    comment.user_has_reactions
                      ? "opacity-50 scale-50 invisible"
                      : "opacity-100 scale-100 visible"
                  }`}
                />
              </button>
              <button className="duration-200 w-[40px] h-[30px] flex justify-center items-center rounded-md hover:bg-gray-700/40 text-gray-300 gap-[4px]">
                0 <FaRegCommentDots className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-col gap-[2px] justify-end items-end w-full duration-200 px-4 ${
              editing ? "h-full opacity-100" : "h-0 opacity-0"
            }`}
          >
            <textarea
              placeholder="Your comment"
              className="flex-1 px-2 py-1 bg-gray-700/50 text-gray-400 placeholder:text-gray-600 resize-none overflow-scroll h-[80px] border-gray-800 rounded-md outline-none focus:border-gray-600 ring-0 focus:ring-0 duration-200 cursor-pointer w-full"
              value={editingComment.comment}
              onChange={(e) =>
                setEditingComment((prevCOmment) => ({
                  ...prevCOmment,
                  comment: e.target.value,
                }))
              }
            ></textarea>
            <div className="mt-2 flex gap-[4px]">
              <SecondaryButton
                children="Cancel"
                classes="px-2 py-1 text-sm"
                event={() => setEditing(false)}
              />
              <PrimaryButton
                children="Post"
                classes="px-2 py-1 text-sm"
                event={() => {
                  UpdateComment();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
