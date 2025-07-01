import { useGetGroups } from "@/TanStackQurey/Querys";
import { createContext, useContext, useEffect, useState } from "react";
const INITIAL_DATA = {
  user: [],
  setUser: () => {},
  groups: [],
  setGroup: () => {},
  refetchGroups: () => {},
  isLoadingGroups: false,
};
const Context = createContext(INITIAL_DATA);
export const UserContext = ({ children }) => {
  const {
    data,
    refetch: refetchGroups,
    isLoading: isLoadingGroups,
  } = useGetGroups();
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState(data); 
  useEffect(() => {
    setGroups(data);
  }, [data]);
  useEffect(() => {
    if (user === "" || user === undefined || user === null) {
      window.location.href = "/login";
    }
  }, [user]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        groups,
        setGroups,
        refetchGroups,
        isLoadingGroups,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useUserContext = () => useContext(Context);
