import React, { useEffect, useState, useRef } from "react";
import { PrimaryButton } from "./Buttons";
import TextInput from "../TextInput";
import { Switch } from "@headlessui/react";
import { router, usePage } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";

const GroupAboutForm = (props) => {
  const { flash } = usePage().props;
  const { setSuccessMessage } = useMainContext();
  const [group, setGroup] = useState(props.group);
  useEffect(() => {
    flash?.success && setSuccessMessage(flash.success);
  }, [flash]);

  const [groupName, setGroupName] = useState(props.group.name);
  const [groupAbout, setGroupAbout] = useState(props.group.about);
  const [autoApproval, setAutoApproval] = useState(
    !!parseInt(props.group.auto_approval)
  );
  const textareaRef = useRef(null);

  useEffect(() => {
    setGroup(props?.group);
    setGroupName(props?.group.name);
    setGroupAbout(props?.group.about);
    setAutoApproval(!!parseInt(props?.group.auto_approval));
    handleInput();
  }, [props?.group]);

  useEffect(() => {
    handleInput();
  }, [groupAbout]);

  const submit = () => {
    router.put(route("group.update", group.slug), {
      name: groupName,
      about: groupAbout,
      auto_approval: autoApproval,
    });
  };
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.minHeight = "100px";
      textarea.style.minHeight = `${textarea.scrollHeight}px`;
    }
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
        ref={textareaRef}
        placeholder="Your comment"
        // className=" px-2 py-1 bg-gray-800 text-gray-400 max-h-[300px] placeholder:text-gray-500 resize-none overflow-auto border-gray-800 rounded-md outline-none focus:border-gray-600 ring-0 focus:ring-0 duration-200 cursor-pointer w-[calc(100%-30px)] ml-4"
        className="flex-1 bg-gray-800 outline-none border-none focus:outline-none rounded-md focus:border-none ring-0 focus:ring-0 text-gray-300 resize-none h-auto min-h-[40px] max-h-[150px] "
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
