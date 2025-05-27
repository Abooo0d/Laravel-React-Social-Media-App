import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import CustomAudioPlayer from "./CustomAudioPlayer";
import CustomVideoPlayer from "./CustomVideoPlayer";
import { FaFile } from "react-icons/fa";
const ChatInfoAttachments = ({ attachments }) => {
  const [showAttachments, setShowAttachments] = useState(false);
  const [formToShow, setFormToShow] = useState("image");
  const [audios, setAudios] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    let audioFiles = [];
    let imageFiles = [];
    let videosFiles = [];
    let fileFiles = [];
    attachments?.map((attachment) => {
      let type = attachment.mime.split("/")[0];
      switch (type) {
        case "image":
          imageFiles.push(attachment);
          break;
        case "audio":
          audioFiles.push(attachment);
          break;
        case "video":
          videosFiles.push(attachment);
          break;
        default:
          fileFiles.push(attachment);
          break;
      }
    });
    setImages(imageFiles);
    setAudios(audioFiles);
    setVideos(videosFiles);
    setFiles(fileFiles);
  }, [attachments]);

  useEffect(() => {
    if (showAttachments) {
      setFormToShow("image");
    }
  }, [showAttachments]);

  return (
    <div className="flex flex-col justify-start items-center w-full text-gray-500 px-4 border-t-solid border-b-0 border-[1px] border-gray-500/50 border-x-0cursor-pointer bg-gray-800/50">
      <div
        className="flex justify-between items-center w-full py-4"
        onClick={() => {
          setShowAttachments((prev) => !prev);
        }}
      >
        <h2>Attachments:</h2>
        <div className="flex justify-center items-center gap-2">
          <FaAngleRight
            className={`w-6 h-6 duration-200 ${
              showAttachments ? "-rotate-90" : "rotate-90"
            }`}
          />
          <h2>{attachments?.length > 0 ? attachments.length : 0}</h2>
        </div>
      </div>
      <div
        className={`w-full px-4 flex flex-col justify-start items-center gap-2 duration-200 overflow-hidden max-h-[300px] ${
          showAttachments ? "h-[300px] opacity-100 py-2 " : " h-0 opacity-0 "
        }`}
      >
        <div className="flex justify-center items-center gap-4 w-full ">
          <span
            className={`w-fit px-2 py-1 rounded-md hover:bg-gray-700 duration-200 border-solid border-[1px] border-gray-500/50 cursor-pointer text-gray-300 ${
              formToShow == "image" ? "bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => {
              setFormToShow("image");
            }}
          >
            Images {images.length}
          </span>
          <span
            className={`w-fit px-2 py-1 rounded-md hover:bg-gray-700 duration-200 border-solid border-[1px] border-gray-500/50 cursor-pointer text-gray-300 ${
              formToShow == "audio" ? "bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => {
              setFormToShow("audio");
            }}
          >
            Audios {audios.length}
          </span>
          <span
            className={`w-fit px-2 py-1 rounded-md hover:bg-gray-700 duration-200 border-solid border-[1px] border-gray-500/50 cursor-pointer text-gray-300 ${
              formToShow == "video" ? "bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => {
              setFormToShow("video");
            }}
          >
            Videos {videos.length}
          </span>
          <span
            className={`w-fit px-2 py-1 rounded-md hover:bg-gray-700 duration-200 border-solid border-[1px] border-gray-500/50 cursor-pointer text-gray-300 ${
              formToShow == "file" ? "bg-gray-700" : "bg-gray-800"
            }`}
            onClick={() => {
              setFormToShow("file");
            }}
          >
            Files {files.length}
          </span>
        </div>
        <div className="w-full h-fit relative">
          <div
            className={`absolute top-0 left-0 duration-200 w-full overflow-scroll flex justify-center items-start gap-2 flex-wrap ${
              formToShow == "image" ? "h-[240px] opacity-100" : "h-0 opacity-0"
            }`}
          >
            {images.length > 0 ? (
              images.map((image, index) => (
                <img
                  src={image.url}
                  key={index}
                  alt="attachment"
                  className="max-w-[90px] w-full h-[90px] object-cover rounded-md hover:scale-105 duration-200"
                />
              ))
            ) : (
              <div className="h-[40px] w-[50%] rounded-md text-gray-300 bg-gray-700 border-solid border-[1px] border-gray-500/50 flex gap-2 justify-center items-center">
                There Is No Items
              </div>
            )}
          </div>
          <div
            className={`absolute top-0 left-0 duration-200 w-full overflow-scroll flex flex-wrap justify-center items-start gap-2 ${
              formToShow == "audio" ? "h-[240px] opacity-100" : "h-0 opacity-0"
            }`}
          >
            {audios.length > 0 ? (
              audios.map((audio, index) => (
                <div className="flex justify-start items-center w-full h-[60px] bg-gray-700/50 rounded-md px-2 gap-2">
                  <CustomAudioPlayer attachment={audio} controls={false} />
                </div>
              ))
            ) : (
              <div className="h-[40px] w-[50%] rounded-md text-gray-300 bg-gray-700 border-solid border-[1px] border-gray-500/50 flex gap-2 justify-center items-center">
                There Is No Items
              </div>
            )}
          </div>
          <div
            className={`absolute top-0 left-0 duration-200 w-full overflow-scroll flex flex-wrap justify-center items-startgap-2 ${
              formToShow == "video" ? "h-[240px] opacity-100" : "h-0 opacity-0"
            }`}
          >
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <video
                  src={video.url}
                  key={index}
                  className="w-[90px] h-[90px]"
                />
              ))
            ) : (
              <div className="h-[40px] w-[50%] rounded-md text-gray-300 bg-gray-700 border-solid border-[1px] border-gray-500/50 flex gap-2 justify-center items-center">
                There Is No Items
              </div>
            )}
          </div>
          <div
            className={`absolute top-0 left-0 duration-200 w-full overflow-scroll flex flex-wrap justify-center items-start gap-2 ${
              formToShow == "file" ? "h-[240px] opacity-100" : "h-0 opacity-0"
            }`}
          >
            {files.length > 0 ? (
              files.map((file, index) => (
                <div
                  className="h-[60px] flex-1 rounded-md bg-gray-700 border-solid border-[1px] border-gray-500/50 flex gap-2 justify-start items-startpx-4"
                  key={index}
                >
                  <FaFile className="w-10 h-10 text-gray-400" />
                  <span className="flex-1">{file.name.slice(0, 30)}</span>
                </div>
              ))
            ) : (
              <div className="h-[40px] w-[50%] rounded-md text-gray-300 bg-gray-700 border-solid border-[1px] border-gray-500/50 flex gap-2 justify-center items-center">
                There Is No Items
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInfoAttachments;
