import { useChatsContext } from "@/Contexts/ChatsContext";
import React from "react";
import PopupCard from "./PopupCard";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
import { FaAngleRight, FaCheck } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import { TbLock } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { IoVolumeMute } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";
import { FaLock, FaLockOpen, FaRegTrashAlt } from "react-icons/fa";
import {
  PiSpeakerSimpleSlashFill,
  PiSpeakerSimpleHighFill,
} from "react-icons/pi";
import { useUserContext } from "@/Contexts/UserContext";
import { useEffect } from "react";
import ChatInfoAttachments from "./ChatInfoAttachments";
import { CiCamera } from "react-icons/ci";
import ChatInfoFormMenu from "./ChatInfoFormMenu";
import ChangeChatGroupName from "./ChangeChatGroupName";
import AddUsersToChatForm from "./AddUsersToChatForm";
const ChatInfoForm = () => {
  const { user } = useUserContext();
  const {
    currentChat,
    setCurrentChat,
    showChatInfo,
    setShowChatInfo,
    setCombinedChats,
  } = useChatsContext();
  const [showMembers, setShowMembers] = useState(false);
  const { setSuccessMessage, setErrors } = useMainContext();
  const [muteStatus, setMuteStatus] = useState(currentChat?.status?.muted);
  const [blockStatus, setBlockStatus] = useState(currentChat?.status?.blocked);
  const [attachments, setAttachments] = useState([]);
  const [chatImage, setChatImage] = useState(null);
  const [showChangeGroupNameForm, setShowChangeGroupNameForm] = useState(false);
  const [showAddUsersForm, setShowAddUsersForm] = useState(false);

  useEffect(() => {
    let att = currentChat?.messages?.filter(
      (message) => message.attachments.length > 0
    );
    let allFiles = [];
    att?.map((me) => {
      me?.attachments?.map((attachment) => {
        allFiles.push(attachment);
      });
    });
    setAttachments(allFiles);
    setChatImage(null);
  }, [currentChat]);

  const close = () => setShowChatInfo(false);
  const muteChat = () => {
    axiosClient
      .post(route("chat.mute", currentChat?.id), {
        mute: !muteStatus,
      })
      .then((data) => {
        setSuccessMessage(data.data.message);
        setCurrentChat((prev) => ({
          ...prev,
          status: {
            ...prev.status,
            muted: !prev.status.muted,
          },
        }));
        setMuteStatus((prev) => !prev);
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  const blockChat = () => {
    axiosClient
      .post(route("chat.block", currentChat.id), {
        block: !blockStatus,
      })
      .then((data) => {
        setSuccessMessage(data.data.message);
        setCurrentChat((prev) => ({
          ...prev,
          status: {
            ...prev.status,
            blocked: !prev.status.blocked,
          },
        }));
        setBlockStatus((prev) => !prev);
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  const leaveChatGroup = () => {
    axiosClient
      .post(route("chat.leave", currentChat.id))
      .then((data) => {
        setSuccessMessage(data.data.message);
        setCurrentChat({});
        setShowChatInfo(false);
      })
      .catch((error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      });
  };
  const deleteChat = () => {
    if (window.confirm("Are You Sure You Want To Delete This Chat Group")) {
      axiosClient
        .delete(route("chat.delete", currentChat.id))
        .then((data) => {
          setCombinedChats((prev) =>
            prev.filter((c) => c.id !== currentChat.id)
          );
          setCurrentChat(null);
          setShowChatInfo(false);
          setSuccessMessage(data.data.message);
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        });
    }
  };
  const onChangeImage = (ev) => {
    let file = ev.target.files[0];
    setChatImage({ file: file, url: URL.createObjectURL(file) });
  };
  const resetAvatarImage = () => {
    setChatImage(null);
  };
  const submitAvatarImage = () => {
    try {
      let formData = new FormData();
      formData.append("image", chatImage.file);
      axiosClient
        .post(route("chat.changeImage", currentChat.id), formData)
        .then((data) => {
          setSuccessMessage(data.data.message);
          setCurrentChat((prev) => ({
            ...prev,
            avatar_url: data.data.image,
          }));
          setChatImage(null);
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        });
    } catch (error) {
      setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
    }
  };
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
        {currentChat?.is_group && (
          <>
            {currentChat?.is_current_user_admin && (
              <ChatInfoFormMenu
                setShowChangeGroupNameForm={setShowChangeGroupNameForm}
                setShowAddAUSersForm={setShowAddUsersForm}
              />
            )}
          </>
        )}
        <div className=" relative flex flex-col items-center justify-start pt-8 w-full z-0">
          <div className="w-[100px] h-[100px] group rounded-full overflow-auto border-solid border-[1px] border-gray-500/50 flex justify-center items-end relative">
            {currentChat?.is_group && (
              <>
                {currentChat.is_current_user_admin && (
                  <>
                    {chatImage == {} ||
                    chatImage == undefined ||
                    chatImage == null ? (
                      <button className="group-hover:opacity-100 opacity-0 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-10 h-10 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex justify-center items-center">
                        <CiCamera className="text-gray-800 w-[20px] h-[20px]" />
                        <input
                          type="file"
                          name="cover_image"
                          accept="image/*"
                          className="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer"
                          onChange={(e) => {
                            onChangeImage(e);
                          }}
                        />
                      </button>
                    ) : (
                      <div className="group-hover:opacity-100 opacity-0 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-15 h-10 duration-300 text-gray-800 flex gap-1 justify-center items-center">
                        <button
                          onClick={resetAvatarImage}
                          className="cursor-pointer z-10 overflow-hidden rounded-md relative py-2 px-2 bg-gray-800/80 hover:bg-gray-800 text-gray-200 duration-300  flex gap-2 justify-center items-center"
                        >
                          <HiMiniXMark />
                        </button>
                        <button
                          onClick={submitAvatarImage}
                          className="cursor-pointer z-10 overflow-hidden rounded-md relative py-2 px-2 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex gap-2 justify-center items-center"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    )}
                  </>
                )}
                {/* {currentChat.is_current_user_admin  ? (
                  <button className="group-hover:opacity-100 opacity-0 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-10 h-10 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex justify-center items-center">
                    <CiCamera className="text-gray-800 w-[20px] h-[20px]" />
                    <input
                      type="file"
                      name="cover_image"
                      accept="image/*"
                      className="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        onChangeImage(e);
                      }}
                    />
                  </button>
                ) : (
                  <div className="group-hover:opacity-100 opacity-0 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-15 h-10 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex gap-1 justify-center items-center">
                    <button
                      //  onClick={resetAvatarImage}
                      className="cursor-pointer z-10 overflow-hidden rounded-md relative py-2 px-2 bg-gray-800/80 hover:bg-gray-800 text-gray-200 duration-300  flex gap-2 justify-center items-center"
                    >
                      <HiMiniXMark />
                    </button>
                    <button
                      //  onClick={submitAvatarImage}
                      className="cursor-pointer z-10 overflow-hidden rounded-md relative py-2 px-2 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex gap-2 justify-center items-center"
                    >
                      <FaCheck />
                    </button>
                  </div>
                )} */}
              </>
            )}
            <img
              src={!!chatImage?.url ? chatImage.url : currentChat?.avatar_url}
              alt=""
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
          </div>
          <h2 className="w-fit text-gray-300 text-lg px-4 py-2 m-0 ">
            {currentChat?.name}
          </h2>
          {currentChat?.is_group ? (
            <h2 className="w-fit text-gray-500 text-lg p-0 m-0">
              Group: {currentChat?.users.length} members
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
          <ChatInfoAttachments attachments={attachments} />
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
                    className="w-full flex justify-start gap-4 items-center relative hover:bg-gray-800/50 duration-200 rounded-md px-2 py-2"
                    key={index}
                    href={route("profile.view", user?.name)}
                  >
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    <h2>{user.name}</h2>
                    {currentChat?.owner == user.id ? (
                      <span className="absolute top-[50%] translate-y-[-50%] right-[20px] text-[10px] bg-indigo-800/30 border-indigo-800   border-solid border-[1px]  rounded-sm text-gray-300 px-1 py-[2px]">
                        owner
                      </span>
                    ) : (
                      <>
                        {!!user.is_admin ? (
                          <span className="absolute top-[50%] translate-y-[-50%] right-[20px] text-[10px] bg-emerald-600/40 border-solid border-[1px] border-emerald-600 rounded-sm text-gray-300 px-1 py-[2px]">
                            Admin
                          </span>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {/* {currentChat?.is_group && (
            <button
              className="bg-sky-500/30 border-[1px] border-solid border-sky-500 px-4 py-2 text-gray-200 rounded-md w-full hover:bg-sky-500/50 duration-200 flex justify-center items-center gap-4"
              onClick={() => {}}
            >
              Add Members
              <HiUserAdd className="w-4 h-4" />
            </button>
          )} */}
          <div className="flex justify-center items-center gap-2 w-full pb-4">
            {currentChat?.is_group ? (
              <>
                {currentChat?.owner == user.id ? (
                  <button
                    className="bg-red-500/30 border-[1px] border-solid border-red-500 px-4 py-2 text-gray-200 rounded-md w-[120px] hover:bg-red-500/50 duration-200 flex justify-center items-center gap-4"
                    onClick={() => {
                      deleteChat();
                    }}
                  >
                    Delete
                    <FaRegTrashAlt className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    className="bg-red-500/30 border-[1px] border-solid border-red-500 px-4 py-2 text-gray-200 rounded-md w-[120px] hover:bg-red-500/50 duration-200 flex justify-center items-center gap-4"
                    onClick={() => {
                      leaveChatGroup();
                    }}
                  >
                    Leave
                    <MdLogout className="w-4 h-4" />
                  </button>
                )}
              </>
            ) : (
              <button
                className="bg-red-500/30 border-[1px] border-solid border-red-500 px-4 py-2 text-gray-200 rounded-md w-[120px] hover:bg-red-500/50 duration-200 flex justify-center items-center gap-4"
                onClick={() => {
                  blockChat();
                }}
              >
                {blockStatus ? (
                  <>
                    Unblock <FaLockOpen className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Block <FaLock className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
            <button
              className="bg-red-500/30 border-[1px] border-solid border-red-500 px-4 py-2 text-gray-200 rounded-md w-[120px] hover:bg-red-500/50 duration-200 flex justify-center items-center gap-4"
              onClick={() => {
                muteChat();
              }}
            >
              {muteStatus ? (
                <>
                  UnMute
                  <PiSpeakerSimpleHighFill className="w-4 h-4" />
                </>
              ) : (
                <>
                  Mute
                  <PiSpeakerSimpleSlashFill className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <ChangeChatGroupName
        showForm={showChangeGroupNameForm}
        setShowForm={setShowChangeGroupNameForm}
      />
      <AddUsersToChatForm
        setShowForm={setShowAddUsersForm}
        showForm={showAddUsersForm}
      />
    </div>
  );
};

export default ChatInfoForm;
