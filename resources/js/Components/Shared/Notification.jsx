import { useMainContext } from "@/Contexts/MainContext";
import React, { useEffect, useState } from "react";

const Notification = () => {
  const [ShowNotification, setShowNotification] = useState(false);
  const { successMessage, errors, setSuccessMessage, setErrors } =
    useMainContext();
  useEffect(() => {
    if (successMessage !== "" || errors.length > 0) {
      console.log("Abood From useEffect");
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
        className={`bg-emerald-500 text-white absolute top-[100px] w-[400px] z-10 h-[60px] flex justify-start items-center pl-4 rounded-l-md duration-300 cursor-default  ${
          ShowNotification && successMessage
            ? "opacity-100 right-0"
            : " opacity-0 right-[-100px]"
        }`}
      >
        {successMessage}
      </div>
      <div
        className={`bg-red-500 text-white absolute top-[200px] w-[400px] z-10 h-[60px] flex justify-center items-center pl-4 rounded-l-md duration-300 flex-col cursor-default ${
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
