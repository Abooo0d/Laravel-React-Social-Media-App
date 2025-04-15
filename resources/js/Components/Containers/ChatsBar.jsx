import React, { useState } from "react";
import TextInput from "../TextInput";
import ChatsContainer from "./ChatsContainer";
import { PiChatsCircle } from "react-icons/pi";
import { usePage } from "@inertiajs/react";
const ChatsBar = ({ setChat = () => {} }) => {
  const { auth, groupChats } = usePage().props;
  const [search, setSearch] = useState("");
  const [showChats, setShowChats] = useState(false);
  const [chatsData, setChatData] = useState(auth.user.friends);

  return (
    <div className="relative">
      <div className="lg:block hidden shadow-lg rounded-xl m-0 lg:rounded-none order-first max-w-full min-w-full lg:py-4 px-4 py-2 bg-gray-200 dark:bg-gray-900 max-h-barHeight min-h-barHeight h-full overflow-hidden border-r-2 dark:border-gray-800 border-gray-300 border-solid">
        <h2 className="block max-lg-hidden text-xl font-bold dark:text-gray-100 ">
          My Chats:
        </h2>
        <TextInput
          placeholder="Type To Search"
          classes="w-full mt-4 font-lg"
          value={search}
          setValue={setSearch}
        />
        <ChatsContainer
          chats={chatsData}
          groupChats={groupChats}
          setChat={setChat}
        />
      </div>
      <div className="block lg:hidden">
        <button
          className={`p-[4px] cursor-pointer z-[100] absolute top-[100px] duration-200 backdrop-blur-lg w-[40px] h-[50px] text-sm flex justify-center items-center flex-col bg-gray-800/80 border-[1px] border-gray-600/70 border-solid rounded-r-md border-l-0 text-gray-400
            ${showChats ? "left-[250px]" : "left-[0px]"}`}
          onClick={() => {
            setShowChats((prev) => !prev);
          }}
        >
          <PiChatsCircle className="w-[20px] h-[20px]" />
        </button>
        <div
          className={`absolute top-0 py-2 px-4 z-[100] left-0 h-full min-w-[250px] duration-200 bg-gray-900/80 backdrop-blur-lg border-r-[1px] border-solid border-gray-600/70
          ${showChats ? "left-0 " : "left-[-250px]"}`}
        >
          <h2 className="block max-lg:hidden text-xl font-bold dark:text-gray-100 ">
            My Chats:
          </h2>
          <TextInput
            placeholder="Type To Search"
            classes="w-full mt-4 font-lg"
            value={search}
            setValue={setSearch}
          />
          <ChatsContainer
            chats={chatsData}
            setChat={setChat}
            groupChats={groupChats}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatsBar;
