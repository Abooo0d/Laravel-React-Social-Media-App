import React, { useEffect, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";
import { useChatsContext } from "@/Contexts/ChatsContext";
import { FiPaperclip } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import Spinner from "./Shared/Spinner";
import EmojiPicker from "emoji-picker-react";
import { AiFillLike } from "react-icons/ai";
import { useMainContext } from "@/Contexts/MainContext";
import ChatFormAttachmentContainer from "./Shared/ChatFormAttachmentContainer";
import AudioRecorder from "./AudioRecorder";
const ChatForm = () => {
  const { currentChat } = useChatsContext();
  const { user } = useUserContext();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [chosenFiles, setChosenFiles] = useState([]);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const { setErrors } = useMainContext();
  const [showRecorder, setShowRecorder] = useState(true);
  const onFileChange = (ev) => {
    const files = ev.target.files;
    const updatedFiles = [...files].map((file) => {
      return { file: file, url: URL.createObjectURL(file) };
    });
    setChosenFiles((prev) => {
      return [...prev, ...updatedFiles];
    });
  };
  const textareaRef = useRef(null);
  const newMessage = () => {
    if (message !== "" || chosenFiles.length > 0) {
      const files = chosenFiles?.map((file) => {
        return file.file;
      });
      const formData = new FormData();
      formData.append("body", message);
      formData.append("user_id", user.id);
      formData.append("chat_id", currentChat.id);
      files.forEach((file) => {
        formData.append("attachments[]", file);
      });
      setIsLoading(true);
      axiosClient
        .post(route("newMessage", currentChat), formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadingProgress(progress);
          },
        })
        .then(() => {
          setMessage("");
          setIsLoading(false);
          setOpenEmoji(false);
          setUploadingProgress(0);
          setChosenFiles([]);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setChosenFiles([]);
          let message = err?.response?.data?.message;
          setErrors([message]);
        });
      handleInput();
    }
  };
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  }, []);
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "40px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  const sendLike = () => {
    axiosClient
      .post(route("newMessage", currentChat), {
        body: "👍",
        user_id: user.id,
        chat_id: currentChat.id,
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleInput();
  }, [message]);
  useEffect(() => {
    if (message == "" && chosenFiles.length == 0) setShowRecorder(true);
    else setShowRecorder(false);
  }, [message, chosenFiles]);
  const AudioFileReady = (file, url) => {
    setChosenFiles((prev) => [...prev, { file: file, url: url }]);
  };
  return (
    <div className="flex relative w-full justify-between items-center bg-gray-900 p-4 border-t-[1px] border-solid border-gray-700 ]">
      <ChatFormAttachmentContainer
        attachments={chosenFiles}
        setAttachments={setChosenFiles}
      />
      <div className=" relative flex justify-between items-center w-full bg-gray-700 rounded-md max-sm:h-[50px] px-2">
        <div
          className={`absolute -top-[320px] left-0 duration-200 ${
            openEmoji ? "opacity-100 visible z-10" : " opacity-0 invisible z-0"
          }`}
        >
          {/* <EmojiPicker
            className="absolute w-full h-full top-0 left-0 "
            width="300px"
            height="300px"
            theme="dark"
            style={{ border: "1px solid #374151" }}
            lazyLoadEmojis={true}
            searchDisabled={true}
            emojiStyle="google"
            onEmojiClick={(emoji) => {
              setMessage((prev) => prev + emoji.emoji);
            }}
          /> */}
        </div>
        <span
          className={`w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200 cursor-pointer
          ${openEmoji && "bg-gray-800/50"}
          `}
        >
          <BsFillEmojiSmileFill
            onClick={() => {
              setOpenEmoji((prev) => !prev);
            }}
          />
        </span>
        {chosenFiles.length > 0 && (
          <>
            {!!uploadingProgress && (
              <div className="absolute top-[-10px] left-0 w-full h-[5px] bg-gray-800 flex justify-start items-center rounded-full overflow-hidden">
                <span
                  className={`absolute top-0 left-0 h-full bg-blue-700 duration-500 max-w-full`}
                  style={{
                    width: uploadingProgress + "%",
                  }}
                ></span>
              </div>
            )}
          </>
        )}
        <textarea
          className="flex-1 bg-transparent outline-none border-none focus:outline-none focus:border-none ring-0 focus:ring-0 text-gray-300 resize-none h-auto min-h-[40px] max-h-[150px] "
          ref={textareaRef}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Message"
          value={message}
        ></textarea>
        <div className="flex h-[40px] justify-center items-center max-sm:flex-col">
          <div className="flex">
            <span
              className="relative w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200"
              onClick={() => sendLike()}
            >
              <AiFillLike />
            </span>
            <span className="relative w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200">
              <FiPaperclip />
              <input
                type="file"
                name="files"
                onChange={onFileChange}
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer z-[10]"
              />
            </span>
            <span className="relative w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200">
              <FaImage />
              <input
                type="file"
                name="files"
                onChange={onFileChange}
                multiple
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-[10]"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="relative w-[40px] h-[40px] ml-2">
        <AudioRecorder show={showRecorder} fileReady={AudioFileReady} />
        <button
          className={`absolute top-0 right-0 px-3 py-1.5 w-full h-full bg-blue-700 hover:bg-blue-600 rounded-full text-gray-300 ml-2 duration-200 ${
            !showRecorder ? "opacity-100 visible" : "opacity-0 invisible"
          } `}
          onClick={() => newMessage()}
        >
          {isLoading ? (
            <Spinner size="small" />
          ) : (
            <BiSolidSend
              className={`absolute inset-0  duration-200 w-full h-full flex justify-center items-center p-[10px] `}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatForm;
