import React from "react";
import GroupeCard from "../Shared/GroupeCard";
const GroupsContainer = ({ groups }) => {
  return (
    <div className="mt-4 max-h-full flex">
      {false ? (
        <div className="text-gray-600 text-center">
          You Ar Not Joined To Any Group
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-full overflow-scroll flex-1">
          {groups.map((groupe, index) => (
            <GroupeCard data={groupe} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsContainer;
