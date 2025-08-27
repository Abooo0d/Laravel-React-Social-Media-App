import React from "react";

const SideBarButton = ({ children, text, show, event }) => {
  return (
    <button
      className={`w-full px-4 py-3 duration-200 flex justify-start items-center gap-2 text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-200 relative ${
        show && "dark:bg-gray-800 bg-gray-200"
      }`}
      onClick={event}
    >
      {children}
      {text}
    </button>
  );
};

export default SideBarButton;
