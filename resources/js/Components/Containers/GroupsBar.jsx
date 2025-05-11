import React, { useEffect, useState } from "react";
import GroupeCard from "../Shared/GroupeCard";
import CreateGroupForm from "../Shared/CreateGroupForm";
import { PrimaryButton } from "../Shared/Buttons";
import Spinner from "../Shared/Spinner";
import SearchForGroupsForm from "../Shared/SearchForGroupsForm";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
const GroupsBar = ({
  groups,
  showGroupContainer,
  setShowGroupContainer,
  isLoading,
}) => {
  const [groupData, setGroupsData] = useState(groups);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  useEffect(() => {
    setGroupsData(groups);
  }, [groups]);

  return (
    <>
      <div className="relative z-[200]">
        <div
          className={`flex flex-col max-h-[400px] absolute md:top-[144px] top-[-10px] w-[400px] max-w-[90%] right-[50%] translate-x-[50%] md:left-[0px] z-[100] overflow-hidden rounded-xl md:rounded-l-none bg-gray-900/60 border-[1px] border-solid border-gray-500/50 backdrop-blur-md duration-200 ${
            showGroupContainer
              ? "visible opacity-100 "
              : "invisible opacity-0 scale-90"
          } `}
        >
          <div className="flex justify-between items-center bg-gray-800 px-4 h-[48px]">
            <h2 className="text-gray-400  w-full py-3 lg:text-xl font-bold cursor-default max-h-full">
              Groups:
            </h2>
            <div className="flex gap-2 items-center justify-between">
              <PrimaryButton
                classes="py-2 px-2 "
                event={() => {
                  setShowCreateForm(true);
                }}
              >
                <FaPlus />
              </PrimaryButton>
              <PrimaryButton
                classes="text-[15px] w-fit py-2 px-2 "
                event={() => {
                  setShowSearchForm(true);
                }}
              >
                <FaSearch />
              </PrimaryButton>
            </div>
          </div>
          <div
            className={`flex flex-col gap-4 max-h-[500px] h-fit overflow-auto px-4 py-2`}
          >
            {isLoading ? (
              <Spinner size="large" />
            ) : (
              <>
                {groupData.length > 0 ? (
                  <>
                    {groupData.map((group, index) => (
                      <GroupeCard
                        data={group}
                        key={index}
                        setShowGroupContainer={setShowGroupContainer}
                      />
                    ))}
                  </>
                ) : (
                  <div className="text-gray-600 text-center">
                    You Are Not Joined To Any Group
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <CreateGroupForm
        showForm={showCreateForm}
        setShowForm={setShowCreateForm}
        setGroups={setGroupsData}
      />
      <SearchForGroupsForm
        showForm={showSearchForm}
        setShowForm={setShowSearchForm}
      />
    </>
  );
};

export default GroupsBar;
