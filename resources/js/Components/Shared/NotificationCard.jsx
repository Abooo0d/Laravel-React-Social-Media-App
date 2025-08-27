import { Link } from "@inertiajs/react";
import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import axiosClient from "@/AxiosClient/AxiosClient";
const NotificationCard = ({
  notification,
  setShowNotificationsForm,
  refetch,
}) => {
  const Icon = () => {
    if (notification?.type?.split("|")[0] == "postReaction") return "like";
    switch (notification?.type?.split("|")[1]) {
      case "postActions":
        return "post";
      case "commentActions":
        return "comment";
      case "groupAction":
        return "group";
      case "userAction":
        return "user";
    }
  };
  const Message = () => {
    let me = notification?.type?.split("|");
    if (me[1] == "groupAction") return "Click Here To Visit The Group.";
    else if (me[1] == "userAction") return "click Here To Visit.";
    else {
      if (me[0] == "deletePost") return "Click Here To Visit The Group.";
      else return "Click Here To See The Post.";
    }
  };
  return (
    <Link
      className={` rounded-lg px-4 py-2 flex gap-4 justify-start items-center duration-200
        ${
          notification.read_at
            ? "dark:bg-gray-900/40 bg-gray-200/20"
            : "dark:bg-gray-800 bg-gray-400 dark:hover:bg-gray-800/70 hover:bg-gray-400/50"
        }`}
      href={notification.link}
      onClick={() => {
        setShowNotificationsForm(false);
        axiosClient.post(route("read.notification", notification.id));
        refetch();
      }}
    >
      <div className="relative min-w-[50px] min-h-[50px]">
        <img
          src={
            notification.actor?.avatar_url || "/images/default_avatar_image.png"
          }
          alt="user Image"
          className="w-[50px] h-[50px] object-cover rounded-full "
        />
        <span className="absolute w-[30px] h-[30px] flex justify-center items-center -bottom-[5px] -right-[5px] dark:text-gray-300 text-gray-500 dark:bg-gray-800/80 bg-gray-300 backdrop-blur-lg p-[5px] rounded-full border-[2px] dark:border-gray-700 border-gray-400 border-solid">
          {Icon() == "like" ? (
            <AiFillLike className="w-full h-full" />
          ) : Icon() == "post" ? (
            <FaCommentAlt className="w-full h-full" />
          ) : Icon() == "comment" ? (
            <FaRegCommentDots className="w-full h-full" />
          ) : Icon() == "group" ? (
            <FaUserGroup className="w-full h-full" />
          ) : Icon() == "user" ? (
            <FaUser className="w-full h-full" />
          ) : (
            <></>
          )}
        </span>
      </div>
      <p className="dark:text-gray-300 text-gray-600 text-[14px]">
        {notification.message}
        <br />
        <span className="text-gray-500 text-[13px]">{Message()}</span>
      </p>
    </Link>
  );
};

export default NotificationCard;
