import React from "react";
import FollowersContainer from "./FollowersContainer";
import TextInput from "../TextInput";

const FollowersBar = ({ followers }) => {
  return (
    <div className="col-span-3 py-8 px-6 bg-gray-200 dark:bg-gray-900 max-h-barHeight min-h-barHeight overflow-hidden border-l-2 dark:border-gray-800 border-gray-300 border-solid">
      <h2 className="text-2xl font-bold dark:text-gray-100">My Followers:</h2>
      <TextInput placeholder="Type To Search" className="w-full mt-4 font-lg" />
      <FollowersContainer followers={followers} />
    </div>
  );
};

export default FollowersBar;
