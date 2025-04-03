import { useMainContext } from "@/Contexts/MainContext";
import React, { useEffect, useState } from "react";

const Notification = () => {
  const [ShowNotification, setShowNotification] = useState(false);
  const { successMessage, errors, setSuccessMessage, setErrors } =
    useMainContext();
  useEffect(() => {
    if (successMessage !== "" || errors.length > 0) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setSuccessMessage("");
        setErrors([]);
      }, 5000);
    }
  }, [successMessage, errors]);

  return (
    <>
      <div
        className={`bg-emerald-500/40 backdrop-blur-sm border-[2px] border-solid border-emerald-500 border-r-[0px] text-white absolute top-[100px] right-0 z-[1000] h-[60px] flex justify-start items-center pl-4 rounded-l-md duration-300 cursor-default  ${
          ShowNotification && successMessage
            ? "opacity-100 w-[400px] visible"
            : " opacity-0 w-[0] invisible"
        }`}
      >
        {successMessage}
      </div>
      <div
        className={`bg-red-500/40 backdrop-blur-sm border-[2px] border-solid border-red-500 border-r-[0px] text-white absolute top-[200px] right-0 z-[1000] h-[60px] flex justify-center items-start pl-4 rounded-l-md duration-300 flex-col cursor-default ${
          ShowNotification && errors.length > 0
            ? "opacity-100 w-[400px] visible"
            : " opacity-0 w-[0] invisible"
        }`}
      >
        {errors.map((error, index) => (
          <span className="" key={index}>
            {error}
          </span>
        ))}
      </div>
    </>
  );
};

export default Notification;
