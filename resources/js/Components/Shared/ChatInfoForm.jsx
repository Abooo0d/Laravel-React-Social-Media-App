import { useChatsContext } from "@/Contexts/ChatsContext";
import React from "react";
import PopupCard from "./PopupCard";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "@inertiajs/react";

const ChatInfoForm = () => {
  const { currentChat, showChatInfo, setShowChatInfo } = useChatsContext();
  const [showMembers, setShowMembers] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [attachments, setAttachments] = useState(
    currentChat?.messages
      ?.filter((message) => message.attachments.length > 0)
      ?.flatMap((message) => message.attachments)
  );
  const close = () => setShowChatInfo(false);
  return (
    <div
      className={`fixed inset-0 z-[800] w-screen overflow-y-auto flex min-h-full items-center justify-center bg-gray-950/60 backdrop-blur-sm duration-200 ${
        showChatInfo ? `visible opacity-100` : `invisible opacity-0 scale-[95%]`
      }`}
    >
      <div className="flex justify-start items-center flex-col gap-4 animate-scaleUp h-fit max-h-[90%] w-[500px] max-w-[90%] rounded-lg relative bg-gray-900/60 border-solid border-[1px] border-gray-700 backdrop-blur-md overflow-auto">
        <SecondaryButton
          event={close}
          classes={"absolute top-[20px] right-[20px] py-1.5 px-3 z-10"}
        >
          <HiMiniXMark className="w-5 h-5 text-gray-200" />
        </SecondaryButton>
        <div className=" relative flex flex-col items-center justify-start pt-8 w-full z-0">
          <img
            src={currentChat?.avatar_url}
            alt=""
            className="w-[100px] h-[100px] rounded-full border-solid border-[1px] border-gray-500/50"
          />
          <h2 className="w-fit text-gray-300 text-lg px-4 py-2 m-0 ">
            {currentChat?.name}
          </h2>
          {currentChat?.is_group ? (
            <h2 className="w-fit text-gray-500 text-lg p-0 m-0">
              Group {currentChat?.users.length} members
            </h2>
          ) : (
            <h2 className="w-fit text-gray-500 text-lg p-0 m-0">
              {currentChat?.data?.email}
            </h2>
          )}
        </div>
        <div className="flex justify-center items-center gap-3">
          <PrimaryButton classes="px-3 py-1.5">Audio</PrimaryButton>
          <PrimaryButton classes="px-3 py-1.5">Video</PrimaryButton>
          <PrimaryButton classes="px-3 py-1.5">Search</PrimaryButton>
        </div>
        <div className="flex flex-col justify-start items-center w-full">
          <div className="flex justify-between items-center w-full text-gray-500 px-4 border-t-solid border-b-0 border-[1px] border-gray-500/50 border-x-0 py-4 bg-gray-800/50">
            <h2>Created At:</h2>
            <h2 className="text-[15px]">{currentChat?.created_at}</h2>
          </div>
          <div className="flex justify-between items-center w-full text-gray-500 px-4 border-t-solid border-b-0 border-[1px] border-gray-500/50 border-x-0 py-4 bg-gray-800/50">
            <h2>Messages:</h2>
            <h2>{currentChat?.messages?.length}</h2>
          </div>
          <div className="flex flex-col justify-start items-center w-full text-gray-500 px-4 border-t-solid border-b-0 border-[1px] border-gray-500/50 border-x-0 py-4 bg-gray-800/50">
            <div className="flex justify-between items-center w-full">
              <h2>Attachments:</h2>
              <h2>{attachments?.length > 0 ? attachments.length : 0}</h2>
            </div>
            <div></div>
          </div>
          {currentChat?.is_group && (
            <div
              className="flex flex-col justify-start items-center w-full text-gray-500 px-4 border-t-solid border-b-0 border-[1px] border-gray-500/50 border-x-0 py-4 bg-gray-800/50 cursor-pointer duration-200"
              onClick={() => {
                setShowMembers((prev) => !prev);
              }}
            >
              <div className="flex justify-between items-center w-full">
                <h2>Members:</h2>
                <div className="flex justify-center items-center gap-2">
                  <FaAngleRight
                    className={`w-6 h-6 duration-200 ${
                      showMembers ? "-rotate-90" : "rotate-90"
                    }`}
                  />
                  <h2>{currentChat?.users?.length}</h2>
                </div>
              </div>
              <div
                className={`w-full px-4 flex flex-col justify-start items-center duration-200 overflow-auto max-h-[200px]  ${
                  showMembers
                    ? "h-[150px] opacity-100 py-2 "
                    : " h-0 opacity-0 "
                }`}
              >
                {currentChat?.users?.map((user, index) => (
                  <Link
                    className="w-full flex justify-start gap-4 items-center hover:bg-gray-800/50 duration-200 rounded-md px-2 py-2"
                    key={index}
                    href={route("profile.view", user?.name)}
                  >
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    <h2>{user.name}</h2>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        s
        <div className="flex justify-center items-center gap-4 w-full pb-4">
          {currentChat?.is_group ? (
            <button className="bg-red-500/30 border-[1px] border-solid border-red-500 px-4 py-2 text-gray-200 rounded-md w-[150px] hover:bg-red-500/50 duration-200">
              Leave
            </button>
          ) : (
            <button className="bg-red-500/30 border-[1px] border-solid border-red-500 px-4 py-2 text-gray-200 rounded-md w-[150px] hover:bg-red-500/50 duration-200">
              Block
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInfoForm;
