import React from "react";

const HomeLoader = () => {
  return (
    <div className=" flex justify-start items-center">
      <div className="w-full min-h-barHeight flex justify-center items-center flex-col gap-3">
        <div
          className={`max-w-[700px] w-full dark:bg-gray-900 bg-gray-200 rounded-lg py-4 lg:px-6 px-4 flex flex-col duration-500 shadow-md `}
        >
          <div className=" w-full rounded-lg bg-gray-800/50 py-1.5 px-3 duration-200 min-h-[40px] cursor-pointer text-gray-400 border-[1px] border-solid border-gray-600/50 animate-pulse" />
        </div>
        <div
          className={`max-w-[700px] w-full dark:bg-gray-900 bg-gray-200 rounded-lg pt-4 pb-0 lg:px-6 px-4 flex flex-col duration-500 shadow-md `}
        >
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-[10px]">
              <div className="rounded-full bg-gray-700 w-[60px] h-[60px] animate-pulse duration-200" />
              <div className="flex gap-4 flex-col">
                <div className="w-[150px] h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
                <div className="w-[100px] h-[5px] rounded-full bg-gray-700 animate-pulse duration-200" />
              </div>
            </div>
            <div className="w-[40px] h-[40px] bg-gray-700 rounded-md animate-pulse duration-200" />
          </div>
          <div className="flex flex-col w-full my-8 gap-4 p-8">
            <div className="space-y-2.5 animate-pulse max-w-lg">
              <div className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
              <div className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
              <div className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
              <div className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
              <div className="w-[60%] h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
            </div>
          </div>
        </div>
        <div
          className={`max-w-[700px] w-full dark:bg-gray-900 bg-gray-200 rounded-lg pt-4 pb-0 lg:px-6 px-4 flex flex-col duration-500 shadow-md `}
        >
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-[10px]">
              <div className="rounded-full bg-gray-700 w-[60px] h-[60px] animate-pulse duration-200" />
              <div className="flex gap-4 flex-col">
                <div className="w-[150px] h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
                <div className="w-[100px] h-[5px] rounded-full bg-gray-700 animate-pulse duration-200" />
              </div>
            </div>
            <div className="w-[40px] h-[40px] bg-gray-700 rounded-md animate-pulse duration-200" />
          </div>
          <div className="flex flex-col w-full my-8 gap-4 p-8">
            <div className="space-y-2.5 animate-pulse max-w-lg">
              <div className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
              <div className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
              <div className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
              <div className="w-full h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
              <div className="w-[60%] h-[8px] rounded-full bg-gray-700 animate-pulse duration-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoader;
