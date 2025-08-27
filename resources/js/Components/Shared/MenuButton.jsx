import React from "react";

const MenuButton = ({ event, show, children, classes }) => {
  return (
    <button
      className={`${classes} dark:text-gray-400 text-gray-600 border-solid border-[1px] duration-200 rounded-md flex justify-start items-center w-[35px] h-[30px] ${
        show
          ? "dark:border-gray-400/50 dark:bg-gray-800/50 bg-gray-200 border-gray-300"
          : "border-transparent dark:bg-gray-900 bg-white"
      }`}
      onClick={event}
    >
      {children}
    </button>
  );
};

export default MenuButton;
