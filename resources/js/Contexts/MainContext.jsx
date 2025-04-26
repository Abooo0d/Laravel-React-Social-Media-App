import Notification from "@/Components/Shared/Notification";
import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_DATA = {
  errors: [],
  successMessage: "",
  setErrors: () => {},
  setSuccessMessage: () => {},
  hideAllMenus: false,
  setHideAllMenus: () => {},
};
const Context = createContext(INITIAL_DATA);
export const MainContext = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [hideAllMenus, setHideAllMenus] = useState(false);

  return (
    <Context.Provider
      value={{
        errors,
        setErrors,
        successMessage,
        setSuccessMessage,
        hideAllMenus,
        setHideAllMenus,
      }}
    >
      {children}
      <Notification success={successMessage} errors={errors} />
    </Context.Provider>
  );
};
export const useMainContext = () => useContext(Context);
