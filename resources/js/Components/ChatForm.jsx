import React, { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import TextInput from "./TextInput";
import { PrimaryButton } from "./Shared/Buttons";
const ChatForm = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="flex w-full justify-between items-center bg-gray-900 p-4 gap-4">
      <TextInput
        classes="w-full"
        placeholder="message"
        value={message}
        setValue={setMessage}
      />
      <PrimaryButton classes="px-3 py-1.5 h-full">
        <BiSolidSend />
      </PrimaryButton>
    </div>
  );
};

export default ChatForm;
