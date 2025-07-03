import React, { useEffect, useRef, useState } from "react";
import ChatForm from "../ChatForm";
import ChatInfo from "../Shared/ChatInfo";
import MessageCard from "../Shared/MessageCard";
import { useChatsContext } from "@/Contexts/ChatsContext";
import Spinner from "../Shared/Spinner";
import { useInView } from "react-intersection-observer";
import axiosClient from "@/AxiosClient/AxiosClient";
const MessagesContainer = ({ isLoading }) => {
  const containerRef = useRef();
  const [ref, inView] = useInView();
  const { currentChat, setCurrentChat } = useChatsContext();
  const [thereIsMore, setThereIsMore] = useState(true);

  const getMore = () => {
    axiosClient
      .get(
        route(
          "getMoreMessages",
          currentChat.messages[currentChat.messages.length - 1]?.id
        )
      )
      .then(({ data }) => {
        if (data.messages.length == 0) {
          setThereIsMore(false);
          return;
        }
        setCurrentChat((prev) => ({
          ...prev,
          messages: [...prev.messages, ...data.messages],
        }));
      });
  };

  useEffect(() => {
    if (!thereIsMore) return;
    if (inView) {
      getMore();
    }
  }, [inView]);

  useEffect(() => {
    setThereIsMore(true);
  }, [currentChat]);
  const abood = (abood4) => {};
  return (
    <div className="order-2 relative bg-gray-300 dark:bg-gray-900 bg-chat-pattern z-[10] bg-cover min-h-full md:max-h-barHeight max-h-[calc(100vh-120px)] flex-1 overflow-hidden flex flex-col justify-between items-center">
      <div className="absolute inset-0 w-full h-full bg-[rgba(17,24,39,58%)]" />
      {isLoading ? (
        <div className="flex w-full min-h-barHeight justify-center items-center">
          <Spinner size="large" />
        </div>
      ) : (
        <>
          {!!currentChat && <ChatInfo />}
          {!!currentChat && (
            <>
              <div
                className="w-full relative p-4 overflow-auto flex flex-col-reverse flex-1 max-h-[calc(100vh-225px)]"
                ref={containerRef}
              >
                {currentChat?.messages?.map((message, index) => (
                  <MessageCard message={message} key={index} />
                ))}
                {currentChat?.messages?.length >= 6 && (
                  <>
                    {thereIsMore ? (
                      <Spinner size="small" ref={ref} />
                    ) : (
                      <div className="bg-gray-900/50 backdrop-blur-sm w-fit mx-auto text-sm text-gray-500 rounded-md py-1 px-2 cursor-default border-solid border-gray-600/50 border-[1px] mb-4">
                        There Is No More Messages
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
          {!!currentChat && <ChatForm />}
          {!currentChat && (
            <div className="w-full h-full flex justify-center items-center z-[50]">
              <div className="bg-gray-900 text-gray-500 rounded-md px-8 py-4 cursor-default border-solid border-gray-600/50 border-[1px]">
                Select A Chat To Start
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessagesContainer;
