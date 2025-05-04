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
  const [onlineUsersIds, setOnlineUsersIds] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [allChats, setAllChats] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [combinedChats, setCombinedChats] = useState();
  const { user } = useUserContext();
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
    if (!currentChat) return;
    setCombinedChats((prevChats) => {
      // Update the chat if it exists
      const updatedChats = prevChats.map((chat) =>
        chat.id === currentChat.id ? currentChat : chat
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
  }, [currentChat]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!!currentChat?.id) {
      window.Echo.private(`chat.${currentChat?.id}`).listen(
        "NewMessageSent",
        (e) => {
          const message = e.message;
          // 1. Update combinedChats
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
                  messages: [message, ...chat.messages],
                  last_message: message.body,
                  last_message_id: message.id,
                  last_message_date: message.created_at,
                };
              }
              return chat;
            })
          );
          // 2. Update currentChat (if it's the same chat)
          setCurrentChat((prevChat) => {
            if (prevChat.id !== message.chat_id) return prevChat;
            const alreadyExists = prevChat.messages.some(
              (msg) => msg.id === message.id
            );
            if (alreadyExists) return prevChat;
            return {
              ...prevChat,
              messages: [message, ...prevChat.messages],
              last_message: message.body,
              last_message_id: message.id,
              last_message_date: message.created_at,
            };
          });
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
