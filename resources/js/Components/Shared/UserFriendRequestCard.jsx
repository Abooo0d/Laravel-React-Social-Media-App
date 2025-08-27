import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

const UserFriendRequestCard = ({ request }) => {
  const { setSuccessMessage, setErrors } = useMainContext();
  const { data, post } = useForm({
    request_id: request.request_id,
    request_owner_id: request.friend_id,
  });

  const acceptRequest = () => {
    post(route("user.acceptRequest"), data, {
      onSuccess: () => {},
      onError: () => {},
    });
  };
  return (
    <div className="group relative dark:bg-gray-700/30 bg-gray-200/30 backdrop-blur-sm rounded-[8px] border-[1px] border-solid dark:border-gray-500/50 border-gray-300  flex flex-col justify-between items-center cursor-pointer duration-200 dark:hover:bg-gray-600/50 hover:bg-gray-200/50 dark:hover:border-gray-500 overflow-hidden drop-shadow-2xl">
      <img
        src={request.avatar_url || "/images/default_avatar_image.png"}
        alt=""
        className="absolute top-[20%] left-[10%] w-[90px] max-h-[90px] h-full object-cover rounded-full border-[1px] border-solid border-gray-500/50"
      />
      <img
        src={request.cover_url || "/images/default_cover_image.png"}
        alt=""
        className="w-full h-[80%] max-h-[150px] object-cover "
      />
      <div className="flex justify-between items-center w-full pr-4">
        <Link
          className="flex flex-col justify-start items-start w-full"
          href={route("profile.view", request.name)}
        >
          <h3 className="dark:text-gray-300 text-gray-600 font-bold mt-1 w-full text-left px-4">
            {request.username}
          </h3>
          <h3 className="dark:text-gray-400 text-gray-6700 mb-2 w-full text-left px-4 text-[13px] -mt-1">
            {request.email}
          </h3>
        </Link>
        <div className="flex gap-2 justify-center items-center">
          <button
            className="py-[5px] px-[5px] bg-emerald-500/40 hover:bg-emerald-600/90 border-[1px] border-solid border-emerald-400 text-gray-300 rounded-md text-[12px] duration-200 "
            onClick={() => acceptRequest()}
          >
            Accept
          </button>
          <button
            className="py-[5px] px-[5px] bg-red-600/40 hover:bg-red-600/70 border-[1px] border-solid border-red-400 text-gray-300 rounded-md text-[12px] duration-200 "
            onClick={() => {}}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFriendRequestCard;
