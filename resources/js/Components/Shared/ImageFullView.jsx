import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { ImDownload3 } from "react-icons/im";
import { GoDownload } from "react-icons/go";
import { RiArrowGoBackFill } from "react-icons/ri";
const ImageFullView = ({ image, show, setShowImage }) => {
  return (
    <div
      className={`fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-center justify-center p-4 bg-gray-900/30 backdrop-blur-sm duration-200 ${
        show ? `visible opacity-100` : `invisible opacity-0 scale-[95%]`
      }`}
    >
      <div className="animate-scaleUp max-h-[700px] rounded-lg relative flex justify-center items-center">
        <div className="absolute top-[-70px] right-[20px] w-20 h-20 flex justify-center items-center gap-2">
          <button
            className="cursor-pointer relative inline-flex items-center gap-2 rounded-md bg-gray-800/50 hover:bg-gray-800 duration-200 py-1.5 px-3 border-[1px] border-gray-700 border-solid text-sm/6 font-semibold text-white  focus:outline-none "
            onClick={() => setShowImage(false)}
          >
            <RiArrowGoBackFill className="w-5 h-5 text-gray-200" />
          </button>
          <button
            className="cursor-pointer relative inline-flex items-center gap-2 rounded-md bg-gray-800/50 hover:bg-gray-800 duration-200 py-1.5 px-3 border-[1px] border-gray-700 border-solid text-sm/6 font-semibold text-white  focus:outline-none "
            onClick={() => setShowImage(false)}
          >
            <GoDownload className="w-5 h-5 text-gray-200" />
          </button>
        </div>
        <img
          src={image}
          alt="Post Image"
          className="max-w-[90%] max-h-[90%] object-contain rounded-[10px]"
        />
      </div>
    </div>
  );
};

export default ImageFullView;
