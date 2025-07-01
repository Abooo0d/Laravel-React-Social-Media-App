import React from "react";

const AIChatCard = ({ chat, setShow }) => {
  return (
    <div
      className="min-h-[50px] w-[250px] relative flex items-center justify-start gap-2 py-2 px-4 text-gray-400 duration-200 rounded-md hover:bg-gray-800/60 cursor-pointer"
      onClick={() => {
        setShow(false);
      }}
    >
      <div className="flex flex-col bg-blue-1 flex-1">
        <div className="flex flex-1 gap-1 justify-between items-center w-full ">
          <h3 className="text-[15px] w-full text-nowrap overflow-hidden">
            {chat?.name?.length > 16
              ? chat.name.substr(0, 16) + "..."
              : chat?.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AIChatCard;
