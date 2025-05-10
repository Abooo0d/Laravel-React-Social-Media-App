import React from "react";

const MenuButton = ({ event, show, children, classes }) => {
  return (
    <button
      className={`${classes} text-gray-400 border-solid border-[1px] duration-200 rounded-md flex justify-start items-center w-[35px] h-[30px] ${
        show
          ? "border-gray-400/50 bg-gray-800/50"
          : "border-transparent bg-gray-900"
      }`}
      onClick={event}
    >
      {children}
    </button>
  );
};

export default MenuButton;
