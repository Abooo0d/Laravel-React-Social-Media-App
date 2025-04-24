import React from "react";

const ChatsLoader = () => {
  let arr = [1, 2, 3, 4, 5];
  let messages = [
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
  ];
  return (
    <div className="flex justify-between items-center h-barHeight w-full">
      <div className="md:flex flex-col gap-4 hidden w-[250px] h-barHeight bg-gray-900 pt-4 border-r-[1px] border-r-solid border-gray-600">
        {arr.map((item, index) => (
          <div
            className="w-full flex gap-2 px-4 justify-start items-center bg-gray-800 animate-pulse min-h-[80px]"
            key={index}
          >
            <div className="w-[50px] h-[50px] rounded-full bg-gray-700 animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center w-full max-w-[440px]">
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-8"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-12"></div>
              </div>
              <div className="flex items-center w-full max-w-[360px]">
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-20"></div>
                <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-1 gap-2 bg-gray-900 h-barHeight p-4">
        {messages.map((item, index) => (
          <MessageLoader right={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ChatsLoader;
const MessageLoader = ({ right }) => (
  <div
    className={`w-full flex gap-1 flex-col justify-end ${
      right ? "items-start" : " items-end"
    }`}
  >
    {/* <span className="text-gray-400 text-[11px]">{message.created_at}</span> */}
    <div
      className={`flex items-center justify-end gap-4 w-full
    ${right ? "justify-start flex-row-reverse" : " justify-end flex-row"}`}
    >
      <div
        className={`bg-[rgba(46,59,78,100%)] backdrop-blur-sm w-fit flex-col gap-2 px-4 py-2 rounded-md text-gray-400 word-wrap cursor-default max-w-[60%] flex justify-start items-start break-all animate-pulse`}
      >
        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-8"></div>
        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-12"></div>
        <div
          className={`absolute bottom-0 ${
            right
              ? "left-[-10px] w-[20px] h-[20px] border-[10px] border-solid border-transparent border-b-[rgba(46,59,78,100%)] z-10"
              : "right-[-10px] w-[20px] h-[20px] border-[10px] border-solid border-transparent border-b-[rgba(46,59,78,100%)] z-10"
          }`}
        />
      </div>
      <div className="w-[50px] h-[50px] rounded-full bg-gray-700 animate-pulse" />
    </div>
  </div>
);
