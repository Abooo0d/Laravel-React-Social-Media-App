import React, { useEffect, useState } from "react";

const Notification = ({ success, errors }) => {
  const [ShowNotification, setShowNotification] = useState(false);
  useEffect(() => {
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      success = "";
      errors = [];
    }, 5000);
  }, [success, errors]);

  return (
    <>
      <div
        className={`bg-emerald-500 text-white absolute top-[100px] w-[400px] z-10 h-[60px] flex justify-start items-center pl-4 rounded-l-md duration-300  ${
          ShowNotification && success
            ? "opacity-100 right-0"
            : " opacity-0 right-[-100px]"
        }`}
      >
        {success}
      </div>
      <div
        className={`bg-red-500 text-white absolute top-[200px] w-[400px] z-10 h-[60px] flex justify-center items-center pl-4 rounded-l-md duration-300 flex-col  ${
          ShowNotification && errors.length > 0
            ? "opacity-100 right-0"
            : " opacity-0 right-[-100px]"
        }`}
      >
        {errors.map((error) => (
          <span>{error}</span>
        ))}
      </div>
    </>
  );
};

export default Notification;
