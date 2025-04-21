import React, { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import TextInput from "./TextInput";
import { PrimaryButton } from "./Shared/Buttons";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";
const ChatForm = ({ chat, chatData, setChatData }) => {
  const { user } = useUserContext();
  const [message, setMessage] = useState("");
  const newMessage = () => {
    if (message !== "") {
      axiosClient
        .post(route("newMessage", chat), {
          body: message,
          user_id: user.id,
          chat_id: chat.id,
        })
        .then(({ data }) => {
          setChatData((prev) => ({
            ...prev,
            messages: [data.message, ...prev.messages],
          }));
          setMessage("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="flex w-full justify-between items-center bg-gray-900 p-4 gap-4 z-[50] border-t-[1px] border-solid border-gray-700">
      <TextInput
        classes="w-full"
        placeholder="message"
        value={message}
        setValue={setMessage}
      />
      <PrimaryButton classes="px-3 py-1.5 h-full" event={newMessage}>
        <BiSolidSend />
      </PrimaryButton>
    </div>
  );
};

export default ChatForm;
