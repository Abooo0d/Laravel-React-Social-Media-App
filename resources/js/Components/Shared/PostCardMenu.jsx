import React, { useEffect, useState } from "react";
import {
  PiDotsThreeOutlineVerticalFill,
  PiClipboardBold,
} from "react-icons/pi";
import { FaGlobe } from "react-icons/fa6";
import UpdatePostForm from "./UpdatePostForm";
import { Link, router } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";

const PostCardMenu = ({ openMenu, setOpenMenu, post, currentUser }) => {
  const [showForm, setShowForm] = useState(false);
  const { setSuccessMessage } = useMainContext();
  // const showMenu = () => {
  //   return post.user.id === currentUser.id
  //     ? true
  //     : (post.group && post.group.user_id === currentUser.id) ||
  //       (post.group && post.group.role === "admin")
  //     ? true
  //     : false;
  // };
  const showUpdate = () => {
    return post.user.id === currentUser.id ? true : false;
  };
  const showDelete = () => {
    return post.user.id == currentUser.id
      ? true
      : post.group && post.group.user_id == currentUser.id
      ? true
      : false;
  };
  const onDelete = () => {
    if (window.confirm("Are You Sure To Delete This Post")) {
      router.delete(route("post.delete", post), {
        data: post,
        onSuccess: () => {
          setOpenMenu(false);
          setSuccessMessage("Post Deleted Successfully");
        },
      });
    }
  };
  return (
    <>
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
          className={`absolute border-gray-700 border-[1px] border-solid top-[45px] left-[-100px] bg-gray-800 w-[140px] duration-300 cursor-pointer shadow-2xl rounded-md flex flex-col justify-start items-center overflow-hidden ${
            openMenu ? "opacity-100 visible" : " opacity-0 invisible"
          }`}
        >
          <Link
            href={route("post.publicView", post)}
            className="bg-gray-800 duration-300 flex gap-2 justify-start items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
          >
            <FaGlobe />
            View Post
          </Link>
          <button
            onClick={() => {
              // setShowForm(true);
              // setOpenMenu(false);
            }}
            className="bg-gray-800 duration-300 flex gap-2 justify-start items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
          >
            <PiClipboardBold />
            Copy Link
          </button>
          {showUpdate() && (
            <button
              onClick={() => {
                setShowForm(true);
                setOpenMenu(false);
              }}
              className="bg-gray-800 duration-300 flex gap-2 justify-start items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
            >
              Edit Post
            </button>
          )}
          {showDelete() && (
            <button
              className="bg-gray-800 duration-300 flex gap-2 justify-start items-center hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
              onClick={() => onDelete()}
            >
              Delete
            </button>
          )}
        </div>
        <UpdatePostForm
          post={post}
          setOpenMenu={setOpenMenu}
          user={post.user}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </div>
    </>
  );
};

export default PostCardMenu;
