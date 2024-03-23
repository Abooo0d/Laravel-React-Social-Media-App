import React from "react";
import TextInput from "../TextInput";
import GroupsContainer from "./GroupsContainer";
import { Disclosure } from "@headlessui/react";
import { TiArrowSortedDown } from "react-icons/ti";
const GroupsBar = ({ groups }) => {
  return (
    <div className="shadow-lg rounded-xl m-0 lg:rounded-none order-first col-span-3 lg:py-8 px-4 py-2 bg-gray-200 dark:bg-gray-900 lg:max-h-barHeight lg:min-h-barHeight max-h-[500px] h-full overflow-hidden lg:border-r-2 dark:border-gray-800 border-gray-300 border-solid lg:border-b-0">
      <div className="hidden lg:block">
        <h2 className="text-2xl font-bold dark:text-gray-100">My Groups:</h2>
        <TextInput
          placeholder="Type To Search"
          className="w-full mt-4 font-lg"
        />
        <GroupsContainer groups={groups} />
      </div>
      <div className="block lg:hidden">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full text-left flex justify-between items-center">
                <h2 className="text-lg font-bold dark:text-gray-100">
                  {" "}
                  My Groups:
                </h2>
                <TiArrowSortedDown
                  className={`w-[40px] h-[40px] text-gray-400 duration-200 ${
                    open && `rotate-180`
                  }`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-gray-500">
                <TextInput
                  placeholder="Type To Search"
                  className="w-full mt-4 font-lg"
                />
                <GroupsContainer groups={groups} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default GroupsBar;
