// import React, { useEffect, useRef, useState } from "react";
// import { FaPause, FaPlay, FaVolumeHigh } from "react-icons/fa6";
// import { HiMiniXMark } from "react-icons/hi2";
// const CustomAudioPlayer = ({ attachment, controls, remove = () => {} }) => {
//   useEffect(() => {
//     console.log(attachment);
//   }, []);

//   const audioRef = useRef();
//   const [isPlay, setIsPlay] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);

//   const formatTime = (seconds) => {
//     if (!seconds || isNaN(seconds) || seconds === Infinity) return "0:00";
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };
//   const togglePlay = () => {
//     if (isPlay) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlay(!isPlay);
//   };
//   const handelTimeUpdate = () => {
//     setCurrentTime(audioRef.current.currentTime);
//     if (!duration || isNaN(duration)) {
//       setDuration(audioRef.current.duration || 0);
//     }
//   };
//   const handelSeekChange = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setCurrentTime(newTime);
//     audioRef.current.currentTime = newTime;
//   };
//   const handelLoadedMetadata = (e) => {
//     const audio = e.target;
//     setDuration(audio.duration);
//   };
//   useEffect(() => {
//     if (audioRef.current && attachment?.url) {
//       audioRef.current.pause(); // stop previous playback
//       audioRef.current.load(); // force reload
//       setIsPlay(false);
//       setDuration(0);
//       setCurrentTime(0);
//     }
//   }, [attachment?.url]);
//   return (
//     <div className="flex gap-2 h-20 min-w-60 justify-center items-start flex-1 px-2 flex-col relative ">
//       {controls && (
//         <span
//           className="absolute top-1 right-1 w-5 h-5 hover:bg-blue-700 rounded-md flex justify-center items-center bg-gray-300/20 text-gray-300 group-hover:opacity-100 opacity-0 duration-200 z-10"
//           onClick={() => {
//             remove();
//           }}
//         >
//           <HiMiniXMark className="w-5 h-5 text-gray-200" />
//         </span>
//       )}
//       <audio
//         controls
//         ref={audioRef}
//         className="hidden"
//         onTimeUpdate={handelTimeUpdate}
//         onLoadedMetadata={handelLoadedMetadata}
//         src={
//           attachment?.url?.startsWith("blob:")
//             ? attachment.url
//             : `${window.location.origin}${attachment.url}`
//         }
//       />

//       <h3 className="text-gray-300 text-[12px]">
//         {attachment.file
//           ? attachment?.file?.name.substr(0, 25) + "..."
//           : attachment?.name.substr(0, 25) + "..."}
//       </h3>
//       <div className="flex justify-start items-center gap-2 w-full">
//         <button
//           onClick={togglePlay}
//           className="flex relative w-7 h-7 rounded-full bg-blue-700"
//           aria-label={isPlay ? "Pause" : "Play"}
//         >
//           <FaPause
//             className={`absolute inset-0 text-lg text-gray-300 w-full h-full flex justify-center items-center p-[5px] duration-200 ${
//               isPlay ? "opacity-100 visible" : "opacity-0 invisible"
//             }`}
//           />
//           <FaPlay
//             className={`absolute inset-0 text-lg text-gray-300 w-full h-full flex justify-center items-center p-[5px] duration-200 ${
//               !isPlay ? "ml-[2px] opacity-100 visible" : "opacity-0 invisible"
//             }`}
//           />
//         </button>
//         <input
//           type="range"
//           min="0"
//           max={duration || 100}
//           step="0.01"
//           value={currentTime}
//           onChange={handelSeekChange}
//           className="flex-1 custom-range"
//           name="duration"
//           style={{
//             background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
//               (currentTime / duration) * 100
//             }%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`,
//           }}
//         />
//         <span className="text-xs text-gray-400 min-w-[40px] text-right">
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default CustomAudioPlayer;

import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";

const CustomAudioPlayer = ({ attachment, controls, remove = () => {} }) => {
  const audioRef = useRef();
  const [isPlay, setIsPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds) || seconds === Infinity) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlay) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlay(!isPlay);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration || 0);
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (attachment?.url) {
      audio.pause();
      audio.load();
      setIsPlay(false);
      setDuration(0);
      setCurrentTime(0);
    }
  }, [attachment?.url]);

  const audioSrc = attachment?.url?.startsWith("blob:")
    ? attachment.url
    : `${window.location.origin}${attachment.url}`;

  return (
    <div className="flex gap-2 h-20 min-w-60 justify-center items-start flex-1 px-2 flex-col relative">
      {controls && (
        <span
          className="absolute top-1 right-1 w-5 h-5 hover:bg-blue-700 rounded-md flex justify-center items-center bg-gray-300/20 text-gray-300 group-hover:opacity-100 opacity-0 duration-200 z-10"
          onClick={() => remove()}
        >
          <HiMiniXMark className="w-5 h-5 text-gray-200" />
        </span>
      )}

      <audio
        ref={audioRef}
        className="hidden"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        src={audioSrc}
        preload="metadata"
      />

      <h3 className="text-gray-300 text-[12px]">
        {attachment.file
          ? attachment.file.name?.substring(0, 25) + "..."
          : attachment.name?.substring(0, 25) + "..."}
      </h3>

      <div className="flex justify-start items-center gap-2 w-full">
        <button
          onClick={togglePlay}
          className="flex relative w-7 h-7 rounded-full bg-blue-700"
          aria-label={isPlay ? "Pause" : "Play"}
        >
          <FaPause
            className={`absolute inset-0 text-lg text-gray-300 w-full h-full p-[5px] duration-200 ${
              isPlay ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          />
          <FaPlay
            className={`absolute inset-0 text-lg text-gray-300 w-full h-full p-[5px] duration-200 ${
              !isPlay ? "ml-[2px] opacity-100 visible" : "opacity-0 invisible"
            }`}
          />
        </button>

        <input
          type="range"
          min="0"
          max={duration || 100}
          step="0.01"
          value={currentTime}
          onChange={handleSeekChange}
          className="flex-1 custom-range"
          name="duration"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
              (currentTime / duration) * 100
            }%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`,
          }}
        />

        <span className="text-xs text-gray-400 min-w-[40px] text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
