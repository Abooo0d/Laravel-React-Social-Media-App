import React, { useEffect, useRef, useState } from "react";
import { SecondaryButton, PrimaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
import "./index.css";
import TextInput from "../TextInput";
import { HiMiniXMark } from "react-icons/hi2";
import { Switch } from "@headlessui/react";
import axiosClient from "@/AxiosClient/AxiosClient";
const CreateGroupForm = ({ showForm, setShowForm, setGroups }) => {
  const [groupName, setGroupName] = useState("");
  const [groupAbout, setGroupAbout] = useState("");
  const [autoApproval, setAutoApproval] = useState(false);
  function close() {
    setShowForm(false);
  }
  const CreateGroup = () => {
    axiosClient
      .post(route("group.create"), {
        name: groupName,
        autoApproval: autoApproval,
        about: groupAbout,
      })
      .then(({ data }) => {
        setGroups((prevData) => [data.group, ...prevData]);
        setShowForm(false);
      });
  };
  useEffect(() => {
    if (showForm) {
      setGroupName("");
      setGroupAbout("");
      setAutoApproval(false);
    }
  }, [showForm]);

  return (
    <div
      className={`relative z-10 focus:outline-none delay-200 ${
        showForm ? "visible " : "invisible"
      }`}
    >
      <PopupCard showForm={showForm}>
        <SecondaryButton
          event={close}
          classes={"absolute top-[20px] right-[20px] py-1.5 px-3"}
        >
          <HiMiniXMark className="w-5 h-5 text-gray-200" />
        </SecondaryButton>
        <div as="h3" className="text-base/7 font-medium text-white mb-4">
          Create Group
        </div>

        <h2 className="text-gray-400 mb-2">Group Name:</h2>
        <TextInput
          placeholder="Group Name"
          classes=" w-[calc(100%-30px)] font-lg ml-4 "
          value={groupName}
          setValue={setGroupName}
        />
        <div className="flex justify-start items-center gap-4 my-4 h-[50px]">
          <h2 className="text-gray-400 mb-2">Auto Approval:</h2>
          <Switch
            checked={autoApproval}
            onChange={setAutoApproval}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-700/50 transition data-[checked]:bg-gray-600 duration-200"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
        </div>
        <h2 className="text-gray-400 mb-2">About The Group:</h2>
        <textarea
          placeholder="Your comment"
          className="flex-1 px-2 py-1 bg-gray-700/50 text-gray-400 placeholder:text-gray-600 resize-none overflow-scroll h-[80px] border-gray-800 rounded-md outline-none focus:border-gray-600 ring-0 focus:ring-0 duration-200 cursor-pointer w-[calc(100%-30px)] ml-4"
          value={groupAbout}
          onChange={(e) => setGroupAbout(e.target.value)}
        ></textarea>
        <div className="mt-4 gap-2 flex justify-end items-center">
          <PrimaryButton classes={"py-1.5 px-3"} event={() => CreateGroup()}>
            Create
          </PrimaryButton>
        </div>
      </PopupCard>
    </div>
  );
};

export default CreateGroupForm;
