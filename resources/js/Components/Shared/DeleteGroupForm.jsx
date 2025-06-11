import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
// import SecondaryButton from "@/Components/SecondaryButton";
// import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";
import axiosClient from "@/AxiosClient/AxiosClient";
import PopupCard from "./PopupCard";
import { SecondaryButton } from "./Buttons";
import TextInput from "../TextInput";

export default function DeleteGroupForm({ group }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const [name, setName] = useState();
  const { setErrors, setSuccessMessage } = useMainContext();
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteGroup = () => {
    if (name == "") {
      setErrors(["Please Insert The Group Name"]);
      return;
    }
    if (name !== group.name) {
      setErrors(["The Group Name Is Wrong"]);
      return;
    }
    axiosClient
      .delete(route("group.destroy", group.slug))
      .then(() => {
        setSuccessMessage(
          "Your Request Has Been Received You Will Be Notified When The Group Is Deleted"
        );
        setConfirmingUserDeletion(false);
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some THing Wen Wrong"]);
        setConfirmingUserDeletion(false);
      });
  };
  return (
    <div className="w-full flex flex-col gap-8 bg-gray-900 px-8 py-4 rounded-md p-6">
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Delete Group
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Once the group is deleted, all of its resources and data will be
          permanently deleted. Before deleting the group, please download any
          data or information that you wish to retain.
        </p>
      </header>
      <div className="w-full flex justify-end items-center">
        <DangerButton onClick={confirmUserDeletion}>Delete Group</DangerButton>
      </div>
      <PopupCard showForm={confirmingUserDeletion}>
        {/* <Modal show={confirmingUserDeletion} onClose={closeModal}> */}
        {/* <form onSubmit={} className="p-6"> */}
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Are you sure you want to delete this group?
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Once the group is deleted, all of its resources and data will be
          permanently deleted. Before deleting the group, please download any
          data or information that you wish to retain.
        </p>
        <div className="mt-6">
          <InputLabel htmlFor="password" value="Password" className="sr-only" />
          <TextInput
            type="text"
            value={name}
            setValue={setName}
            classes="mt-1 block w-full"
            placeholder="Group Name"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <SecondaryButton
            event={() => {
              setConfirmingUserDeletion(false);
            }}
            classes="px-3 py-1.5"
          >
            Cancel
          </SecondaryButton>
          <DangerButton
            className="ms-3"
            onClick={() => {
              deleteGroup();
            }}
          >
            Delete Group
          </DangerButton>
        </div>
        {/* </form> */}
        {/* </Modal> */}
      </PopupCard>
    </div>
  );
}
