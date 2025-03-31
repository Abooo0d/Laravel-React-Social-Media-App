import React, { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Shared/Buttons";
import NotificationCard from "../Shared/NotificationCard";
import { IoMdNotifications } from "react-icons/io";
const NotificationsBar = ({ notifications }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="relative">
      <button
        className={`px-2 py-1 text-gray-400 border-solid border-[1px] duration-200 rounded-md ${
          showForm
            ? "border-gray-400/50 bg-gray-800/50"
            : "border-transparent bg-gray-900"
        }`}
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        <IoMdNotifications className="w-[25px] h-[25px]" />
        {/* {showForm ? (
        ) : (
          <IoMdNotificationsOutline className="w-[25px] h-[25px]" />
        )} */}
      </button>
      <div
        className={`flex flex-col h-[500px] absolute top-[40px] w-[400px] right-0 z-[100] overflow-hidden rounded-xl bg-gray-900/80 border-[2px] border-solid border-gray-700 backdrop-blur-2xl duration-200 ${
          showForm ? "visible opacity-100" : "invisible opacity-0 scale-90 "
        } `}
      >
        <h2 className="text-gray-400 bg-gray-800 w-full py-3 px-4 text-xl font-bold cursor-default">
          Notifications:
        </h2>
        <div
          className={`flex flex-col gap-4 max-h-[500px] h-fit overflow-auto px-4 py-2`}
        >
          {notifications && (
            <>
              {notifications.data.length > 0 ? (
                notifications.data.map((notify, index) => (
                  <NotificationCard notification={notify} key={index} />
                ))
              ) : (
                <div className="w-full text-gray-500 text-center">
                  No Notifications Yet
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsBar;
