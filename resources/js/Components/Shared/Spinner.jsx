import React, { forwardRef } from "react";

const Spinner = forwardRef(function Abood({ size = "large" }, ref) {
  return (
    <div
      ref={ref}
      className={`bg-transparent border-[2px] rounded-full border-t-gray-200 border-gray-400 border-top-gray-900 mx-auto my-1 animate-spin z-[50] ${
        size == "large"
          ? " w-[40px] min-h-[40px] border-t-[4px]"
          : " w-[20px] min-h-[20px] border-t-[2px] "
      }`}
    />
  );
});

export default Spinner;
