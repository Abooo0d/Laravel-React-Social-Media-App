import React, { useState } from "react";
import FollowersContainer from "./FollowersContainer";
import TextInput from "../TextInput";
import { FaUserGroup } from "react-icons/fa6";
import SmallScreenFollowersContainer from "../Shared/SmallScreenFollowersContainer";
const FollowersBar = ({ followers }) => {
  const [search, setSearch] = useState("");
  const [showFollowersContainer, setShowFollowersContainer] = useState(false);
  return (
    <>
      <div className="block shadow-lg rounded-xl m-0 lg:rounded-none order-first max-w-[25%] min-w-[25%] lg:py-4 px-4 py-2 bg-gray-200 dark:bg-gray-900 lg:max-h-barHeight lg:min-h-barHeight max-h-[500px] h-full overflow-hidden border-r-2 dark:border-gray-800 border-gray-300 border-solid">
        <h2 className="block max-lg-hidden text-xl font-bold dark:text-gray-100">
          My Followers:
        </h2>
        <TextInput
          placeholder="Type To Search"
          classes="w-full mt-4 font-lg"
          value={search}
          setValue={setSearch}
        />
        <FollowersContainer followers={followers} />
      </div>
      <div className="hidden max-lg:block">
        <button
          className="w-[65px] h-[50px] absolute top-[140px] left-0 rounded-r-md bg-gray-600/40 hover:bg-gray-600/70 duration-200 backdrop-blur-sm border-[1px] border-l-0 border-solid border-gray-500/50 hover:border-gray-500 cursor-pointer flex flex-col justify-center items-center z-10"
          onClick={() => {
            setShowFollowersContainer((prev) => {
              return !prev;
            });
          }}
        >
          <FaUserGroup className="text-gray-400 text-lg" />
          <h4 className="text-gray-400 text-[12px]">Followers</h4>
        </button>
        <div>
          <SmallScreenFollowersContainer
            followers={followers}
            showForm={showFollowersContainer}
            setShowForm={setShowFollowersContainer}
          />
        </div>
      </div>
    </>
  );
};

export default FollowersBar;
