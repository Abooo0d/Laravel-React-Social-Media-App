import React from "react";
import { BsStars } from "react-icons/bs";

const AISpinner = () => {
  return (
    <div className="w-full flex justify-start items-center pl-8 gap-4 z-10 ">
      <BsStars className="w-[25px] h-[25px] text-gray-400 z-10" />
      <span className="flex size-3 m-4 relative">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
      </span>
    </div>
  );
};

export default AISpinner;
