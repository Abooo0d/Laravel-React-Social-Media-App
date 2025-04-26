import React, { forwardRef } from "react";

const Spinner = forwardRef(function Abood({ size = "large" }, ref) {
  return (
    <div
      ref={ref}
      className={`bg-transparent border-[2px] rounded-full border-t-gray-500 border-t-[4px] border-gray-700/50 border-top-gray-900 mx-auto my-1 animate-spin z-[50] ${
        size == "large" ? " w-[40px] min-h-[40px] " : " w-[20px] h-[20px] "
      }`}
    />
  );
});

export default Spinner;
