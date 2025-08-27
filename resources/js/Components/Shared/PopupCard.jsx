import React, { useEffect } from "react";

const PopupCard = ({ showForm, children, index = "" }) => {
  return (
    <div
      className={`fixed inset-0 w-screen overflow-y-auto flex min-h-full items-center justify-center p-4 dark:bg-gray-900/30 bg-gray-300/50 backdrop-blur-md duration-200 ${
        showForm ? "visible opacity-100" : "invisible opacity-0"
      }  ${index != "" ? index : "z-[300]"}`}
    >
      <div
        className={`relative lg:max-w-[80%] max-w-[90%] w-[600px] rounded-xl max-h-[90%] overflow-auto dark:bg-gray-900/90 bg-gray-200 border-[1px] border-solid dark:border-gray-700 border-gray-400 p-6 backdrop-blur-2xl duration-200 z-[200] ${
          showForm ? "visible opacity-100" : "invisible opacity-0 scale-90 "
        } `}
      >
        {children}
      </div>
    </div>
  );
};

export default PopupCard;
