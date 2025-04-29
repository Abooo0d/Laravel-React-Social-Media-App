import React, { useRef, useState } from "react";
import { FaPause, FaPlay, FaVolumeHigh } from "react-icons/fa6";
const CustomAudioPlayer = ({ attachment }) => {
  const audioRef = useRef();
  const [isPlay, setIsPlay] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlay) {
      audio.pause();
    } else {
      setDuration(audio.duration);
      audio.play();
    }
    setIsPlay(!isPlay);
  };
  const handelVolumeChange = (e) => {
    const volume2 = e.target.value;
    audioRef.current.volume = volume2;
    setVolume(volume2);
  };
  const handelTimeUpdate = (e) => {
    const audio = audioRef.current;
    setDuration(audio.duration);
    setCurrentTime(e.target.currentTime);
  };
  const handelLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };
  const handelSeekChange = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };
  return (
    <div className="flex gap-2 h-20 min-w-60 justify-center items-start flex-1 px-2 flex-col">
      <audio
        ref={audioRef}
        src={attachment.url}
        controls
        onTimeUpdate={handelTimeUpdate}
        onLoadedMetadata={handelLoadedMetadata}
        className="hidden"
      />
      <h3 className="text-gray-300 text-[12px]">
        {attachment.file.name.substr(0, 25) + "..."}
      </h3>
      <div className="flex justify-start items-center gap-2 w-full">
        <button
          onClick={togglePlay}
          className="flex relative w-7 h-7 rounded-full bg-blue-700"
        >
          <FaPause
            className={`absolute inset-0 text-lg text-gray-300 w-full h-full flex justify-center items-center p-[5px] duration-200 ${
              isPlay ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          />
          <FaPlay
            className={`absolute inset-0 text-lg text-gray-300 w-full h-full flex justify-center items-center p-[5px] duration-200 ${
              !isPlay ? "ml-[2px] opacity-100 visible" : "opacity-0 invisible"
            }`}
          />
        </button>
        <input
          type="range"
          name="duration"
          className="flex-1 custom-range"
          min="0"
          max={duration}
          step="0.01"
          value={currentTime}
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
              (currentTime / duration) * 100
            }%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`,
          }}
          onChange={handelSeekChange}
        />
      </div>
      {/* <div className="flex justify-start items-center gap-2 w-full">
        <button
          onClick={() => setShowVolume(!showVolume)}
          className="flex relative w-7 h-7 rounded-full bg-blue-700"
        >
          <FaVolumeHigh
            className={`absolute inset-0 text-lg text-gray-300 w-full h-full flex justify-center items-center p-1 duration-200 `}
          />
        </button>
        {showVolume && (
          <input
            type="range"
            name="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handelVolumeChange}
          />
        )}
      </div> */}
    </div>
  );
};

export default CustomAudioPlayer;
