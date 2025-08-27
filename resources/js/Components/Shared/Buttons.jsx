import React from "react";

const PrimaryButton = ({ children, classes, event, enabled = true }) => {
  return (
    <button
      onClick={event}
      className={`${classes} flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-600 dark:bg-gray-700/70 dark:hover:bg-gray-700 dark:text-gray-200 duration-200 outline-none border-[1px] border-solid border-gray-300 dark:border-gray-400/40 rounded-md `}
    >
      {children}
    </button>
  );
};

const SecondaryButton = ({ children, classes, event, enabled = true }) => {
  return (
    <button
      onClick={event}
      className={`${classes} flex justify-center items-center bg-gray-400/50 hover:bg-gray-400/80 text-gray-600 dark:bg-gray-800/70 dark:hover:bg-gray-800 dark:text-gray-200 font-thin duration-200 border-[1px] border-solid border-gray-300 dark:border-gray-700 rounded-md `}
    >
      {children}
    </button>
  );
};

export { PrimaryButton, SecondaryButton };
