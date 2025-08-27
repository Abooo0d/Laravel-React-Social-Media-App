import { Link } from "@inertiajs/react";
import React, { useState } from "react";

const AuthMenu = ({ currentUser, show, setShow }) => {
  return (
    <>
      <button
        onClick={() => {
          setShow();
        }}
      >
        <span className="inline-flex rounded-md">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
          >
            {currentUser?.name}
            <svg
              className="ms-2 -me-0.5 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </button>
      <div
        className={`w-[200px] rounded-md overflow-hidden flex flex-col justify-start items-start absolute top-[70px] right-[30px] duration-300 z-[300] ${
          show ? "visible z-100 opacity-100" : "invisible z-0 opacity-0"
        }`}
      >
        <Link
          href={route("profile.myProfile")}
          className="dark:bg-gray-800 bg-gray-100 duration-300 flex gap-2 justify-start items-center hover:bg-gray-200 dark:hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium dark:text-white text-gray-500 focus:outline-none text-left"
        >
          Profile
        </Link>
        <Link
          href={route("logout")}
          method="post"
          className="dark:bg-gray-800 bg-gray-100 duration-300 flex gap-2 justify-start items-center hover:bg-gray-200 dark:hover:bg-gray-700 w-full py-2 px-4 text-sm font-medium dark:text-white text-gray-500 focus:outline-none text-left"
        >
          Logout
        </Link>
      </div>
    </>
  );
};

export default AuthMenu;
