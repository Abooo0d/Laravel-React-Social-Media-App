import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

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
};
const Context = createContext(INITIAL_DATA);
export const ChatsContext = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chats, setChats] = useState();
  const [onlineUsersIds, setOnlineUsersIds] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [allChats, setAllChats] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [combinedChats, setCombinedChats] = useState();
  // const { user } = useUserContext();

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
    if (currentChat == null) return;
    else {
      setCombinedChats((prevChats) => {
        const array = prevChats.map((chat) =>
          chat.id == currentChat.id ? currentChat : chat
        );
        return array.sort((a, b) => b.last_message_id - a.last_message_id);
      });
    }
  }, [currentChat]);

  useEffect(() => {
    window.Echo.join("online")
      .here((users) => {
        setChats(users);
      })
      .joining((user) => {
        setChats((prevUsers) => [...prevUsers, user]);
      })
      .leaving((user) => {
        setChats((prevUsers) =>
          prevUsers.filter((u) => {
            return u.id != user.id;
          })
        );
      });
  }, []);

  useEffect(() => {
    console.log(onlineUsers);
  }, [chats]);

  useEffect(() => {
    if (!!currentChat?.id) {
      window.Echo.private(`chat.${currentChat?.id}`).listen(
        "NewMessageSent",
        (e) => {
          // if (e.message.user_id == user.id) {
          // } else {
          if (e.message.chat_id == currentChat.id) {
            setCurrentChat((prev) => ({
              ...prev,
              messages: [e.message, ...prev.messages],
              last_message: e.message.body,
              last_message_id: e.message.id,
            }));
          } else {
            setCombinedChats((prev) =>
              prev.map((chat) =>
                chat.id == e.message.chat_id
                  ? {
                      ...chat,
                      messages: [e.message, ...chat.messages],
                      last_message: e.message.body,
                      last_message_id: e.message.id,
                    }
                  : chat
              )
            );
            // }
          }
        },
        [currentChat?.id]
      );
    }
  }, [currentChat?.id]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useChatsContext = () => useContext(Context);
