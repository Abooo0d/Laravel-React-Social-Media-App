import React from "react";

const FollowerCard = ({ data }) => {
  return (
    <div className="flex items-center gap-3 duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-md">
      <img
        src={data.image || ""}
        alt="follower-img"
        className="w-[50px] rounded-full"
      />
      <div>
        <h3 className="font-bold text-xl dark:text-gray-200">{data.name}</h3>
      </div>
    </div>
  );
};

export default FollowerCard;
