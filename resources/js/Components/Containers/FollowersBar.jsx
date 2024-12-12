import React, { useState } from "react";
import FollowersContainer from "./FollowersContainer";
import TextInput from "../TextInput";
import { Disclosure } from "@headlessui/react";
import { TiArrowSortedDown } from "react-icons/ti";
const FollowersBar = ({ followers }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="shadow-lg rounded-xl lg:rounded-none order-1 lg:order-2 col-span-3 lg:py-8 px-4 py-2 bg-gray-200 dark:bg-gray-900 lg:max-h-barHeight lg:min-h-barHeight max-h-[500px] h-full overflow-hidden border-l-2 dark:border-gray-800 border-gray-300 border-solid">
      <div className="hidden lg:block">
        <h2 className="text-2xl font-bold dark:text-gray-100">My Followers:</h2>
        <TextInput
          placeholder="Type To Search"
          classes="w-full mt-4 font-lg"
          value={search}
          setValue={setSearch}
        />
        <FollowersContainer followers={followers} />
      </div>
      <div className="block lg:hidden">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full text-left flex justify-between items-center">
                {" "}
                <h2 className="text-lg font-bold dark:text-gray-100">
                  My Followers:
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
                <FollowersContainer followers={followers} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default FollowersBar;
