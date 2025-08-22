import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { useRef } from "react";
import { useMainContext } from "./MainContext";
import axiosClient from "@/AxiosClient/AxiosClient";

const INITIAL_DATA = {
  onlineUsers: [],
  setOnlineUsers: () => {},
  onlineUsersIds: [],
  setOnlineUsersIds: () => {},
  currentChat: {},
  setCurrentChat: () => {},
  allChats: [],
  setAllChats: () => {},
  groupChats: [],
  setGroupChats: () => {},
  combinedChats: [],
  setCombinedChats: () => {},
  message: {},
  setMessage: () => {},
  attachmentIndex: 0,
  setAttachmentIndex: () => {},
  showAttachmentFullView: false,
  setShowAttachmentFullView: () => {},
  showChatInfo: false,
  setShowChatInfo: () => {},
  showVideoCallForm: false,
  setShowVideoCallForm: () => {},
  showAudioCallForm: false,
  setShowAudioCallForm: () => {},
  isCaller: false,
  setIsCaller: () => {},
  incomingSignal: null,
  setIncomingSignal: () => {},
  incomingFrom: null,
  setIncomingFrom: () => {},
  haveCall: false,
  setHaveCall: () => {},
  CallEnded: false,
  setCallEnded: () => {},
  LeaveChannel: () => {},
};
const Context = createContext(INITIAL_DATA);
export const ChatsContext = ({ children }) => {
  const { user } = useUserContext();
  const subscribedChats = useRef(new Set());
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineUsersIds, setOnlineUsersIds] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [combinedChats, setCombinedChats] = useState();
  const [message, setMessage] = useState({});
  const [attachmentIndex, setAttachmentIndex] = useState(0);
  const [showAttachmentFullView, setShowAttachmentFullView] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showVideoCallForm, setShowVideoCallForm] = useState(false);
  const [showAudioCallForm, setShowAudioCallForm] = useState(false);
  const [incomingSignal, setIncomingSignal] = useState(null);
  const [incomingFrom, setIncomingFrom] = useState(null);
  const [isCaller, setIsCaller] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const currentChatRef = useRef(currentChat);
  const combinedChatsRef = useRef(combinedChats);
  const { setSuccessMessage, setErrors } = useMainContext();

  const LeaveChannel = (chatId) => {
    window.Echo.leave(`private-chat.${chatId}`);
  };

  useEffect(() => {
    let array = onlineUsers.map((user) => user.id);
    setOnlineUsersIds(array);
  }, [onlineUsers]);

  useEffect(() => {
    groupChats
      ? setCombinedChats([...groupChats, ...allChats])
      : setCombinedChats([...allChats]);
  }, [groupChats, allChats]);

  useEffect(() => {
    if (!currentChat) {
      setShowChatInfo(false);
      return;
    }

    setCombinedChats((prevChats) => {
      const updatedChats = prevChats.map((chat) =>
        chat?.id === currentChat.id ? currentChat : chat
      );
      // Sort chats: groups first, then private chats, both by last_message_id
      return updatedChats.sort((a, b) => {
        // If both are groups or both are private chats
        if (a.is_group === b.is_group) {
          return b.last_message_id - a.last_message_id;
        }
        // Put groups before private chats
        return a.is_group ? -1 : 1;
      });
    });
    currentChatRef.current = currentChat;
  }, [currentChat]);

  useEffect(() => {
    if (!user?.id) return;
    window.Echo.join("online")
      .here((users) => {
        setOnlineUsers(users);
      })
      .joining((user) => {
        setOnlineUsers((prevUsers) => [...prevUsers, user]);
      })
      .leaving((user) => {
        setOnlineUsers((prevUsers) =>
          prevUsers.filter((u) => {
            return u.id != user.id;
          })
        );
      });
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    const userChannel = window.Echo.private(`user.${user?.id}`);

    userChannel.listen("ChatCreated", (e) => {
      const newChat = e.chat;
      setSuccessMessage("You Have Been Add To New Chat");
      setCombinedChats((prev) => {
        const exists = prev.some((chat) => chat.id === newChat.id);
        if (exists) return prev; // Chat already exists, don't add
        return [...prev, newChat]; // Add new chat
      });
    });

    userChannel.listen("AddMemberToChatGroup", (e) => {
      let newChat = e.chat;
      setCombinedChats((prev) => [...prev, newChat]);
      setSuccessMessage("You Have Been Add To New Chat");
    });

    userChannel.listen("MemberRoleChanged", (e) => {
      setSuccessMessage(e.message);
    });

    userChannel.listen("MemberKickOutFormChat", (e) => {
      let chatId = e.chat_id;
      let message = e.message;
      if (currentChatRef.current.id == chatId) {
        setCurrentChat(null);
      }
      setCombinedChats((prev) => prev.filter((c) => c.id !== chatId));
      setErrors([message]);
    });

    userChannel.listen(".GroupDeleted", (e) => {
      const groupSlug = e.slug;

      const groupId = e.group_id;
      const currentPath = window.location.pathname;
      const slugInUrl = currentPath.split("/").pop();

      if (slugInUrl === groupSlug) {
        window.location.href = "/";
      }
    });
  }, [user?.id]);

  useEffect(() => {
    // if (combinedChats == 0) return;
    if (!(!!combinedChats && combinedChats?.length > 0)) return;

    combinedChats?.forEach((chat) => {
      const chatId = chat?.id;
      if (subscribedChats.current.has(chatId)) return;
      const channel = window.Echo.private(`chat.${chatId}`);

      channel.listen(
        "NewMessageSent",
        (e) => {
          let message = e.message;
          if (message.user.id == user.id) {
            message = {
              ...message,
              my_status: true,
            };
          }
          if (message.chat_id == currentChatRef.current?.id) {
            axiosClient.post(route("readMessage", message.id));

            setCurrentChat((prevChat) => {
              const existsIndex = prevChat.messages.findIndex(
                (me) => me.user.name === message.user.name && me.id === "new"
              );

              let updatedMessages;

              if (existsIndex !== -1) {
                // Replace the placeholder with the real message
                updatedMessages = [...prevChat.messages];
                updatedMessages[existsIndex] = message;
              } else {
                // Prepend new message
                updatedMessages = [message, ...prevChat.messages];
              }

              return {
                ...prevChat,
                messages: updatedMessages,
                last_message: message.body,
                last_message_id: message.id,
                last_message_date: message.created_at,
              };
            });
          } else {
            setCombinedChats((prevChats) =>
              prevChats.map((chat) => {
                if (chat.id === message.chat_id) {
                  // Avoid duplicates
                  const alreadyExists = chat.messages.some(
                    (msg) => msg.id === message.id
                  );
                  if (alreadyExists) return chat;
                  return {
                    ...chat,
                    messages: [
                      { ...message, my_status: false },
                      ...chat.messages,
                    ],
                    last_message: message.body,
                    last_message_id: message.id,
                    last_message_date: message.created_at,
                  };
                }
                return chat;
              })
            );
          }
        },
        [chatId]
      );

      channel.listen("MessageRead", (e) => {
        let newMessage = e.message;
        let userId = e.user_id;
        if (userId == user.id) return;

        if (newMessage.chat_id == currentChatRef.current.id) {
          setCurrentChat((prev) => ({
            ...prev,
            messages: prev.messages.map((me) =>
              me.id == newMessage.id
                ? { ...me, is_read: true, my_status: true }
                : me
            ),
          }));
        } else {
          setCombinedChats((prev) =>
            prev.map((chat) =>
              chat.id == newMessage.chat_id
                ? {
                    ...chat,
                    messages: prev.messages.map((me) =>
                      me.id == newMessage.id ? newMessage : me
                    ),
                  }
                : chat
            )
          );
        }
      });

      channel.listen("ReadAllMessages", (e) => {
        const chatId = e.chat_id;
        const userId = e.user_id;
        if (userId == user.id) return;

        if (chatId == currentChatRef.current?.id) {
          setCurrentChat((prev) => ({
            ...prev,
            messages: currentChatRef.current.messages.map((me) => ({
              ...me,
              is_read: true,
            })),
          }));
        } else {
          setCombinedChats((prevChats) => {
            combinedChatsRef.current.map((chat) => {
              chat.id == chatId
                ? {
                    ...chat,
                    messages: chat.messages.map((me) => ({
                      ...me,
                      is_read: true,
                    })),
                  }
                : chat;
            });
          });
        }
      });

      channel.listen("MessageUpdated", (e) => {
        const newMessage = e.message;
        if (message.chat_id == currentChatRef.current?.id) {
          setCurrentChat((prev) => ({
            ...prev,
            messages: prev.messages.map((message) => {
              message.id == newMessage.id ? newMessage : message;
            }),
          }));
        } else {
          setCombinedChats((prev) =>
            prev.map((chat) => {
              chat.id == newMessage.chat_id
                ? {
                    ...chat,
                    messages: chat.messages.map((message) => {
                      message.id == newMessage.id ? newMessage : message;
                    }),
                  }
                : chat;
            })
          );
        }
      });

      channel.listen("MessageDeleted", (e) => {
        let deletedMessageData = e;
        if (deletedMessageData.chat_id == currentChatRef.current?.id) {
          setCurrentChat((prev) => ({
            ...prev,
            messages: prev.messages.filter(
              (me) => me != deletedMessageData.messages_id
            ),
          }));
        } else {
          setCombinedChats((prev) =>
            prev.map((chat) => {
              chat.id == deletedMessageData.chat_id
                ? {
                    ...chat,
                    messages: chat.messages.filter(
                      (me) => me.id != deletedMessageData.message_id
                    ),
                  }
                : chat;
            })
          );
        }
      });

      channel.listen("ChatUpdated", (e) => {
        let updatedChatData = e.chat;

        if (updatedChatData.id == currentChat?.id) {
          let c = {
            ...currentChat,
            name: updatedChatData.name,
            avatar_url: updatedChatData.avatar_url,
            users: updatedChatData.users,
          };
          setCurrentChat(c);
        } else {
          let allChats = combinedChats.map((ch) =>
            ch.id == updatedChatData.id
              ? {
                  ...ch,
                  name: updatedChatData.name,
                  avatar_url: updatedChatData.avatar_url,
                  users: updatedChatData.users,
                }
              : ch
          );
          setCombinedChats(allChats);
        }
      });

      channel.listen("ChatDeleted", (e) => {
        let chatId = e.chatId;
        let message = e.message;
        if (currentChat?.id == chatId) {
          setCurrentChat(null);
        }
        let a = combinedChats.filter((c) => c.id !== chatId);
        setCombinedChats(a);
        setErrors([message]);
      });

      channel.listen("VideoCallSignal", (e) => {
        if (e.from === user.id) return;
        setIncomingSignal(e.signal);
        setIncomingFrom(e.chat_id);
        setShowVideoCallForm(true);
      });

      channel.listen("VoiceCallSignal", (e) => {
        if (e.from === user.id) return;
        setIncomingSignal(e.signal);
        setIncomingFrom(e.chat_id);
        setShowAudioCallForm(true);
      });

      channel.listen("CallEnded", () => {
        setCallEnded(true);
      });

      subscribedChats.current.add(chatId);
    });
    combinedChatsRef.current = combinedChats;
  }, [combinedChats]);

  return (
    <Context.Provider
      value={{
        onlineUsers,
        setOnlineUsers,
        onlineUsersIds,
        setOnlineUsersIds,
        currentChat,
        setCurrentChat,
        allChats,
        setAllChats,
        groupChats,
        setGroupChats,
        combinedChats,
        setCombinedChats,
        message,
        setMessage,
        showAttachmentFullView,
        setShowAttachmentFullView,
        attachmentIndex,
        setAttachmentIndex,
        showChatInfo,
        setShowChatInfo,
        showVideoCallForm,
        setShowVideoCallForm,
        showAudioCallForm,
        setShowAudioCallForm,
        incomingSignal,
        setIncomingSignal,
        incomingFrom,
        setIncomingFrom,
        isCaller,
        setIsCaller,
        callEnded,
        setCallEnded,
        LeaveChannel,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useChatsContext = () => useContext(Context);
