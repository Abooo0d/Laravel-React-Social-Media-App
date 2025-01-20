import React, { useEffect, useRef, useState } from "react";
import { SecondaryButton, PrimaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
import "./index.css";
import TextInput from "../TextInput";
import { HiMiniXMark } from "react-icons/hi2";
import { Switch } from "@headlessui/react";
import axiosClient from "@/AxiosClient/AxiosClient";
import { GoArrowUp } from "react-icons/go";
import { useMainContext } from "@/Contexts/MainContext";
const InviteUserForm = ({ showForm, setShowForm, group }) => {
  const [email, setEmail] = useState("");
  const { setErrors, setSuccessMessage } = useMainContext();
  function close() {
    setShowForm(false);
  }
  useEffect(() => {
    setEmail("");
  }, [showForm]);
  const inviteUser = () => {
    axiosClient
      .post(route("group.inviteUser", group.slug), {
        email: email,
      })
      .then((res) => {
        setSuccessMessage("User Have Been Invited Successfully");
        setShowForm(false);
      })
      .catch((err) => {
        setErrors([err.response.data.message]);
      });
  };
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
          Invite User
        </div>

        <h2 className="text-gray-400 mb-2">Username Or Email:</h2>
        <TextInput
          // placeholder="Username Or Email"
          classes=" w-[calc(100%-30px)] font-lg ml-4 "
          value={email}
          setValue={setEmail}
        />
        <div className="mt-4 gap-2 flex justify-end items-center">
          <PrimaryButton classes={"py-1.5 px-3"} event={() => inviteUser()}>
            Invite
          </PrimaryButton>
        </div>
      </PopupCard>
    </div>
  );
};

export default InviteUserForm;
