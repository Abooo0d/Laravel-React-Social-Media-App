import React from "react";
import { capitalizeFirstLetter } from "@/Hooks/Functions";
import { Link } from "@inertiajs/react";
const GroupeCard = ({ data }) => {
  return (
    <Link
      className="flex items-center relative gap-3 duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-md rounded-tr-none group"
      href={route("group.profile", data.slug)}
    >
      {/* <

        className="flex items-center "
      > */}
      <div
        className={`absolute top-[5px] right-[5px] backdrop-blur-md border-[1px] border-solid pl-[6px] px-[5px] py-[2px] rounded-sm text-gray-300 text-[10px] group-hover:opacity-100 opacity-0 duration-200
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
      <img
        src={data.thumbnail_url || ""}
        alt="groupe-img"
        className="w-[50px] rounded-full"
      />
      <div>
        <h3 className="font-bold text-md dark:text-gray-200">{data.name}</h3>
        <p className=" text-gray-700 text-[15px] dark:text-gray-400 h-[40px] max-h-[40px] overflow-hidden">
          {data.description}
        </p>
      </div>
      {/* </> */}
    </Link>
  );
};

export default GroupeCard;
