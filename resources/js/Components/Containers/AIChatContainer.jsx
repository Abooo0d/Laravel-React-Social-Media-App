import React from "react";

const AIChatContainer = () => {
  return (
    <div className="order-2 relative bg-gray-300 dark:bg-gray-900 bg-chat-pattern z-[10] bg-cover min-h-full md:max-h-barHeight max-h-[calc(100vh-120px)] flex-1 overflow-hidden flex flex-col justify-between items-center">
      <div className="absolute inset-0 w-full h-full bg-[rgba(17,24,39,58%)]" />
      <div className="w-full h-full flex justify-center items-center z-[50]">
        <div className="bg-gray-900 text-gray-500 rounded-md px-8 py-4 cursor-default border-solid border-gray-600/50 border-[1px]">
          Select A Chat To Start
        </div>
      </div>
    </div>
  );
};

export default AIChatContainer;
