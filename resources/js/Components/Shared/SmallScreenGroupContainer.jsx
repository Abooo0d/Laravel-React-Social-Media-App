import React from "react";
import PopupCard from "./PopupCard";
import GroupsContainer from "../Containers/GroupsContainer";
import GroupeCard from "./GroupeCard";
import { SecondaryButton } from "./Buttons";
import { HiMiniXMark } from "react-icons/hi2";

const SmallScreenGroupContainer = ({
  groups,
  showForm,
  setShowForm,
  showCreateFrom,
  setShowCreateForm,
}) => {
  function close() {
    setShowForm(false);
  }
  return (
    <div
      className={`absolute top-[150px]  max-w-[80%] max-h-[60%] left-[75px] pb-2 bg-gray-900/90 border-gray-700 border-solid border-[1px] backdrop-blur-md px-4 py-8 rounded-md shadow-2xl duration-200 overflow-hidden z-[100] ${
        showForm
          ? " opacity-100 visible w-[300px]"
          : " opacity-0 invisible w-[200px] h-[200px]"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="mb-4 -mt-4  text-gray-400 font-bold">My Groups:</h2>
        <button
          className="inline-flex items-center gap-2 rounded-md bg-gray-700/50 hover:bg-gray-700/80 duration-200 py-1 px-2 text-sm/6 font-semibold text-white focus:outline-none border-[1px] border-solid border-gray-700 absolute top-[20px] right-[20px]"
          onClick={() => {
            setShowCreateForm(true);
          }}
        >
          New
        </button>
      </div>
      <div className="overflow-scroll h-[400px]">
        <div className="flex flex-col gap-2 mt-2 max-h-[80%] justify-start items-center p-2 overflow-auto rounded-md">
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
  );
};

export default SmallScreenGroupContainer;
