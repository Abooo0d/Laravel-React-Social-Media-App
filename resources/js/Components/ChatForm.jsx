import React, { useEffect, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import TextInput from "./TextInput";
import { PrimaryButton } from "./Shared/Buttons";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";
import { useChatsContext } from "@/Contexts/ChatsContext";
import { AiFillLike } from "react-icons/ai";
import { FiPaperclip } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import { BsFillEmojiSmileFill } from "react-icons/bs";
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

  return (
    <div className="flex w-full justify-between items-center bg-gray-900 p-4 z-[50] border-t-[1px] border-solid border-gray-700 pb-[70px]">
      <div className="flex justify-between items-center w-full bg-gray-700 rounded-md overflow-hidden max-sm:h-[60px]">
        <textarea
          className="flex-1 bg-transparent outline-none border-none focus:outline-none focus:border-none ring-0 focus:ring-0 text-gray-300 resize-none h-auto min-h-[40px] max-h-[150px] "
          ref={textareaRef}
          onInput={handleInput}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        >
          {message}
        </textarea>
        <div className="flex h-[40px] justify-center items-center max-sm:flex-col">
          <div className="flex">
            <span className="w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200">
              <BsFillEmojiSmileFill />
            </span>
            <span className="w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200">
              <AiFillLike />
            </span>
          </div>
          <div className="flex">
            <span className="w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200">
              <FiPaperclip />
            </span>
            <span className="w-[30px] h-[30px] text-gray-400 flex justify-center items-center hover:bg-gray-800/50 rounded-md duration-200">
              <FaImage />
            </span>
          </div>
        </div>
        <PrimaryButton
          classes="px-3 py-1.5 w-[50px] h-[40px] bg-gray-700/50 hover:bg-gray-800/50 rounded-l-none border-none"
          event={newMessage}
        >
          {isLoading ? <Spinner size="small" /> : <BiSolidSend />}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ChatForm;
