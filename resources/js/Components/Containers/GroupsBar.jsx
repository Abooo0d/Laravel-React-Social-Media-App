import React, { useState } from "react";
import TextInput from "../TextInput";
import GroupsContainer from "./GroupsContainer";
import { Disclosure } from "@headlessui/react";
import { TiArrowSortedDown } from "react-icons/ti";
import CreateGroupForm from "../Shared/CreateGroupForm";
const GroupsBar = ({ groups, setGroups }) => {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="shadow-lg rounded-xl m-0 lg:rounded-none order-first col-span-3 lg:py-8 px-4 py-2 bg-gray-200 dark:bg-gray-900 lg:max-h-barHeight lg:min-h-barHeight max-h-[500px] h-full overflow-hidden lg:border-r-2 dark:border-gray-800 border-gray-300 border-solid lg:border-b-0">
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
        <div className="block lg:hidden">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full text-left flex justify-between items-center">
                  <div className="flex justify-between items-center flex-1">
                    <h2 className="text-lg font-bold dark:text-gray-100">
                      {" "}
                      My Groups:
                    </h2>
                    <button
                      className={`inline-flex items-center gap-2 rounded-md bg-gray-700/50 hover:bg-gray-700/80 duration-200 py-1 px-2 text-sm/6 font-semibold text-white focus:outline-none border-[1px] border-solid border-gray-700 ${
                        open ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                      onClick={() => {
                        setShowForm(true);
                      }}
                    >
                      New
                    </button>
                  </div>
                  <TiArrowSortedDown
                    className={`w-[40px] h-[40px] text-gray-400 duration-200 ${
                      open && `rotate-180`
                    }`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500">
                  <TextInput
                    placeholder="Type To Search"
                    classes="w-full mt-4 font-lg"
                  />
                  <GroupsContainer groups={groups} />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <CreateGroupForm
          showForm={showForm}
          setShowForm={setShowForm}
          setGroups={setGroups}
        />
      </div>
    </>
  );
};

export default GroupsBar;
