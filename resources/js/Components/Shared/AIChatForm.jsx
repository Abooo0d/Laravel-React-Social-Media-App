import axiosClient from "@/AxiosClient/AxiosClient";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { FaFile } from "react-icons/fa";
import MarkdownRenderer from "./MarkdownRenderer";
import { useAIContext } from "@/Contexts/AIContext";
import { useMainContext } from "@/Contexts/MainContext";

const AIChatForm = () => {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);
  const { currentAIChat, setCurrentAIChat, setIsLoading, setAIChats } =
    useAIContext();
  const { setErrors } = useMainContext();
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Let browser recalculate from scratch
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  const newMessage = () => {
    if (!prompt) return;
    let newMe = {
      body: prompt,
      id: "",
      attachments: [],
      created_at: "now",
      chat_id: "",
      from: "",
    };
    setCurrentAIChat((prev) => ({
      ...prev,
      messages: [newMe, ...(prev?.messages || [])],
    }));
    setIsLoading(true);
    setPrompt("");
    axiosClient
      .post(
        route("AIChat.newMessage", {
          message: prompt,
          chat_id: currentAIChat?.id ? currentAIChat?.id : "",
        })
      )
      .then((data) => {
        // console.log(data.data.chat);
        const chat = data.data?.chat;
        if (!!chat) {
          setCurrentAIChat((prev) => ({
            ...chat,
            messages: [...prev.messages],
          }));
          setAIChats((prev) => [chat, ...prev]);
        } else {
          setCurrentAIChat((prev) => {
            return {
              ...prev,
              messages: [data.data.message, ...(prev.messages || [])],
            };
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  useEffect(() => {
    handleInput();
  }, [prompt]);

  useEffect(() => {
    handleInput();
  }, []);
  return (
    <>
      <div
        className={`absolute bottom-[134px] left-0 w-full h-[50px] bg-gradient-to-t from-homeFeed via-homeFeed/80 to-transparent duration-200 `}
      />
      <div className="w-full flex justify-center items-center mb-4">
        <div className="w-full max-w-[90%] min-h-[80px] rounded-lg bg-gray-900/50 backdrop-blur-sm border-solid border-[1px] border-gray-500/50 flex flex-col justify-start items-start px-4 py-2 duration-200">
          <textarea
            ref={textareaRef}
            placeholder="What Are Thinking?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-transparent border-none outline-none ring-0 focus:ring-0 w-full max-h-[180px] duration-200 resize-none text-gray-300 overflow-auto"
          />

          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
              <button className="w-[30px] h-[30px] rounded-md hover:bg-gray-900 bg-transparent hover:border-gray-500/50 border-transparent border-[1px] border-solid hover:border-solid duration-200 flex justify-center items-center text-gray-500">
                <FaFile />
              </button>
            </div>
            <button
              className="w-[30px] h-[30px] rounded-md hover:text-sky-500 hover:bg-gray-900 bg-transparent hover:border-gray-500/50 border-transparent border-[1px] border-solid hover:border-solid duration-200 flex justify-center items-center text-gray-500"
              onClick={() => {
                newMessage();
              }}
            >
              <BiSolidSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatForm;
