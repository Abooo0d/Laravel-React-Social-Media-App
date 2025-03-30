import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const UserMemberCardMenu = ({ openMenu, setOpenMenu, group, member }) => {
  const [showForm, setShowForm] = useState(false);
  const { setErrors, setSuccessMessage } = useMainContext();

  let errors = [];
  const changeRole = (role) => {
    errors = [];
    axiosClient
      .post(route("group.change-role", group.slug), {
        user_id: member.user.id,
        role: role,
      })
      .then((data) => {
        router.reload();
        setOpenMenu(false);
        setSuccessMessage("Role Changed Successfully");
      })
      .catch((e) => {
        Object.keys(e.response.data).map((error) => {
          errors.push(e.response.data[error]);
        });
        setErrors(errors);
      });
  };
  const form = useForm({
    user_id: member.user.id,
  });
  const kickOut = () => {
    form.delete(route("group.kick-out", group.slug));
  };
  return (
    <div className="absolute top-[5px] right-[5px] ">
      <button
        className={`w-8 h-8 backdrop-blur-md rounded-md cursor-pointer flex justify-center items-center border-[1px] border-solid  p-1 duration-200 ${
          openMenu
            ? " bg-gray-700/30 border-gray-700/50"
            : " bg-gray-700/10 border-transparent"
        }`}
        onClick={() => {
          openMenu ? setOpenMenu(false) : setOpenMenu(true);
        }}
      >
        <PiDotsThreeOutlineVerticalFill className="w-4 h-4  text-gray-200" />
      </button>
      <div
        className={`absolute border-gray-700 backdrop-blur-md border-[1px] border-solid top-[35px] left-[-100px] bg-gray-700/20 w-[130px] duration-300 cursor-pointer shadow-2xl rounded-md flex flex-col justify-start items-center overflow-hidden z-[10] ${
          openMenu ? "opacity-100 visible" : " opacity-0 invisible"
        }`}
      >
        {member.role == "admin" ? (
          <button
            onClick={() => {
              setShowForm(true);
              setOpenMenu(false);
              changeRole("user");
            }}
            className="bg-gray-700/60 w-full duration-300 hover:bg-gray-600/80 py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
          >
            Set As User
          </button>
        ) : (
          <button
            onClick={() => {
              setShowForm(true);
              setOpenMenu(false);
              changeRole("admin");
            }}
            className="bg-gray-700/60 w-full duration-300 hover:bg-gray-600/80 py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
          >
            Set As Admin
          </button>
        )}
        {group.user_id !== member.user.id && (
          <button
            className="bg-gray-700/60 w-full duration-300 hover:bg-gray-600/80 py-2 px-4 text-sm font-medium text-white focus:outline-none text-left"
            onClick={() => kickOut()}
          >
            Kick Out
          </button>
        )}
      </div>
    </div>
  );
};

export default UserMemberCardMenu;
