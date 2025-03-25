import React, { useEffect, useState } from "react";
import TextInput from "../TextInput";
import GroupsContainer from "./GroupsContainer";
import { Disclosure } from "@headlessui/react";
import { TiArrowSortedDown } from "react-icons/ti";
import CreateGroupForm from "../Shared/CreateGroupForm";
import { FaUserGroup } from "react-icons/fa6";
import SmallScreenGroupContainer from "../Shared/SmallScreenGroupContainer";
import { usePage } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";
const GroupsBar = ({ groups, setGroups }) => {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [showGroupContainer, setShowGroupContainer] = useState(false);

  return (
    <>
      <div className="block max-lg:hidden shadow-lg rounded-xl m-0 lg:rounded-none order-first col-span-3 lg:py-8 px-4 py-2 bg-gray-200 dark:bg-gray-900 lg:max-h-barHeight lg:min-h-barHeight max-h-[500px] h-full overflow-hidden lg:border-r-2 dark:border-gray-800 border-gray-300 border-solid lg:border-b-0">
        <div className="hidden lg:block">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold dark:text-gray-100">
              My Groups:
            </h2>
            <button
              className="inline-flex items-center gap-2 rounded-md bg-gray-700/50 hover:bg-gray-700/80 duration-200 py-1 px-2 text-sm/6 font-semibold text-white focus:outline-none border-[1px] border-solid border-gray-700"
              onClick={() => {
                setShowForm(true);
              }}
            >
              New
            </button>
          </div>
          <TextInput
            placeholder="Type To Search"
            classes="w-full mt-4 font-lg"
            value={search}
            setValue={setSearch}
          />
          <GroupsContainer groups={groups} />
        </div>
      </div>
      <div className="hidden max-lg:block">
        <button
          className="w-[65px] h-[50px] absolute top-[200px] left-0 rounded-r-md bg-gray-600/40 hover:bg-gray-600/70 duration-200 backdrop-blur-sm border-[1px] border-l-0 border-solid border-gray-500/50 hover:border-gray-500 cursor-pointer flex flex-col justify-center items-center z-10"
          onClick={() => {
            setShowGroupContainer((prev) => {
              return !prev;
            });
          }}
        >
          <FaUserGroup className="text-gray-400 text-lg" />
          <h4 className="text-gray-400 text-[12px]">Groups</h4>
        </button>
        <div>
          <SmallScreenGroupContainer
            groups={groups}
            showForm={showGroupContainer}
            setShowForm={setShowGroupContainer}
            showCreateForm={showForm}
            setShowCreateForm={setShowForm}
          />
        </div>
      </div>
      <CreateGroupForm
        showForm={showForm}
        setShowForm={setShowForm}
        setGroups={setGroups}
      />
    </>
  );
};

export default GroupsBar;
