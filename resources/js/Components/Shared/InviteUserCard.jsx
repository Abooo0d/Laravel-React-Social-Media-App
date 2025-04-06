import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { PrimaryButton } from "./Buttons";
import { FiUserPlus } from "react-icons/fi";
const InviteUserCard = ({ user, group, data, setShowForm, setErrors }) => {
  const { setSuccessMessage } = useMainContext();
  const inviteUser = () => {
    axiosClient
      .post(route("group.inviteUser", group.slug), { user_id: user.id })
      .then((res) => {
        setSuccessMessage("User Has Been Invited Successfully");
        setShowForm(false);
      })
      .catch((err) => {
        setErrors([err.response.data.message]);
      });
  };
  return (
    <div>
      <div className="group relative bg-gray-700/30 backdrop-blur-sm rounded-[8px] border-[1px] border-solid border-gray-500/50  flex flex-col justify-between items-center cursor-pointer duration-200 hover:bg-gray-600/50 hover:border-gray-500 overflow-hidden drop-shadow-2xl">
        <img
          src={user.avatar_url || "/images/default_avatar_image.png"}
          alt=""
          className="absolute top-[10%] left-[10%] w-[90px] h-[90px] rounded-full border-[1px] border-solid border-gray-500/50 object-cover"
        />
        <img
          src={user.cover_url || "/images/default_cover_image.png"}
          alt=""
          className="w-full  min-h-[120px] max-h-[120px] h-[120px] object-cover"
        />
        <div className="flex justify-between items-center w-full pr-4">
          <Link
            className="flex flex-col justify-start items-start w-full"
            href={route("profile.view", user.username)}
          >
            <h3 className="text-gray-300 font-bold mt-1 w-full text-left px-4">
              {user.name}
            </h3>
            <h3 className="text-gray-400 mb-2 w-full text-left px-4 text-[13px] -mt-1">
              {user.email}
            </h3>
          </Link>
          <PrimaryButton classes="px-2 py-1.5" event={inviteUser}>
            <FiUserPlus />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default InviteUserCard;
