import { Link } from "@inertiajs/react";
import React from "react";

const FollowerCard = ({ data }) => {
  return (
    <Link
      className={`h-[80px] w-full relative gap-3 duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-[10px] group overflow-hidden group border-[1px] border-solid border-gray-500/50 hover:border-gray-600`}
      href={route("profile.view", data.username)}
    >
      <img
        src={data.cover_url || "/images/default_cover_image.jpg"}
        alt=""
        className="absolute inset-0 max-h-full h-full w-[100%] object-cover z-0 rounded-[10px] group-hover:scale-110 duration-200"
      />
      <div className="z-1 bg-black/30 backdrop-blur-sm w-[100%] h-[100%] py-2 px-4 rounded-[10px] overflow-hidden absolute inset-0 flex flex-col gap-2 justify-between items-start">
        <div className="flex gap-4 w-full justify-start items-center">
          <img
            src={data.avatar_url || "/images/default_avatar_image.png"}
            alt="follower-img"
            className="w-[60px] h-[60px] rounded-full object-cover duration-200"
          />
          <h3 className="font-bold text-md dark:text-gray-200">{data.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default FollowerCard;
