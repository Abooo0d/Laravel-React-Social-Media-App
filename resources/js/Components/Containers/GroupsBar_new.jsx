import React, { useState } from "react";
import SmallScreenGroupContainer from "../Shared/SmallScreenGroupContainer";
import CreateGroupForm from "../Shared/CreateGroupForm";
import { FaUserGroup } from "react-icons/fa6";
import GroupeCard from "../Shared/GroupeCard";

const GroupsBar_new = ({ groups }) => {
  const [showGroupContainer, setShowGroupContainer] = useState(false);
  const [groupsData, setGroupsData] = useState(groups);
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className="relative">
        <button
          className={`px-2 py-1 text-gray-400 border-solid border-[1px] duration-200 rounded-md ${
            showForm
              ? "border-gray-400/50 bg-gray-800/50"
              : "border-transparent bg-gray-900"
          }`}
          onClick={() => {
            setShowGroupContainer(!showGroupContainer);
            setShowForm(!showForm);
          }}
        >
          <FaUserGroup className="text-gray-400 text-lg w-[25px] h-[25px]" />
        </button>
        <div
          className={`flex flex-col h-[500px] absolute top-[40px] w-[400px] right-0 z-[100] overflow-hidden rounded-xl bg-gray-900/80 border-[2px] border-solid border-gray-700 backdrop-blur-2xl duration-200 ${
            showForm ? "visible opacity-100" : "invisible opacity-0 scale-90 "
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
