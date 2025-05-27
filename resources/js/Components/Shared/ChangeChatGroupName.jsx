import React from "react";
import PopupCard from "./PopupCard";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
import TextInput from "../TextInput";
import { useChatsContext } from "@/Contexts/ChatsContext";
import { useEffect } from "react";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";

const ChangeChatGroupName = ({ showForm, setShowForm }) => {
  const { currentChat, setCurrentChat } = useChatsContext();
  const [name, setName] = useState(currentChat?.name || "");
  const { setErrors, setSuccessMessage } = useMainContext();
  const close = () => {
    setShowForm(false);
  };

  const ChangeName = () => {
    if (currentChat.name !== name) {
      axiosClient
        .post(route("chat.changeName", currentChat.id), {
          name: name,
        })
        .then((data) => {
          console.log(data);
          setSuccessMessage(data.data.message);
          setCurrentChat((prev) => ({ ...prev, name: name }));
          setShowForm(false);
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        });
    }
  };
  useEffect(() => {
    if (showForm) setName(currentChat?.name);
  }, [showForm]);

  return (
    <PopupCard showForm={showForm}>
      <SecondaryButton
        event={close}
        classes={"absolute top-[20px] right-[20px] py-1.5 px-3"}
      >
        <HiMiniXMark className="w-5 h-5 text-gray-200" />
      </SecondaryButton>
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <h2 className="w-full text-gray-300 m-0 cursor-default text-lg">
          Change Chat Name
        </h2>
        <TextInput
          placeholder="Name"
          classes=" w-[calc(100%-30px)] font-lg ml-4 "
          value={name}
          setValue={setName}
        />
        <div className="flex-1 flex justify-end w-full">
          <PrimaryButton
            classes={`py-1.5 px-3 flex justify-center items-center gap-2`}
            event={() => ChangeName()}
          >
            Update
            {/* {creating && <Spinner size="small" />} */}
          </PrimaryButton>
        </div>
      </div>
    </PopupCard>
  );
};

export default ChangeChatGroupName;
