import React, { useEffect, useState } from "react";
import { PrimaryButton } from "./Buttons";
import TextInput from "../TextInput";
import { Switch } from "@headlessui/react";
import { router, usePage } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";

const GroupAboutForm = (props) => {
  const { flash } = usePage().props;
  const { setSuccessMessage } = useMainContext();
  useEffect(() => {
    flash?.success && setSuccessMessage(flash.success);
  }, [flash]);

  let group = props.group;

  const [groupName, setGroupName] = useState(group.name);
  const [autoApproval, setAutoApproval] = useState(
    !!parseInt(group.auto_approval)
  );

  const [groupAbout, setGroupAbout] = useState(group.about);
  const submit = () => {
    router.put(
      route("group.update", group),
      {
        name: groupName,
        about: groupAbout,
        auto_approval: autoApproval,
      },
      {
        _method: "PUT",
        onSuccess: (data) => {},
      }
    );
  };
  return (
    <div className="w-full flex flex-col gap-2 bg-gray-900 px-8 py-4 rounded-md">
      <h2 className="text-gray-400 mb-2">Group Name:</h2>
      <TextInput
        placeholder="Group Name"
        classes=" w-[calc(100%-30px)] font-lg ml-4 bg-gray-800"
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
        className="flex-1 px-2 py-1 bg-gray-800 text-gray-400 placeholder:text-gray-500 resize-none overflow-scroll h-[80px] border-gray-800 rounded-md outline-none focus:border-gray-600 ring-0 focus:ring-0 duration-200 cursor-pointer w-[calc(100%-30px)] ml-4"
        value={groupAbout}
        onChange={(e) => setGroupAbout(e.target.value)}
      ></textarea>
      <PrimaryButton
        classes="w-fit px-4 py-2 ml-auto mr-4"
        event={() => {
          submit();
        }}
      >
        Submit
      </PrimaryButton>
    </div>
  );
};

export default GroupAboutForm;
