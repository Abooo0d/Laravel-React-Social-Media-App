import React, { useEffect, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
const AIMessageCard = React.memo(({ message, show, isLast }) => {
  return (
    <div className="w-full h-fit relative">
      {message.from == "AI" ? (
        <div
          className={`overflow-hidden duration-500 ${
            isLast && "messageCard duration-500"
          }`}
        >
          <div className="text-gray-300 w-full h-full AI-response">
            <MarkdownRenderer content={message.body} />
          </div>
        </div>
      ) : (
        <>
          {show && (
            <div className="w-[600px] max-w-[80%] h-[1px] bg-gray-600/20 mx-auto my-[20px]" />
          )}
          <div className="w-full flex justify-end items-center gap-4 pr-4">
            <div className="max-w-[60%] w-fit h-fit rounded-lg bg-gray-800/30 text-gray-300 border-solid border-gray-600/50 border-[1px] flex justify-center items-center px-4 py-2 ">
              {/* <MarkdownRenderer content={message.body} /> */}
              {message.body}
            </div>
          </div>
        </>
      )}
    </div>
  );
});
export default AIMessageCard;
