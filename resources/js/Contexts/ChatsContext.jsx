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
};
const Context = createContext(INITIAL_DATA);
export const ChatsContext = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineUsersIds, setOnlineUsersIds] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [allChats, setAllChats] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  useEffect(() => {
    let array = onlineUsers.map((user) => user.id);
    setOnlineUsersIds(array);
  }, [onlineUsers]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useChatsContext = () => useContext(Context);
