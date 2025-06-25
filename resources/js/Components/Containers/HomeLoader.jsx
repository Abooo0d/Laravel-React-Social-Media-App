import React from "react";

const HomeLoader = () => {
  return (
    <div className=" flex justify-start items-center w-full">
      <div className="w-full min-h-barHeight flex justify-start items-center flex-col gap-3">
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
