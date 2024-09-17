import Notification from "@/Components/Shared/Notification";
import { createContext, useContext, useEffect, useState } from "react";

const INITIAL_DATA = {
  errors: [],
  successMessage: "",
  setErrors: () => {},
  setSuccessMessage: () => {},
};
const Context = createContext(INITIAL_DATA);
export const MainContext = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    console.log("Abood from UseEffect in The Context");
  }, [successMessage]);

  return (
    <Context.Provider
      value={{ errors, setErrors, successMessage, setSuccessMessage }}
    >
      {children}
      <Notification success={successMessage} errors={errors} />
    </Context.Provider>
  );
};
export const useMainContext = () => useContext(Context);
