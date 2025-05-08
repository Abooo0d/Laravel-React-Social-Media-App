import React, { useState } from "react";
import { FaMicrophone, FaPause } from "react-icons/fa";

const AudioRecorder = ({ show, fileReady }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const onMicrophoneClick = async () => {
    if (recording) {
      setRecording(false);
      if (mediaRecorder) {
        mediaRecorder.stop();
        setMediaRecorder(null);
      }
      return;
    }
    setRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const newMediaRecorder = new MediaRecorder(stream);
      const chunks = [];
      newMediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });
      newMediaRecorder.addEventListener("stop", (event) => {
        let audioBlob = new Blob(chunks, {
          type: "audio/ogg codecs:opus",
        });
        let audioFile = new File([audioBlob], "recorder_audio.ogg", {
          type: "audio/ogg codecs=opus",
        });
        const url = URL.createObjectURL(audioFile);
        fileReady(audioFile, url);
      });
      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
    } catch (error) {
      setRecording(false);
      console.log(error);
    }
  };
  return (
    <button
      onClick={() => onMicrophoneClick()}
      className={`absolute top-0 right-0 px-3 py-1.5 w-full h-full bg-blue-700 hover:bg-blue-600 rounded-full text-gray-300 ml-2 duration-200 ${
        show ? "opacity-100 visible" : "opacity-o invisible"
      } `}
    >
      <FaMicrophone
        className={`absolute inset-0 duration-200 w-full h-full flex justify-center items-center p-[10px] ${
          recording ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      />
      <FaPause
        className={`absolute inset-0 duration-200 w-full h-full flex justify-center items-center p-[10px]  ${
          recording ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
    </button>
  );
};

export default AudioRecorder;
