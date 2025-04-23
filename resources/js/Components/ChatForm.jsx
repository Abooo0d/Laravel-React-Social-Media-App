import React, { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import TextInput from "./TextInput";
import { PrimaryButton } from "./Shared/Buttons";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";
import { useChatsContext } from "@/Contexts/ChatsContext";
const ChatForm = () => {
  const { currentChat, setCurrentChat } = useChatsContext();
  const { user } = useUserContext();
  const [message, setMessage] = useState("");
  const newMessage = () => {
    if (message !== "") {
      axiosClient
        .post(route("newMessage", currentChat), {
          body: message,
          user_id: user.id,
          chat_id: currentChat.id,
        })
        .then(({ data }) => {
          // setCurrentChat((prev) => ({
          //   ...prev,
          //   messages: [data.message, ...prev.messages],
          //   last_message: data.message.body,
          //   last_message_id: data.message.id,
          // }));
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
