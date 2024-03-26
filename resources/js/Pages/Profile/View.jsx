import CustomTab from "@/Components/Shared/CustomTab";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Tab } from "@headlessui/react";
import React, { useState } from "react";
import Edit from "./Edit";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const View = ({ auth }) => {
  return (
    <Authenticated user={auth.user}>
      <div className="container mx-auto ">
        <div className="max-h-[350px] w-full relative">
          <img
            src="https://picsum.photos/2000/300"
            alt=""
            className="h-[300px] w-full object-cover "
          />
          <img
            src="https://picsum.photos/200"
            alt=""
            className="w-[200px] h-[200px] rounded-full absolute -bottom-[50px] left-20 "
          />
        </div>
        <div className="w-full">
          <Tab.Group>
            <Tab.List className="pl-[300px] flex p-1 gap-5 dark:bg-gray-800 bg-gray-100 rounded-b-md">
              <CustomTab text="About" />
              <CustomTab text="Posts" />
              <CustomTab text="Followers" />
              <CustomTab text="Friends" />
              <CustomTab text="Photos" />
            </Tab.List>
            <Tab.Panels className=" py-2 rounded-md mt-2">
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                <Edit />
              </Tab.Panel>
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-800 bg-gray-100 duration-200">
                  <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                    Posts Content
                  </h3>
                </div>
              </Tab.Panel>
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-800 bg-gray-100 duration-200">
                  <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                    Followers
                  </h3>
                </div>
              </Tab.Panel>
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-800 bg-gray-100 duration-200">
                  <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                    Friends
                  </h3>
                </div>
              </Tab.Panel>
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-800 bg-gray-100 duration-200">
                  <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                    Photos
                  </h3>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Authenticated>
  );
};

export default View;
