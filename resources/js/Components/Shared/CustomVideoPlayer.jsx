import React, { useRef, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { FaPause, FaPlay } from "react-icons/fa6";

const CustomVideoPlayer = ({ attachment, controls, remove }) => {
  const videoRef = useRef();
  const [isPlay, setIspLay] = useState(false);
  const handelPlay = () => {
    const video = videoRef.current;
    if (isPlay) {
      video.pause();
      setIspLay(false);
    } else {
      video.play();
      setIspLay(true);
    }
  };
  return (
    <div className="min-w-full min-h-full relative">
      <video
        src={attachment?.url}
        className="object-cover w-full h-60"
        ref={videoRef}
      />
      <div
        className="inset-0 absolute z-10 bg-transparent"
        onClick={() => {
          handelPlay();
        }}
      >
        {controls && (
          <span
            className="absolute top-1 right-1 w-5 h-5 hover:bg-blue-700  rounded-md flex justify-center items-center bg-gray-300/20 text-gray-300 group-hover:opacity-100 opacity-0 duration-200 z-10"
            onClick={() => {
              remove();
            }}
          >
            <HiMiniXMark className="w-5 h-5 text-gray-200" />
          </span>
        )}
        <FaPause
          className={`absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] text-lg text-gray-300 w-10 h-10 flex justify-center items-center p-[5px] duration-200 ${
            isPlay ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />
        <FaPlay
          className={`absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-lg text-gray-300 w-10 h-10 flex justify-center items-center p-[5px] duration-200 ${
            !isPlay ? "ml-[2px] opacity-100 visible" : "opacity-0 invisible"
          }`}
        />
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
