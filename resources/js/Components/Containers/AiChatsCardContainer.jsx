import React from "react";
import AIChatCard from "../Shared/AIChatCard";

const AiChatsCardContainer = ({ chats, show, setShow }) => {
  return (
    <div>
      {chats.map((chat) => (
        <AIChatCard chat={chat} show={show} setShow={setShow} />
      ))}
    </div>
  );
};

export default AiChatsCardContainer;
