import axiosClient from "@/AxiosClient/AxiosClient";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { FaFile } from "react-icons/fa";
import MarkdownRenderer from "./MarkdownRenderer";
import { useAIContext } from "@/Contexts/AIContext";
import { useMainContext } from "@/Contexts/MainContext";

const AIChatForm = () => {
  let a = {
    attachments: [],
    body: "# Acknowledgment of Instructions\n\nI understand your instructions for how I should format my responses. I will always adhere to the following Markdown formatting guidelines:\n\n-   Use **headings** with `#`, `##`, or `###` for appropriate structural organization.\n-   Utilize **bullet points** (`-`) or **numbered lists** (`1.`) when presenting lists of information.\n-   Enclose **code blocks** within backticks (\\`\\`\\`) and include a **language hint** (e.g., \\`\\`\\`js) like so:\n    ```js\n    function greet(name) {\n        console.log(`Hello, ${name}!`);\n    }\n    ```\n-   **Bold key concepts** and important terms using **double asterisks**.\n-   **Never skip Markdown structure**, ensuring that all parts of my response, including summaries and titles, are properly formatted.\n\nI am ready to proceed and will apply these formatting rules consistently in all my future responses.",
    chat_id: 29,
    created_at: "Aug:22 - 16:43",
    from: "AI",
    id: 109,
  };
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);
  const { currentAIChat, setCurrentAIChat, setIsLoading, setAIChats } =
    useAIContext();
  const { setErrors } = useMainContext();
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "40px"; // Let browser recalculate from scratch
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
      messages: [
        { id: "waiting", from: "AI" },
        newMe,
        ...(prev?.messages || []),
      ],
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
        const chat = data?.data?.chat;
        const comingMessage = data?.data?.message;
        console.log(data.data);

        if (!!chat) {
          setCurrentAIChat((prev) => ({
            ...chat,
            messages: prev?.messages?.map((me) =>
              me.id == "waiting" ? comingMessage : me
            ),
          }));
          setAIChats((prev) => [chat, ...prev]);
        } else {
          setCurrentAIChat((prev) => {
            return {
              ...prev,
              messages: prev?.messages?.map((me) =>
                me?.id == "waiting" ? comingMessage : me
              ),
            };
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setCurrentAIChat((prev) => ({
          ...prev,
          messages: prev?.messages?.map((me) =>
            me?.id == "waiting"
              ? {
                  isError: true,
                  from: "AI",
                }
              : me
          ),
        }));
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
        <div className="w-full max-w-[90%] rounded-lg bg-gray-900/50 backdrop-blur-sm border-solid border-[1px] border-gray-500/50 flex justify-start items-end px-4 py-2 duration-200">
          <div className="flex justify-start items-center gap-2">
            <button className="w-[30px] h-[40px] rounded-md hover:bg-gray-900 bg-transparent hover:border-gray-500/50 border-transparent border-[1px] border-solid hover:border-solid duration-200 flex justify-center items-center text-gray-500">
              <FaFile />
            </button>
          </div>
          <textarea
            ref={textareaRef}
            placeholder="What Are Thinking?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-transparent border-none outline-none ring-0 focus:ring-0 w-full max-h-[180px] duration-200 resize-none text-gray-300 overflow-auto"
          />
          <button
            className="w-[30px] h-[40px] rounded-md hover:text-sky-500 hover:bg-gray-900 bg-transparent hover:border-gray-500/50 border-transparent border-[1px] border-solid hover:border-solid duration-200 flex justify-center items-center text-gray-500"
            onClick={() => {
              newMessage();
            }}
          >
            <BiSolidSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChatForm;
