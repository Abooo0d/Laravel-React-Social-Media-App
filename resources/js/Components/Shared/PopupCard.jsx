import React from "react";

const PopupCard = ({ showForm, children }) => {
  return (
    <div
      className={`fixed inset-0 z-10 w-screen overflow-y-auto flex min-h-full items-center justify-center p-4 bg-gray-900/30 backdrop-blur-sm duration-200 ${
        showForm ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className={`relative max-w-[80%] w-[600px] rounded-xl bg-gray-900/90 border-[1px] border-solid border-gray-700 p-6 backdrop-blur-2xl duration-200 ${
          showForm ? "visible opacity-100" : "invisible opacity-0 scale-90 "
        } `}
      >
        {children}
      </div>
    </div>
  );
};

export default PopupCard;
