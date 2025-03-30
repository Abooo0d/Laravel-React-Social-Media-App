import { Link } from "@inertiajs/react";
import React from "react";

const NotificationCard = ({ notification }) => {
  return (
    <Link
      className="bg-gray-800 rounded-lg px-4 py-2 flex gap-4 justify-start items-center"
      href={notification.data.link}
    >
      <img
        src={
          notification.data.actor?.avatar || "/images/default_avatar_image.png"
        }
        alt=""
        className="w-[45px] h-[45px] rounded-full"
      />
      <p className="text-gray-400 text-[15px]"> {notification.data.message}</p>
    </Link>
  );
};

export default NotificationCard;
