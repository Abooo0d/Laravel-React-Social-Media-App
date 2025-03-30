import React from "react";
import { PrimaryButton, SecondaryButton } from "../Shared/Buttons";
import NotificationCard from "../Shared/NotificationCard";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
const NotificationsBar = ({ showForm, setShowForm, notifications }) => {
  return (
    <div className="relative">
      <SecondaryButton
        classes="px-2 py-1"
        event={() => {
          setShowForm(!showForm);
        }}
      >
        {showForm ? (
          <IoMdNotifications className="w-[20px] h-[20px]" />
        ) : (
          <IoMdNotificationsOutline className="w-[20px] h-[20px]" />
        )}
      </SecondaryButton>
      <div
        className={`flex flex-col gap-4 max-h-[500px] h-fit overflow-y-auto absolute top-[40px] w-[400px] right-0 z-[100] rounded-xl bg-gray-900/90 border-[1px] border-solid border-gray-700 p-6 backdrop-blur-2xl duration-200 ${
          showForm ? "visible opacity-100" : "invisible opacity-0 scale-90 "
        } `}
      >
        {notifications && (
          <>
            {notifications.length > 0 ? (
              notifications.map((notify, index) => (
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
  );
};

export default NotificationsBar;
