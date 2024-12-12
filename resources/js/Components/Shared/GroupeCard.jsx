import React from "react";

const GroupeCard = ({ data }) => {
  return (
    <div className="flex items-center relative gap-3 duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-800 py-2 px-4 rounded-md rounded-tr-none">
      <div className="absolute top-[5px] right-0 bg-gray-900 backdrop-blur-md border-[1px] border-solid border-gray-600 border-r-0 pl-[6px] pr-[10px] py-[2px] rounded-l-md text-gray-300 text-[10px]">
        {data.status === "approved" ? data.role : data.status}
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
    </div>
  );
};

export default GroupeCard;
