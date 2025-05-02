import React, { useEffect } from "react";

const PopupCard = ({ showForm, children, index = "" }) => {
  return (
    <div
      className={`fixed inset-0 w-screen overflow-y-auto flex min-h-full items-center justify-center p-4 bg-gray-900/30 backdrop-blur-md duration-200 ${
        showForm ? "visible opacity-100" : "invisible opacity-0"
      }  ${index != "" ? index : "z-[200]"}`}
    >
      <div
        className={`relative lg:max-w-[80%] max-w-[90%]  w-[600px] rounded-xl bg-gray-900/90 border-[1px] border-solid border-gray-700 p-6 backdrop-blur-2xl duration-200 ${
          showForm ? "visible opacity-100" : "invisible opacity-0 scale-90 "
        } `}
      >
        {children}
      </div>
    </div>
  );
};

export default PopupCard;
