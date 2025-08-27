import React from "react";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "@inertiajs/react";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";
import { useState } from "react";

const SuggestionCard = ({ suggestion }) => {
  const { setErrors, setSuccessMessage } = useMainContext();
  const [added, setAdded] = useState(suggestion.is_friend);
  const addFriend = () => {
    axiosClient
      .post(route("user.addFriendFormSuggestion", suggestion.id))
      .then((data) => {
        setAdded(true);
        setSuccessMessage(data?.data?.message);
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  return (
    <div className="w-[200px] h-[290px] dark:bg-gray-800/50 bg-gray-300 overflow-hidden cursor-pointer rounded-md flex flex-col justify-start items-start border-[1px] border-solid dark:border-gray-600/50 border-gray-400 duration-200 dark:hover:bg-gray-800 hover:bg-gray-400/40">
      <Link
        href={route("profile.view", suggestion.username)}
        className="w-full h-full"
      >
        <img
          src={suggestion.avatar_url}
          className="w-full min-h-[180px] max-h-[180px] rounded-md rounded-b-none object-cover"
        />
        <div className="py-2 px-4 max-h-[50px] min-h-[50px]">
          <h2 className="dark:text-gray-300 text-gray-600 mb-0">
            {suggestion.name}
          </h2>
          <h2 className="text-gray-500 text-[12px] m-0">
            @{suggestion.username}
          </h2>
        </div>
      </Link>
      <div className="flex w-full max-h-[60px] min-h-[60px] gap-2 px-2 py-3 text-[14px]">
        {added ? (
          <div className="w-full flex dark:text-gray-400 text-gray-600 justify-center items-center gap-2">
            Friend Added <FiUserPlus />
          </div>
        ) : (
          <>
            <PrimaryButton
              classes="px-2 py-1.5 flex-1 flex-row gap-2"
              event={() => {
                addFriend();
              }}
            >
              Add Friend
            </PrimaryButton>
            <SecondaryButton classes="px-4 py-1.5 w-[50px] text-[12px]">
              Remove
            </SecondaryButton>
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestionCard;
