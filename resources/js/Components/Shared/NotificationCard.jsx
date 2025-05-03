import { Link } from "@inertiajs/react";
import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useMainContext } from "@/Contexts/MainContext";
const NotificationCard = ({ notification, setShowNotificationsForm }) => {
  const Icon = () => {
    if (notification.data?.type?.split("|")[0] == "postReaction") return "like";
    switch (notification.data?.type?.split("|")[1]) {
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
    let me = notification.data?.type?.split("|");
    if (me[1] == "groupAction") return "Click Here To Visit The Group.";
    else if (me[1] == "userAction") return "click Here To Visit.";
    else {
      if (me[0] == "deletePost") return "Click Here To Visit The Group.";
      else return "Click Here To See The Post.";
    }
  };
  return (
    <Link
      className="bg-gray-900 rounded-lg px-4 py-2 flex gap-4 justify-start items-center hover:bg-gray-800/70 duration-200"
      href={notification.data.link}
      onClick={() => setShowNotificationsForm(false)}
    >
      <div className="relative min-w-[50px] min-h-[50px]">
        <img
          src={
            notification.data.actor?.avatar ||
            "/images/default_avatar_image.png"
          }
          alt="user Image"
          className="w-[50px] h-[50px] object-cover rounded-full "
        />
        <span className="absolute w-[30px] h-[30px] flex justify-center items-center -bottom-[5px] -right-[5px] text-gray-300 bg-gray-800/80 backdrop-blur-lg p-[5px] rounded-full border-[2px] border-gray-700 border-solid">
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
      <p className="text-gray-300 text-[14px]">
        {notification.data.message}
        <br />

        <span className="text-gray-500 text-[13px]">{Message()}</span>
      </p>
    </Link>
  );
};

export default NotificationCard;
