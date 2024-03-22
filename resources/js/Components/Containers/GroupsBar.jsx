import React from "react";
import TextInput from "../TextInput";
import GroupsContainer from "./GroupsContainer";

const GroupsBar = ({ groups }) => {
  return (
    <div className="shadow-lg rounded-xl lg:rounded-none order-first col-span-3 py-8 px-6 bg-gray-200 dark:bg-gray-900 lg:max-h-barHeight lg:min-h-barHeight max-h-[500px] h-full overflow-hidden lg:border-r-2 dark:border-gray-800 border-gray-300 border-solid border-b-2 lg:border-b-0">
      <h2 className="text-2xl font-bold dark:text-gray-100">My Groups:</h2>
      <TextInput placeholder="Type To Search" className="w-full mt-4 font-lg" />
      <GroupsContainer groups={groups} />
    </div>
  );
};

export default GroupsBar;
