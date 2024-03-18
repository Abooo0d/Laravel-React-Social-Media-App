import React from "react";

const GroupeCard = ({ data }) => {
  return (
    <div className="flex items-center gap-3 duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-md">
      <img
        src={data.image || ""}
        alt="groupe-img"
        className="w-[50px] rounded-full"
      />
      <div>
        <h3 className="font-bold text-xl dark:text-gray-200">{data.name}</h3>
        <p className=" text-gray-700 text-sm dark:text-gray-400">{data.info}</p>
      </div>
    </div>
  );
};

export default GroupeCard;
