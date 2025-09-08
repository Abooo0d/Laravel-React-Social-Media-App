import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";
import { Link } from "@inertiajs/react";
import React from "react";

const UserRequestCard = ({ request, group, setRequestsData }) => {
  const { setSuccessMessage, setErrors } = useMainContext();
  const approve = () => {
    axiosClient
      .post(route("group.approveRequest", group), { user_id: request.id })
      .then((data) => {
        setSuccessMessage(data.data.message);
        setRequestsData((prev) => prev.filter((req) => req.id !== request.id));
      });
  };
  const reject = () => {
    axiosClient
      .post(route("group.rejectRequest", group), { user_id: request.id })
      .then((data) => {
        setSuccessMessage(data.data.message);
        setRequestsData((prev) => prev.filter((req) => req.id !== request.id));
      })
      .catch((data) => {
        setErrors([data.data.message]);
      });
  };
  return (
    <div className="group relative min-w-[300px] dark:bg-gray-700/30 bg-gray-200 backdrop-blur-sm rounded-[8px] border-[1px] border-solid dark:border-gray-500/50 border-gray-400 flex flex-col justify-between items-center cursor-pointer duration-200 hover:bg-gray-600/50 hover:border-gray-500 overflow-hidden drop-shadow-2xl">
      <img
        src={request.avatar_url || "/images/default_avatar_image.png"}
        alt=""
        className="absolute top-[20%] left-[10%] w-[90px] h-[90px] rounded-full border-[1px] border-solid border-gray-500/50"
      />
      <img
        src={request.cover_url || "/images/default_cover_image.png"}
        alt=""
        className="w-full h-[120px] "
      />
      <div className="flex justify-between items-center w-full pr-4">
        <Link
          className="flex flex-col justify-start items-start w-full"
          href={route("profile.view", request.id)}
        >
          <h3 className="dark:text-gray-300 text-gray-600 font-bold mt-1 w-full text-left px-4">
            {request.username}
          </h3>
          <h3 className="dark:text-gray-400 text-gray-700 mb-2 w-full text-left px-4 text-[13px] -mt-1">
            {request.email}
          </h3>
        </Link>
        <div className="flex gap-2 justify-center items-center">
          <button
            className="py-[5px] px-[5px] bg-emerald-500/40 hover:bg-emerald-600/90 border-[1px] border-solid border-emerald-400 text-gray-300 rounded-md text-[12px] duration-200 "
            onClick={() => approve()}
          >
            Approve
          </button>
          <button
            className="py-[5px] px-[5px] bg-red-600/40 hover:bg-red-600/70 border-[1px] border-solid border-red-400 text-gray-300 rounded-md text-[12px] duration-200 "
            onClick={() => reject()}
          >
            Reject
          </button>
        </div>
      </div>
      <span className="absolute top-[10px] right-[10px] backdrop-blur-md border-[1px] border-solid pl-[6px] px-[5px] py-[2px] rounded-sm text-gray-300 text-[10px] opacity-100 duration-200 bg-blue-600/30 border-blue-600">
        Pending
      </span>
    </div>
  );
};

export default UserRequestCard;
