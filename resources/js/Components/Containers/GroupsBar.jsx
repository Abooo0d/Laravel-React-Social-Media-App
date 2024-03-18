import React from "react";
import TextInput from "../TextInput";
import GroupsContainer from "./GroupsContainer";

const GroupsBar = ({ groups }) => {
  return (
    <div className="col-span-3 py-8 px-6 bg-gray-200 dark:bg-gray-900 min-h-full border-r-2 border-gray-800 border-solid">
      <h2 className="text-2xl font-bold dark:text-gray-100">My Groups:</h2>
      <TextInput placeholder="Type To Search" className="w-full mt-4 font-lg" />
      <GroupsContainer groups={groups} />
    </div>
  );
};

export default GroupsBar;
