import React from "react";
import NotificationCard from "../Shared/NotificationCard";
import Spinner from "../Shared/Spinner";
const NotificationsBar = ({
  notifications,
  showNotificationsForm,
  isLoading,
}) => {
  return (
    <div className="relative">
      <div
        className={`flex flex-col max-h-[500px] h-fit absolute top-[-10px] w-[400px] max-w-[90%] right-[50%] translate-x-[50%] md:right-[363px] z-[100] overflow-hidden rounded-xl bg-gray-900/80 border-[2px] border-solid border-gray-700 backdrop-blur-2xl duration-200 ${
          showNotificationsForm
            ? "visible opacity-100"
            : "invisible opacity-0 scale-90 "
        } `}
      >
        <h2 className="text-gray-400 bg-gray-800 w-full py-3 px-4 text-xl font-bold cursor-default">
          Notifications:
        </h2>
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
                        <NotificationCard notification={notify} />
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
