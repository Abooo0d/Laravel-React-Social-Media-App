import React, { useEffect, useRef, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import AISpinner from "./AISpinner";
const AIMessageCard = React.memo(({ message, show, isLast }) => {
  const messageRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (messageRef.current) {
      const scrollHeight = messageRef.current.scrollHeight;
      setHeight(scrollHeight);
    }
  }, [message]);
  return (
    <div className="w-full h-fit relative duration-500">
      {message?.from == "AI" ? (
        <>
          {message?.isError ? (
            <div className="bg-red-500/40 border-[1px] border-solid border-red-500 flex justify-start items-center py-2 px-4 mt-2 rounded-md break-words w-fit">
              <h2 className="text-gray-300">
                Some Thing Wrong Happened, Please Try Again Latter
              </h2>
            </div>
          ) : (
            <div
              className={`overflow-hidden duration-500 ${
                isLast && "messageCard duration-500"
              }`}
            >
              <div
                className="text-gray-300 w-full AI-response duration-500"
                ref={messageRef}
                style={{
                  height: height ? `${height}px` : "0px",
                  overflow: "hidden",
                  transition: "height 1s ease", // smooth expansion
                }}
              >
                {message?.id == "waiting" ? (
                  <AISpinner />
                ) : (
                  <MarkdownRenderer content={message?.body} />
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {show && (
            <div className="w-[600px] max-w-[80%] h-[1px] bg-gray-600/20 mx-auto my-[20px]" />
          )}
          <div className="w-full flex justify-end items-center gap-4 pr-4">
            <div className="max-w-[60%] w-fit h-fit rounded-lg bg-gray-800/30 text-gray-300 border-solid border-gray-600/50 border-[1px] flex justify-center items-center px-4 py-2 ">
              {/* <MarkdownRenderer content={message.body} /> */}
              {message?.body}
            </div>
          </div>
        </>
      )}
    </div>
  );
});
export default AIMessageCard;
