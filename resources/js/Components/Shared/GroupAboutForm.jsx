import React, { useEffect, useState, useRef } from "react";
import { PrimaryButton } from "./Buttons";
import TextInput from "../TextInput";
import { Switch } from "@headlessui/react";
import { router, usePage } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";

const GroupAboutForm = ({ group, setGroup }) => {
  const { flash } = usePage().props;
  const { setSuccessMessage, setErrors } = useMainContext();
  useEffect(() => {
    flash?.success && setSuccessMessage(flash.success);
  }, [flash]);
  const { refetchGroups } = useUserContext();
  const [groupName, setGroupName] = useState(group.name);
  const [groupAbout, setGroupAbout] = useState(group.about);
  const [autoApproval, setAutoApproval] = useState(
    !!parseInt(group.auto_approval)
  );
  const textareaRef = useRef(null);

  useEffect(() => {
    setGroupName(group.name);
    setGroupAbout(group.about);
    setAutoApproval(!!parseInt(group.auto_approval));
  }, [group]);

  const submit = () => {
    router.put(
      route("group.update", group.slug),
      {
        name: groupName,
        about: groupAbout,
        auto_approval: autoApproval,
      },
      {
        onSuccess: () => {
          setGroup({
            ...group,
            name: groupName,
            about: groupAbout,
            auto_approval: autoApproval,
          });
          refetchGroups();
        },

        onError: (error) => {
          console.log("Something went wrong", error);
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        },
      }
    );
  };
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.minHeight = "100px";
      textarea.style.minHeight = `${textarea.scrollHeight}px`;
    }
  };
  return (
    <div className="w-full flex flex-col gap-2 dark:bg-gray-900 bg-gray-200 px-8 py-4 rounded-md">
      <h2 className="dark:text-gray-400 text-gray-600 mb-2">Group Name:</h2>
      <TextInput
        placeholder="Group Name"
        classes=" w-[calc(100%-30px)] font-lg ml-4"
        value={groupName}
        setValue={setGroupName}
      />
      <div className="flex justify-start items-center gap-4 my-4 h-[50px]">
        <h2 className="dark:text-gray-400 text-gray-600 mb-2">
          Auto Approval:
        </h2>
        <Switch
          checked={autoApproval}
          onChange={setAutoApproval}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-700/50 transition data-[checked]:bg-gray-600 duration-200"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
      </div>
      <h2 className="dark:text-gray-400 text-gray-600 mb-2">
        About The Group:
      </h2>
      <textarea
        ref={textareaRef}
        placeholder="Your comment"
        onInput={handleInput}
        className="flex-1 dark:bg-gray-800 bg-gray-300 outline-none border-none focus:outline-none rounded-md focus:border-non  e ring-0 focus:ring-0 dark:text-gray-300 text-gray-600 resize-none h-auto min-h-[40px] max-h-[150px] "
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
