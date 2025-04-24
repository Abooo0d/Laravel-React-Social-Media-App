import Notification from "@/Components/Shared/Notification";
import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_DATA = {
  errors: [],
  successMessage: "",
  goingToUrl: "",
  setErrors: () => {},
  setSuccessMessage: () => {},
  setGoingToUrl: () => {},
  hideAllMenus: false,
  setHideAllMenus: () => {},
};
const Context = createContext(INITIAL_DATA);
export const MainContext = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [goingToUrl, setGoingToUrl] = useState("");
  const [hideAllMenus, setHideAllMenus] = useState(false);

  return (
    <Context.Provider
      value={{
        errors,
        setErrors,
        successMessage,
        setSuccessMessage,
        goingToUrl,
        setGoingToUrl,
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
