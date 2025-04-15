import { forwardRef, useEffect, useRef } from "react";

const TextInput = ({
  classes,
  placeholder,
  value,
  setValue,
  hidePassword = false,
}) => {
  return (
    <input
      type={hidePassword ? "password" : "text"}
      placeholder={placeholder}
      className={
        `bg-gray-700/50 hover:bg-gray-700/50 text-gray-400 placeholder:text-gray-500 border-gray-800 focus:border-gray-600 duration-200 rounded-md outline-none ring-0 focus:outline-none focus:ring-0 cursor-pointer hover:border-gray-600 border-[1px] border-solid border-gray-600/50 ` +
        classes
      }
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
export default TextInput;
