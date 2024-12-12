import { forwardRef, useEffect, useRef } from "react";

const TextInput = ({ classes, placeholder, value, setValue }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={
        `border-[1px] bg-gray-700/50 text-gray-400 placeholder:text-gray-600 border-gray-800 focus:border-gray-600 duration-200 rounded-md outline-none ring-0 focus:outline-none focus:ring-0 ` +
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
