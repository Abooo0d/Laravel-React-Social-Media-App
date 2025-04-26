import React from "react";

const PrimaryButton = ({ children, classes, event, enabled = true }) => {
  return (
    <button
      onClick={event}
      className={`${classes} flex items-center justify-center bg-gray-700/70 hover:bg-gray-700 text-gray-200 font-thin duration-200 outline-none border-[1px] border-solid border-gray-400/40 rounded-md `}
    >
      {children}
    </button>
  );
};

const SecondaryButton = ({ children, classes, event, enabled = true }) => {
  return (
    <button
      onClick={event}
      className={`${classes} flex justify-center items-center bg-gray-800/70 hover:bg-gray-800 text-gray-200 font-thin duration-200 border-[1px] border-solid border-gray-700 rounded-md `}
    >
      {children}
    </button>
  );
};

export { PrimaryButton, SecondaryButton };
