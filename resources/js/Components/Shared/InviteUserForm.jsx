import React, { useEffect, useState } from "react";
import { SecondaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
import TextInput from "../TextInput";
import { HiMiniXMark } from "react-icons/hi2";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useForm } from "@inertiajs/react";
import { IoSearchOutline } from "react-icons/io5";
import InviteUserForGroupCard from "./InviteUserForGroupCard";
const InviteUserForm = ({ showForm, setShowForm, group }) => {
  const [name, setName] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [didSearch, setDidSearch] = useState(false);
  const [message, setMessage] = useState();
  const { data, post, get, processing, setData } = useForm({
    name: name,
  });
  function close() {
    setShowForm(false);
  }
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
        setMessage(errors.user_id || "An error occurred");
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };
  useEffect(() => {
    setName("");
    setLoading(false);
    setDidSearch(false);
    setMessage("");
    setSearchResult([]);
  }, [showForm]);
  useEffect(() => {
    setData("name", name);
  }, [name]);
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
        <div className="relative w-full">
          <TextInput
            placeholder="Name Or Email:"
            classes=" w-[calc(100%-30px)] font-lg ml-4 "
            value={name}
            setValue={setName}
          />
          <span
            className="absolute top-[6px] right-[24px] px-2 py-2 z-[10] w-[30px] h-[30px] flex justify-center items-center bg-gray-800 hover:bg-gray-800 text-gray-200 font-thin duration-200 border-[1px] border-solid border-gray-700 rounded-md cursor-pointer"
            onClick={search}
          >
            <IoSearchOutline className={`absolute duration-200 `} />
          </span>
        </div>
        {didSearch && (
          <>
            <>
              {loading ? (
                <div className="w-[40px] min-h-[40px] mt-8 bg-transparent border-[2px] rounded-full border-t-gray-600 border-t-[4px] border-gray-700/50 border-top-gray-900 mx-auto my-1 animate-spin" />
              ) : (
                <>
                  {searchResults.length > 0 ? (
                    <div className="w-full grid gap-2 col md:grid-cols-2 grid-cols-1 p-4 max-h-[300px] overflow-auto">
                      {searchResults?.map((user, index) => (
                        <InviteUserForGroupCard
                          key={index}
                          user={user}
                          data={data}
                          group={group}
                          setErrors={setMessage}
                          setShowForm={setShowForm}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="w-full text-gray-500 text-center p-4">
                      No One With This Name
                    </div>
                  )}
                </>
              )}
            </>
          </>
        )}
        {message && (
          <div className="w-full text-red-500 text-left p-4">{message}</div>
        )}
      </PopupCard>
    </div>
  );
};

export default InviteUserForm;
