import React, { useEffect, useState } from "react";
import { SecondaryButton, PrimaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
import "./index.css";
import TextInput from "../TextInput";
import { HiMiniXMark } from "react-icons/hi2";
import { Switch } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
const CreateGroupForm = ({ showForm, setShowForm }) => {
  const [groupName, setGroupName] = useState("");
  const [groupAbout, setGroupAbout] = useState("");
  const [autoApproval, setAutoApproval] = useState(false);
  function close() {
    setShowForm(false);
  }
  const { data, post, processing } = useForm({
    name: groupName,
    autoApproval: autoApproval,
    about: groupAbout,
  });
  useEffect(() => {
    data.about = groupAbout;
    data.autoApproval = autoApproval;
    data.name = groupName;
  }, [groupName, groupAbout, autoApproval]);
  const CreateGroup = () => {
    try {
      post(route("group.create"), {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (showForm) {
      setGroupName("");
      setGroupAbout("");
      setAutoApproval(false);
    }
  }, [showForm]);

  return (
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
        className="flex-1 px-2 py-1 bg-gray-700/50 text-gray-400 placeholder:text-gray-500 resize-none overflow-scroll h-[80px] border-gray-800 rounded-md outline-none focus:border-gray-600 ring-0 focus:ring-0 duration-200 cursor-pointer w-[calc(100%-30px)] ml-4"
        value={groupAbout}
        onChange={(e) => setGroupAbout(e.target.value)}
      ></textarea>
      <div className="mt-4 gap-2 flex justify-end items-center">
        <PrimaryButton
          classes={"py-1.5 px-3"}
          event={() => CreateGroup()}
          enabled={processing}
        >
          Create
        </PrimaryButton>
      </div>
    </PopupCard>
  );
};

export default CreateGroupForm;
