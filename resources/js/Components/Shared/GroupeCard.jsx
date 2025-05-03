import React from "react";
import { capitalizeFirstLetter } from "@/Hooks/Functions";
import { Link } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";
const GroupeCard = ({ data, setShowGroupContainer }) => {
  return (
    <Link
      className={`min-h-[100px] w-full relative gap-3 duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-[10px] group overflow-hidden `}
      href={route("group.profile", data.slug)}
      onClick={() => setShowGroupContainer}
    >
      <img
        src={data.cover_url || "/images/default_cover_image.jpg"}
        alt="groupCoverImage"
        className="absolute top-0 left-0 right-0 bottom-0 max-h-full h-full w-[100%] object-cover z-0 rounded-[10px]"
      />
      <div className="z-10 bg-black/30 backdrop-blur-sm w-[100%] h-[100%] py-2 px-4 rounded-[10px] overflow-hidden absolute inset-0 flex flex-col gap-2 justify-between items-start">
        <div
          className={`absolute top-[10px] right-[10px] backdrop-blur-md border-[1px] border-solid pl-[6px] px-[5px] py-[2px] rounded-sm text-gray-300 text-[10px] group-hover:opacity-100 opacity-0 duration-200
        ${
          data.status === "approved"
            ? data.role === "admin"
              ? "bg-emerald-600/70 border-emerald-300"
              : "bg-blue-600/70 border-blue-300"
            : "bg-yellow-600/70 border-yellow-300"
        }
        `}
        >
          {data.status === "approved"
            ? capitalizeFirstLetter(data.role)
            : capitalizeFirstLetter(data.status)}
        </div>
        <div className="flex gap-2 w-full justify-start items-center">
          <img
            src={data.thumbnail_url || "/images/default_group_avatar_image.png"}
            alt="groupeThumbnailImage"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <h3 className="font-bold text-md dark:text-gray-200">{data.name}</h3>
        </div>
        <p className=" text-gray-700 text-[14px] dark:text-gray-400 h-[100%] max-h-[40px] overflow-hidden">
          {data.description}
        </p>
      </div>
    </Link>
  );
};

export default GroupeCard;
