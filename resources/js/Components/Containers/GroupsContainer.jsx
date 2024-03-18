import React from "react";
import GroupeCard from "../Shared/GroupeCard";
const GroupsBarContainer = ({ groups }) => {
  return (
    <div className="py-8">
      {false ? (
        <div className="text-gray-600 text-center">
          You Ar Not Joined To Any Group
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {groups.map((groupe, index) => (
            <GroupeCard data={groupe} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsBarContainer;
