import { Tab } from "@headlessui/react";
import React from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const CustomTab = ({ text, key }) => {
  return (
    <Tab
      key={key}
      className={({ selected }) =>
        classNames(
          "duration-200 border-2 border-transparent py-2 lg:px-4 md:px-2 border-b-2 outline-none text-gray-800 dark:text-gray-300 ",
          selected
            ? "border-b-indigo-500 dark:text-indigo-300 text-indigo-500"
            : "border-b-transparent"
        )
      }
    >
      {text}
    </Tab>
  );
};

export default CustomTab;
