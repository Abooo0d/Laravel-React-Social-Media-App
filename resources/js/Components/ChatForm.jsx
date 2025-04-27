import React, { useEffect, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";
import { useChatsContext } from "@/Contexts/ChatsContext";
import { FiPaperclip } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import Spinner from "./Shared/Spinner";
const ChatForm = () => {
  const { currentChat } = useChatsContext();
  const { user } = useUserContext();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const newMessage = () => {
    if (message !== "") {
      setIsLoading(true);
      axiosClient
        .post(route("newMessage", currentChat), {
          body: message,
          user_id: user.id,
          chat_id: currentChat.id,
        })
        .then(({ data }) => {
          setMessage("");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
      handleInput();
    }
  };
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px"; // force initial height
    }
  }, []);
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "40px"; // reset to min height first
      textarea.style.height = `${textarea.scrollHeight}px`; // then grow if needed
    }
  };
  useEffect(() => {
    handleInput();
  }, [message]);

  return (
    <div className="flex w-full justify-between items-center bg-gray-900 p-4 z-[50] border-t-[1px] border-solid border-gray-700 max-sm:pb-[70px]">
      <div className="flex justify-between items-center w-full bg-gray-700 rounded-md overflow-hidden max-sm:h-[60px] px-2">
        <span className="w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200">
          <BsFillEmojiSmileFill />
        </span>
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
            <span className="relative w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200">
              <FiPaperclip />
              <input
                type="file"
                name="files"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer z-[10]"
              />
            </span>
            <span className="relative w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200">
              <FaImage />
              <input
                type="file"
                name="files"
                multiple
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-[10]"
              />
            </span>
          </div>
        </div>
      </div>
      <button
        className="relative px-3 py-1.5 w-[40px] h-[40px] bg-blue-700 hover:bg-blue-600 rounded-full text-gray-300 ml-2 duration-200"
        // event={newMessage}
        onClick={() => newMessage()}
      >
        {isLoading ? (
          <Spinner size="small" />
        ) : (
          <>
            <FaMicrophone
              className={`absolute inset-0 duration-200 w-full h-full flex justify-center items-center p-[10px] ${
                message == "" ? " opacity-100" : "  opacity-0"
              }`}
            />
            <BiSolidSend
              className={`absolute inset-0  duration-200 w-full h-full flex justify-center items-center p-[10px] ${
                message == "" ? " opacity-0" : " opacity-100 "
              }`}
            />
          </>
        )}
      </button>
    </div>
  );
};

export default ChatForm;
