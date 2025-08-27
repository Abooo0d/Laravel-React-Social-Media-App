import React, { useEffect, useState } from "react";
import ChatsContainer from "./ChatsContainer";
import { PiChatsCircle } from "react-icons/pi";
import axiosClient from "@/AxiosClient/AxiosClient";
import Spinner from "../Shared/Spinner";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import CreateChatGroupForm from "../Shared/CreateChatGroupForm";
const ChatsBar = ({ setIsLoading }) => {
  const [showChats, setShowChats] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [didSearch, setDidSearch] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);

  const search = () => {
    setLoading(true);
    setDidSearch(true);
    setSearchResult([]);
    setMessage("");
    axiosClient
      .post(route("chat.searchForChat"), { name: searchName })
      .then((data) => {
        setSearchResult(data.data.chats);
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
  useEffect(() => {
    if (searchName?.trim() == "") {
      setDidSearch(false);
    }
  }, [searchName]);

  return (
    <div className="relative z-[101]">
      <div className=" max-h-barHeight h-full w-[270px] lg:flex hidden flex-col gap-2 py-2 dark:bg-gray-900 bg-white px-2 border-r-solid dark:border-r-gray-500/50 border-r-gray-300 border-r-[1px]">
        <h2 className="block max-lg-hidden text-xl font-bold dark:text-gray-300 text-gray-600 pl-4 pt-2 cursor-default">
          My Chats:
        </h2>
        <div className="flex justify-between items-center dark:bg-gray-700 bg-gray-300 rounded-md mt-1 ">
          <input
            type="text"
            name="search"
            placeholder="Type To Search"
            className="bg-transparent flex-1 dark:text-gray-400 text-gray-600 outline-none ring-0 border-none hover:ring-0 focus:ring-0 max-w-[190px]"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button
            className="min-w-[30px] max-w-[30px] min-h-[40px] flex justify-center items-center text-gray-400"
            onClick={() => search()}
          >
            <FaSearch />
          </button>
          <button
            className="min-w-[30px] max-w-[30px] min-h-[40px] flex justify-center items-center text-gray-400"
            onClick={() => setShowCreateGroupForm(true)}
          >
            <FaPlus />
          </button>
        </div>
        <div className="flex-1 overflow-auto flex justify-center items-start">
          {loading ? (
            <div className="w-full h-fit flex justify-center items-center py-4">
              <Spinner />
            </div>
          ) : (
            <ChatsContainer
              setShow={setShowChats}
              setIsLoading={setIsLoading}
              searchResults={searchResults}
              searchName={searchName}
              didSearch={didSearch}
            />
          )}
        </div>
      </div>
      <button
        className={`p-[4px] cursor-pointer z-[101] absolute top-[100px] duration-200 backdrop-blur-lg w-[40px] h-[50px] text-sm flex lg:hidden justify-center items-center flex-col bg-gray-800/80 border-[1px] border-gray-600/70 border-solid rounded-r-md border-l-0 text-gray-400
            ${showChats ? "left-[270px]" : "left-[0px]"}`}
        onClick={() => {
          setShowChats((prev) => !prev);
        }}
      >
        <PiChatsCircle className="w-[20px] h-[20px]" />
      </button>

      <div
        className={`absolute z-[100] top-0 max-h-barHeight h-full w-[270px] flex lg:hidden flex-col gap-2 py-2 bg-gray-900 px-2 duration-200 border-r-solid border-r-gray-500/50 border-r-[1px]
          ${showChats ? "left-0 " : "left-[-270px]"}`}
      >
        <h2 className="block text-xl font-bold dark:text-gray-300 pl-4 pt-2 cursor-default">
          My Chats:
        </h2>
        <div className="flex justify-between items-center bg-gray-700 rounded-md mt-1 ">
          <input
            type="text"
            name="search"
            placeholder="Type To Search"
            className="bg-transparent flex-1 text-gray-400 outline-none ring-0 border-none hover:ring-0 focus:ring-0 max-w-[190px]"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button
            className="min-w-[30px] max-w-[30px] min-h-[40px] flex justify-center items-center text-gray-400"
            onClick={() => search()}
          >
            <FaSearch />
          </button>
          <button
            className="min-w-[30px] max-w-[30px] min-h-[40px] flex justify-center items-center text-gray-400"
            onClick={() => setShowCreateGroupForm(true)}
          >
            <FaPlus />
          </button>
        </div>
        <div className="flex-1 overflow-auto flex justify-start items-start">
          {loading ? (
            <div className="w-full h-fit flex justify-center items-center py-4">
              <Spinner />
            </div>
          ) : (
            <ChatsContainer
              setShow={setShowChats}
              setIsLoading={setIsLoading}
              searchResults={searchResults}
              searchName={searchName}
              didSearch={didSearch}
            />
          )}
        </div>
      </div>

      <CreateChatGroupForm
        showForm={showCreateGroupForm}
        setShowForm={setShowCreateGroupForm}
      />
    </div>
  );
};

export default ChatsBar;
