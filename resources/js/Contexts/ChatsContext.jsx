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

  // useEffect(() => {
  //   if (!!currentChat?.id) {
  //     window.Echo.private(`chat.${currentChat?.id}`).listen(
  //       "NewMessageSent",
  //       (e) => {
  //         // if (e.message.user_id != user.id) {
  //         if (e.message.chat_id == currentChat.id) {
  //           setCurrentChat((prev) => {
  //             if (prev.id === e.message.chat_id) {
  //               // Check if message already exists
  //               const messageExists = prev.messages.some(
  //                 (msg) => msg.id === e.message.id
  //               );

  //               if (messageExists) return prev;

  //               return {
  //                 ...prev,
  //                 messages: [e.message, ...prev.messages],
  //                 last_message: e.message.body,
  //                 last_message_id: e.message.id,
  //               };
  //             }
  //           });
  //         } else {
  //           setCombinedChats((prev) =>
  //             prev.map((chat) => {
  //               if (chat.id === e.message.chat_id) {
  //                 // Check if message already exists
  //                 const messageExists = chat.messages.some(
  //                   (msg) => msg.id === e.message.id
  //                 );

  //                 if (messageExists) return chat;

  //                 return {
  //                   ...chat,
  //                   messages: [e.message, ...chat.messages],
  //                   last_message: e.message.body,
  //                   last_message_id: e.message.id,
  //                 };
  //               }
  //               return chat;
  //             })
  //           );
  //         }
  //         // }
  //       },
  //       [currentChat?.id]
  //     );
  //   }
  // }, [currentChat?.id]);
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
