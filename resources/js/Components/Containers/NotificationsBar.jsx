import React, { useEffect, useState } from "react";
import NotificationCard from "../Shared/NotificationCard";
import Spinner from "../Shared/Spinner";
import { PrimaryButton } from "../Shared/Buttons";
import axiosClient from "@/AxiosClient/AxiosClient";
import { CiRead } from "react-icons/ci";
import { BiShowAlt } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
const NotificationsBar = ({
  notifications,
  showNotificationsForm,
  setShowNotificationsForm,
  isLoading,
  refetch,
}) => {
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const readAllNotifications = () => {
    setIsReading(true);
    axiosClient
      .post(route("read.allNotifications"))
      .then(() => {
        setIsReading(false);
      })
      .catch(() => {
        setIsReading(false);
      });
    refetch();
  };
  useEffect(() => {
    if (!isLoading) {
      if (notifications.length > 0) {
        let count = 0;
        notifications.map((notification) => {
          if (!!notification.read_at) return;
          count++;
        });
        setNotificationsCount(count);
      }
    }
  }, [notifications, isLoading]);

  return (
    <div className="relative z-[200]">
      <div
        className={`flex flex-col max-h-[500px] absolute md:top-[96px] top-[-10px] w-[400px] max-w-[90%] right-[50%] translate-x-[50%] md:left-[0px] z-[100] overflow-hidden rounded-xl md:rounded-l-none dark:bg-gray-900/60 bg-gray-300/50 border-[1px] border-solid dark:border-gray-500/50 border-l-0 border-gray-400 backdrop-blur-md duration-200 ${
          showNotificationsForm
            ? "visible opacity-100"
            : "invisible opacity-0 scale-90 "
        } `}
      >
        <div className="w-full flex justify-between items-center dark:bg-gray-800 bg-gray-300 px-2 h-[48px]">
          <h2 className="dark:text-gray-400 text-gray-600 dark:bg-gray-800 bg-gray-300 w-fit py-3 px-4 lg:text-xl font-bold cursor-default max-h-full">
            Notifications:
          </h2>
          <PrimaryButton
            classes="py-2 px-2 "
            event={() => {
              readAllNotifications();
            }}
          >
            {isReading ? <Spinner size={"small"} /> : <BiShowAlt />}
          </PrimaryButton>
        </div>
        <div
          className={`flex flex-col gap-1 max-h-[500px] h-fit overflow-auto px-4 py-2`}
        >
          {isLoading ? (
            <Spinner size={"large"} />
          ) : (
            <>
              {notifications && (
                <>
                  {notifications?.length > 0 ? (
                    notifications?.map((notify, index) => (
                      <div className="flex flex-col gap-1" key={index}>
                        <NotificationCard
                          notification={notify}
                          setShowNotificationsForm={setShowNotificationsForm}
                          refetch={refetch}
                        />
                        <div className="w-[80%] h-[1px] relative bg-gray-700/20 mx-auto" />
                      </div>
                    ))
                  ) : (
                    <div className="w-full text-gray-500 text-center my-4">
                      No Notifications Yet
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsBar;
