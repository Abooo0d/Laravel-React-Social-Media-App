import React, { useEffect, useState } from "react";
import GroupeCard from "../Shared/GroupeCard";
import CreateGroupForm from "../Shared/CreateGroupForm";
import { PrimaryButton } from "../Shared/Buttons";
import Spinner from "../Shared/Spinner";
import SearchForGroupsForm from "../Shared/SearchForGroupsForm";
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
      <div className="relative">
        <div
          className={`flex flex-col max-h-[500px] h-fit absolute top-[-10px] w-[400px] right-[50%] max-w-[90%] md:right-[318px] translate-x-[50%] z-[100] overflow-hidden rounded-xl bg-gray-900/80 border-[2px] border-solid border-gray-700 backdrop-blur-2xl duration-200 ${
            showGroupContainer
              ? "visible opacity-100"
              : "invisible opacity-0 scale-90 "
          } `}
        >
          <div className="flex justify-between items-center bg-gray-800 px-4">
            <h2 className="text-gray-400  w-full py-3  text-xl font-bold cursor-default">
              Groups:
            </h2>
            <div className="flex gap-2 items-center justify-between">
              <PrimaryButton
                classes="px-3 py-1.5"
                event={() => {
                  setShowCreateForm(true);
                }}
              >
                New
              </PrimaryButton>
              <PrimaryButton
                classes="text-[15px] w-fit py-1.5 px-3"
                event={() => {
                  setShowSearchForm(true);
                }}
              >
                Search
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
