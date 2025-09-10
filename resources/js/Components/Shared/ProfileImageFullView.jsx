import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { SecondaryButton } from "./Buttons";
import { useState } from "react";
import { useEffect } from "react";
import { GoDownload } from "react-icons/go";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";
const ProfileImageFullView = ({ show, setShowImage, image, downloadUrl }) => {
  const { setErrors } = useMainContext();
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
    setProfileImage(image);
  }, [image]);
  return (
    <div
      className={`fixed inset-0 z-[800] w-screen overflow-y-auto flex min-h-full items-center justify-center p-4 dark:bg-gray-950/60 bg-gray-100/50 backdrop-blur-sm duration-200 ${
        show ? `visible opacity-100` : `invisible opacity-0 scale-[95%]`
      }`}
    >
      <div className="animate-scaleUp h-full w-full rounded-lg relative flex justify-between items-center dark:bg-gray-900/60 bg-gray-300/50 border-solid border-[1px] dark:border-gray-700 border-gray-400 backdrop-blur-md p-4">
        <div className="absolute top-[12px] right-[12px] h-20 flex justify-center items-center gap-2 flex-col z-[100]">
          <SecondaryButton
            classes="py-1.5 px-3"
            event={() => setShowImage(false)}
          >
            <RiArrowGoBackFill className="w-5 h-5 text-gray-200" />
          </SecondaryButton>
          <SecondaryButton
            classes="relative py-1.5 px-3"
            event={() => {
              axiosClient.get(downloadUrl).catch((error) => {
                console.log(error);
                setErrors([
                  error?.response?.data?.message || "Some Thing Went Wrong",
                ]);
              });
            }}
          >
            <GoDownload className="w-5 h-5 text-gray-200" />
          </SecondaryButton>
        </div>
        {show && (
          <div className="relative w-full h-full flex z-0">
            <img
              src={profileImage}
              alt="Post Image"
              className={`max-w-[90%] max-h-[90%] object-contain rounded-[10px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-200`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImageFullView;
