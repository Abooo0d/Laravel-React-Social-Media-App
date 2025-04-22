import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [onlineUsersIds, setOnlineUsersIds] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [allChats, setAllChats] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [combinedChats, setCombinedChats] = useState();
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
    console.log(currentChat, "CurrentChat");
  }, [currentChat]);

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
