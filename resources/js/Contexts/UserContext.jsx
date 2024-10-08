import { createContext, useContext, useEffect, useState } from "react";
const INITIAL_DATA = {
  user: [],
  setUser: () => {},
};
const Context = createContext(INITIAL_DATA);
export const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (user === "" || user === undefined || user === null) {
      window.location.href = "/login";
    }
    // if (user === "" || user === undefined || user === null) {
    //   console.log("Abood" + user);
    // }
  }, [user]);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};
export const useUserContext = () => useContext(Context);
