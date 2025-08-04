import { useUserContext } from "@/Contexts/UserContext";
import React, { useEffect, useRef, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import MessageAttachmentContainer from "./MessageAttachmentContainer";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import MessageMenu from "./MessageMenu";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useChatsContext } from "@/Contexts/ChatsContext";

const MessageCard = ({ message }) => {
  const { user } = useUserContext();
  const { setCurrentChat, currentChat } = useChatsContext();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [newMessage, setNewMessage] = useState(message?.body);
  const textareaRef = useRef();
  useEffect(() => {
    if (showUpdateForm) setNewMessage(message?.body);
    handleInput();
  }, [showUpdateForm]);
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "40px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  useEffect(() => {
    handleInput();
  }, [newMessage]);
  const updateMessage = () => {
    if (newMessage !== "")
      axiosClient
        .post(route("chat.updateMessage", message?.id), { body: newMessage })
        .then(() => {
          let mes = currentChat.messages;
          let newMes = mes.map((m) =>
            m.id !== message?.id ? m : { ...m, body: newMessage, edited: true }
          );
          setCurrentChat((prev) => ({
            ...prev,
            messages: newMes,
          }));
          setShowUpdateForm(false);
        })
        .catch((err) => {
          console.log(err);
          setShowUpdateForm(false);
        });
  };

  return (
    <div
      className={`w-full flex gap-1 flex-col justify-end relative ${
        message?.user.id != user.id ? "items-start" : " items-end"
      }`}
    >
      {message?.user.id == user.id && (
        <MessageMenu message={message} setShowUpdateForm={setShowUpdateForm} />
      )}
      <div
        className={`flex items-center justify-end gap-4 w-full
        ${
          message?.user.id != user.id
            ? "justify-start flex-row-reverse"
            : " justify-end flex-row"
        }`}
      >
        <div
          className={`backdrop-blur-sm relative w-fit p-2 rounded-md text-gray-400 word-wrap cursor-default max-w-[80%] ove flex justify-center items-start flex-col break-all  ${
            message?.user.id != user.id
              ? "bg-[rgba(46,59,78,100%)]"
              : "bg-gray-800 pr-8"
          }`}
        >
          {message?.attachments.length > 0 && (
            <MessageAttachmentContainer message={message} />
          )}
          {showUpdateForm ? (
            <div className="min-w-[250px] flex justify-start items-start gap-1">
              <textarea
                className="flex-1 bg-gray-900/50 rounded-md outline-none border-none focus:outline-none focus:border-none ring-0 focus:ring-0 text-gray-300 resize-none h-auto min-h-[40px] max-h-[150px] "
                ref={textareaRef}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
                placeholder="Message"
                value={newMessage}
              ></textarea>
              <button
                className="w-8 h-8 rounded-md flex justify-center items-center bg-emerald-500/40 hover:bg-emerald-500/80 duration-200 border-[1px] border-solid border-emerald-500 text-gray-300"
                onClick={() => {
                  updateMessage();
                }}
              >
                <FaCheck className="w-[20px] h-[20px]" />
              </button>
              <button
                className="w-8 h-8 rounded-md flex justify-center items-center bg-red-500/40 hover:bg-red-500/80 border-[1px] duration-200 border-solid border-red-500 text-gray-300"
                onClick={() => {
                  setShowUpdateForm(false);
                }}
              >
                <FaXmark className="w-[20px] h-[20px]" />
              </button>
            </div>
          ) : (
            <MarkdownRenderer content={message?.body}>
              {message?.body}
              {message?.status}
            </MarkdownRenderer>
          )}
          <div className={`flex justify-start items-center gap-2 ml-auto  `}>
            <span className="text-gray-400 text-[8px]">
              {message?.created_at}
            </span>
            {message?.edited && <span className="text-[10px]">edited</span>}
            {!currentChat.is_group && (
              <>
                {message?.is_read != "group" && (
                  <>
                    {message?.user.id == user.id && (
                      <IoCheckmarkDoneSharp
                        className={`${
                          message?.user.id != user.id && "hidden"
                        } ${
                          !!message?.is_read ? "text-blue-500" : "text-gray-600"
                        }`}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div
            className={`absolute bottom-0 ${
              message?.user.id != user.id
                ? "left-[-10px] w-[20px] h-[20px] border-[10px] border-solid border-transparent border-b-[rgba(46,59,78,100%)] z-10"
                : "right-[-10px] w-[20px] h-[20px] border-[10px] border-solid border-transparent border-b-gray-800 z-10"
            }`}
          />
        </div>
        <img
          src={message?.user.avatar_url}
          className="w-[30px] h-[30px] rounded-full mt-auto object-cover"
        />
      </div>
      <span className="text-xs text-gray-500 opacity-50">Delivered</span>
    </div>
  );
};

export default MessageCard;
