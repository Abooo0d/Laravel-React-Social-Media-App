import React, { useEffect, useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import UpdatePostForm from "./UpdatePostForm";
import { router } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";
import axiosClient from "@/AxiosClient/AxiosClient";

const CommentMenu = ({
  openMenu,
  setOpenMenu,
  post,
  comment,
  setPost,
  setEditing,
}) => {
  const [, setShowForm] = useState(false);
  const { setSuccessMessage } = useMainContext();
  const onDelete = () => {
    if (window.confirm("Are You Sure To Delete This Comment!?")) {
      axiosClient.delete(route("comment.delete", comment.id)).then(() => {
        setPost((prevPost) => ({
          ...prevPost,
          comments: prevPost.comments.filter((c) => c.id !== comment.id),
        }));
        setSuccessMessage("Comment Deleted Successfully");
        setOpenMenu(false);
      });
    }
  };
  return (
    <div className="relative">
      <button
        className={`w-10 h-10 rounded-md cursor-pointer flex justify-center items-center border-[1px] border-solid  p-1 duration-200 ${
          openMenu
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-900 border-transparent"
        }`}
        onClick={() => {
          openMenu ? setOpenMenu(false) : setOpenMenu(true);
        }}
      >
        <PiDotsThreeOutlineVerticalFill className="w-5 h-5  text-gray-200" />
      </button>
      <div
        className={`absolute border-gray-700 border-[1px] border-solid top-[45px] left-[-100px] bg-gray-800 w-fit  duration-300 cursor-pointer shadow-2xl rounded-md flex flex-col justify-start items-center overflow-hidden ${
          openMenu ? "opacity-100 visible" : " opacity-0 invisible"
        }`}
      >
        <button
          onClick={() => {
            setShowForm(true);
            setOpenMenu(false);
            setEditing(true);
          }}
          className="bg-gray-800 duration-300 hover:bg-gray-700 py-2 px-4 pr-16 text-sm font-medium text-white focus:outline-none text-left w-full"
        >
          Edit
        </button>
        <button
          className="bg-gray-800 duration-300 hover:bg-gray-700 py-2 px-4 pr-16 text-sm font-medium text-white focus:outline-none text-left w-full"
          onClick={() => onDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CommentMenu;
