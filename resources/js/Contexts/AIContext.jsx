import { createContext, useState, useContext, useEffect } from "react";
const INITIAL_DATA = {
  currentAIChat: {},
  setCurrentAIChat: () => {},
  isLoading: false,
  setIsLoading: () => {},
  AIChats: [],
  setAIChats: () => {},
};
const Context = createContext(INITIAL_DATA);

export const AIContext = ({ children }) => {
  const [currentAIChat, setCurrentAIChat] = useState(null);
  const [AIChats, setAIChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!!currentAIChat) {
      setAIChats((prev) =>
        prev.map((chat) =>
          chat.id == currentAIChat?.id ? currentAIChat : chat
        )
      );
    }
  }, [currentAIChat]);
  return (
    <Context.Provider
      value={{
        currentAIChat,
        setCurrentAIChat,
        isLoading,
        setIsLoading,
        AIChats,
        setAIChats,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useAIContext = () => useContext(Context);
