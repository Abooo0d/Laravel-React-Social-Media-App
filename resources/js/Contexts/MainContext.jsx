import Notification from "@/Components/Shared/Notification";
import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_DATA = {
  errors: [],
  successMessage: "",
  onlineUsers: [],
  onlineUsersIds: [],
  setErrors: () => {},
  setSuccessMessage: () => {},
  setOnlineUsers: () => {},
  setOnlineUsersIds: () => {},
};
const Context = createContext(INITIAL_DATA);
export const MainContext = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineUsersIds, setOnlineUsersIds] = useState([]);
  useEffect(() => {
    let array = onlineUsers.map((user) => user.id);
    setOnlineUsersIds(array);
  }, [onlineUsers]);

  return (
    <Context.Provider
      value={{
        errors,
        setErrors,
        successMessage,
        setSuccessMessage,
        onlineUsers,
        setOnlineUsers,
        onlineUsersIds,
      }}
    >
      {children}
      <Notification success={successMessage} errors={errors} />
    </Context.Provider>
  );
};
export const useMainContext = () => useContext(Context);
