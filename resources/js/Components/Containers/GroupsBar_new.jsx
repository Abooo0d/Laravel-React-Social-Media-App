import React from "react";
import GroupeCard from "../Shared/GroupeCard";
const GroupsBar_new = ({ groups, showGroupContainer }) => {
  return (
    <>
      <div className="relative">
        <div
          className={`flex flex-col h-[500px] absolute top-[-10px] w-[400px] right-[50%] max-w-[90%] md:right-[318px] translate-x-[50%] z-[100] overflow-hidden rounded-xl bg-gray-900/80 border-[2px] border-solid border-gray-700 backdrop-blur-2xl duration-200 ${
            showGroupContainer
              ? "visible opacity-100"
              : "invisible opacity-0 scale-90 "
          } `}
        >
          <h2 className="text-gray-400 bg-gray-800 w-full py-3 px-4 text-xl font-bold cursor-default">
            Groups:
          </h2>
          <div
            className={`flex flex-col gap-4 max-h-[500px] h-fit overflow-auto px-4 py-2`}
          >
            {groups.length > 0 ? (
              <>
                {groups.map((group, index) => (
                  <GroupeCard data={group} key={index} />
                ))}
              </>
            ) : (
              <div className="text-gray-600 text-center">
                You Ar Not Joined To Any Group
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <CreateGroupForm
        showForm={showForm}
        setShowForm={setShowForm}
        setGroups={setGroupsData}
      /> */}
    </>
  );
};

export default GroupsBar_new;
