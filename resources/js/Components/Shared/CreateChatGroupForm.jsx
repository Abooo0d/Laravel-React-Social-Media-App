import React, { useEffect, useState } from "react";
import PopupCard from "./PopupCard";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { HiMiniXMark } from "react-icons/hi2";
import TextInput from "../TextInput";
import { useForm } from "@inertiajs/react";
import { IoSearchOutline } from "react-icons/io5";
import axiosClient from "@/AxiosClient/AxiosClient";
import GroupeCard from "./GroupeCard";
import InviteUserForChatGroupCard from "./InviteUserForChatGroupCard";
import Spinner from "./Spinner";
import { useMainContext } from "@/Contexts/MainContext";
import { useChatsContext } from "@/Contexts/ChatsContext";
const CreateChatGroupForm = ({ showForm, setShowForm }) => {
  const { setSuccessMessage } = useMainContext();
  const { setGroupChats } = useChatsContext();
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [didSearch, setDidSearch] = useState(false);
  const [addedUsers, setAddedUsers] = useState([]);
  const [creating, setCreating] = useState(false);
  const addUser = (user) => {
    let users = addedUsers?.filter((u) => u.id != user.id);
    users.push(user);
    setAddedUsers(users);
  };
  const removeUser = (user) => {
    let users = addedUsers?.filter((u) => u != user);
    setAddedUsers(users);
  };
  const { data, setData } = useForm({
    name: name,
  });
  useEffect(() => {
    setData({ name: searchName });
  }, [searchName]);
  const close = () => {
    setShowForm(false);
  };
  const search = () => {
    setLoading(true);
    setDidSearch(true);
    setSearchResult([]);
    setMessage("");
    axiosClient
      .post(route("user.searchForUser"), data)
      .then((data) => {
        setSearchResult(data.data.followers);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((e) => {
        setMessage("An error occurred");
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };
  const createChatGroup = () => {
    if (name != "") {
      if (!creating) {
        setCreating(true);
        axiosClient
          .post(route("chat.createGroupChat"), {
            chat_name: name,
            users: addedUsers.map((user) => user.id),
          })
          .then(({ data }) => {
            setGroupChats((prev) => [data.chat, ...prev]);
            setCreating(false);
            setShowForm(false);
            setSuccessMessage(`Chat '${name}' has Been Created Successfully`);
          })
          .catch((error) => {
            console.log(error);
            setCreating(false);
            setErrors([
              error?.response?.data?.message || "Some Thing Went Wrong",
            ]);
          });
      }
    }
  };
  useEffect(() => {
    setName("");
    setLoading(false);
    setDidSearch(false);
    setMessage("");
    setSearchResult([]);
    setSearchName("");
    setAddedUsers([]);
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
        Create New GroupChat
      </div>
      <h2 className="text-gray-400 mb-2">Group Name:</h2>
      <div className="relative w-full">
        <TextInput
          placeholder="Name"
          classes=" w-[calc(100%-30px)] font-lg ml-4 "
          value={name}
          setValue={setName}
        />
      </div>
      <h2 className="text-gray-400 mb-2">Add Members:</h2>
      <div className="relative w-full">
        <TextInput
          placeholder="Name Or Email:"
          classes=" w-[calc(100%-30px)] font-lg ml-4 "
          value={searchName}
          setValue={setSearchName}
        />
        <span
          className="absolute top-[6px] right-[24px] px-2 py-2 z-[10] w-[30px] h-[30px] flex justify-center items-center dark:bg-gray-800 dark:hover:bg-gray-800 dark:text-gray-200 bg-gray-200 hover:bg-gray-300 text-gray-600 font-thin duration-200 border-[1px] border-solid dark:border-gray-700 border-gray-400 rounded-md cursor-pointer"
          onClick={search}
        >
          <IoSearchOutline className={`absolute duration-200 `} />
        </span>
      </div>
      {addedUsers.length > 0 && (
        <div className="w-full flex justify-start items-start flex-wrap gap-2 h-fit p-4">
          {addedUsers.map((user, index) => (
            <span
              className="px-2 py-1 rounded-md bg-gray-700/50 text-gray-300 relative cursor-default w-fit"
              key={index}
            >
              {user.name}
              <span
                className="flex justify-center items-center rounded-full text-gray-300 2-4 h-4 cursor-pointer absolute top-[-5px] right-[-5px] bg-gray-600 border-solid border-gray-500/50 border-[1px] backdrop-blur-md"
                onClick={() => removeUser(user)}
              >
                <HiMiniXMark />
              </span>
            </span>
          ))}
        </div>
      )}
      {didSearch && (
        <>
          <>
            {loading ? (
              <div className="w-[40px] min-h-[40px] mt-8 bg-transparent border-[2px] rounded-full border-t-gray-600 border-t-[4px] border-gray-700/50 border-top-gray-900 mx-auto my-1 animate-spin" />
            ) : (
              <>
                {searchResults.length > 0 ? (
                  <div className="w-full grid gap-2 md:grid-cols-2 grid-cols-1 p-4 max-h-[300px] overflow-auto">
                    {searchResults?.map((user, index) => (
                      <InviteUserForChatGroupCard
                        user={user}
                        key={index}
                        addUser={addUser}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full text-gray-500 text-center p-4">
                    No Users With This Name
                  </div>
                )}
              </>
            )}
          </>
        </>
      )}
      <div className="mt-4 gap-2 flex justify-end items-center px-4">
        <PrimaryButton
          classes={"py-1.5 px-3 flex justify-center items-center gap-2"}
          event={() => createChatGroup()}
          // enabled={processing}
        >
          Create
          {creating && <Spinner size="small" />}
        </PrimaryButton>
      </div>
      {message && (
        <div className="w-full text-red-500 text-left p-4">{message}</div>
      )}
    </PopupCard>
  );
};

export default CreateChatGroupForm;
