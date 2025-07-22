import React, { useState } from "react";
import CommentMenu from "./CommentMenu";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import DOMPurify from "dompurify";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";
import SubCommentCardMenu from "./SubCommentCardMenu";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { useMainContext } from "@/Contexts/MainContext";
const SubCommentCard = ({ comment, setMainComment }) => {
  const [editing, setEditing] = useState(false);
  const [currentComment, setCurrentComment] = useState(comment);
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUserContext();
  const { setSuccessMessage, setErrors } = useMainContext();
  const [editingComment, setEditingComment] = useState({
    ...currentComment,
    comment: currentComment.comment.replace(/<br\s*\/?>/gi, "\n"),
  });
  const UpdateComment = () => {
    axiosClient
      .put(route("comment.edit", currentComment.id), {
        comment: editingComment.comment,
      })
      .then((data) => {
        setShowMenu(false);
        setEditing(false);
        setCurrentComment(data.data);
        setEditingComment(data.data);
        setSuccessMessage("Comment Updated Successfully");
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
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
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <div className=" flex  w-full items-start justify-start flex-col relative h-fit max-h-[250px]">
      <div className="flex gap-4 justify-between items-center w-full">
        <div className="flex justify-start items-center gap-[10px] flex-1">
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
        {currentComment.user.id === user.id && (
          <SubCommentCardMenu
            openMenu={showMenu}
            setOpenMenu={setShowMenu}
            comment={currentComment}
            setComment={setMainComment}
            setEditing={setEditing}
          />
        )}
      </div>
      {!editing ? (
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
            className={`flex justify-start items-center w-full gap-[30px] pl-[30px] duration-200  ${
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
      ) : (
        <div
          className={`flex flex-col gap-[2px] justify-start items-end w-full duration-200 px-4 py-2 h-[150px] ${
            editing ? "h-full opacity-100" : "h-0 opacity-0"
          }`}
        >
          <textarea
            placeholder="Your comment"
            className="flex-1 px-2 py-1 bg-gray-700/50 text-gray-400 placeholder:text-gray-600 resize-none overflow-scroll max-h-[80px] border-gray-800 rounded-md outline-none focus:border-gray-600 ring-0 focus:ring-0 duration-200 cursor-pointer w-full"
            value={editingComment.comment}
            onChange={(e) =>
              setEditingComment((prevComment) => ({
                ...prevComment,
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
  );
};

export default SubCommentCard;
