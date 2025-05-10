import React from "react";
import MessageCardAttachment from "./MessageCardAttachment";

const MessageAttachmentContainer = ({ message }) => {
  return (
    <div className="max-w-[520px] flex flex-wrap gap-2 justify-end items-center">
      {message?.attachments?.map((attachment, index) => (
        <MessageCardAttachment
          attachment={attachment}
          key={index}
          index={index}
          message={message}
        />
      ))}
    </div>
  );
};

export default MessageAttachmentContainer;
