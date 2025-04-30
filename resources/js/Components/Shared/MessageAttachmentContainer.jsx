import React from "react";
import MessageCardAttachment from "./MessageCardAttachment";

const MessageAttachmentContainer = ({ attachments }) => {
  return (
    <div className="flex gap-2 justify-start items-start flex-wrap w-full h-full p-2">
      {attachments?.map((attachment, index) => (
        <MessageCardAttachment
          attachment={attachment}
          index={index}
          key={index}
        />
      ))}
    </div>
  );
};

export default MessageAttachmentContainer;
