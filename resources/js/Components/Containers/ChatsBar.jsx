import React, { useEffect, useState } from "react";
import TextInput from "../TextInput";
import ChatsContainer from "./ChatsContainer";
import { PiChatsCircle } from "react-icons/pi";
import SearchForChatForm from "../Shared/SearchForChatForm";
import { PrimaryButton } from "../Shared/Buttons";
import axiosClient from "@/AxiosClient/AxiosClient";
import Spinner from "../Shared/Spinner";
import { FaSearch } from "react-icons/fa";
const ChatsBar = ({ setIsLoading }) => {
  const [showChats, setShowChats] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [didSearch, setDidSearch] = useState(false);

  const search = () => {
    setLoading(true);
    setDidSearch(true);
    setSearchResult([]);
    setMessage("");
    axiosClient
      .post(route("chat.searchForChat"), { name: searchName })
      .then((data) => {
        setSearchResult(data.data.chats);
        console.log(data.data.chats, "Abood");
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
    <div className="relative">
      <div className="lg:block hidden shadow-lg rounded-xl m-0 lg:rounded-none order-first max-w-full min-w-full py-2 bg-gray-200 dark:bg-gray-900 max-h-barHeight min-h-barHeight h-full overflow-hidden border-r-2 dark:border-gray-800 border-gray-300 border-solid">
        <h2 className="block max-lg-hidden text-xl font-bold dark:text-gray-300 pl-4 pt-2 cursor-default">
          My Chats:
        </h2>

        <div className="min-w-full h-fit flex justify-center items-center px-2 gap-2">
          <div className="flex justify-between items-center bg-gray-700 rounded-md mt-1">
            <input
              type="text"
              name="search"
              placeholder="Type To Search"
              className="bg-transparent flex-3 text-gray-300 outline-none ring-0 border-none hover:ring-0 focus:ring-0 max-w-[200px]"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <button
              className="min-w-[40px] max-w-[40px] min-h-[40px] flex-1 flex justify-center items-center text-gray-300"
              onClick={() => search()}
            >
              <FaSearch />
            </button>
          </div>
        </div>
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
      <div className="block lg:hidden">
        <button
          className={`p-[4px] cursor-pointer z-[100] absolute top-[100px] duration-200 backdrop-blur-lg w-[40px] h-[50px] text-sm flex justify-center items-center flex-col bg-gray-800/80 border-[1px] border-gray-600/70 border-solid rounded-r-md border-l-0 text-gray-400
            ${showChats ? "left-[255px]" : "left-[0px]"}`}
          onClick={() => {
            setShowChats((prev) => !prev);
          }}
        >
          <PiChatsCircle className="w-[20px] h-[20px]" />
        </button>
        <div
          className={`flex flex-col absolute top-0 py-2 z-[100] left-0 h-full min-w-[250px] duration-200 bg-gray-900/80 backdrop-blur-lg border-r-[1px] border-solid border-t-[1px] border-gray-600/70
          ${showChats ? "left-0 " : "left-[-260px]"}`}
        >
          <h2 className="block max-lg:hidden text-xl font-bold dark:text-gray-100 ">
            My Chats:
          </h2>
          <div className="min-w-full h-fit flex justify-center items-center px-2 gap-2">
            <div className="flex justify-between items-center bg-gray-700 rounded-md mt-1">
              <input
                type="text"
                name="search"
                placeholder="Type To Search"
                className="bg-transparent flex-3 text-gray-300 outline-none ring-0 border-none hover:ring-0 focus:ring-0 max-w-[200px]"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button
                className="min-w-[40px] max-w-[40px] min-h-[40px] flex-1 flex justify-center items-center text-gray-300"
                onClick={() => search()}
              >
                <FaSearch />
              </button>
            </div>
          </div>
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
    </div>
  );
};

export default ChatsBar;
