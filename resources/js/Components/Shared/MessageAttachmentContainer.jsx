import React from "react";
import MessageCardAttachment from "./MessageCardAttachment";

const MessageAttachmentContainer = ({ attachments, setIndex, setShow }) => {
  return (
    <div className="max-w-[520px] flex flex-wrap gap-2 justify-end items-center">
      {attachments?.map((attachment, index) => (
        <MessageCardAttachment
          attachment={attachment}
          index={index}
          key={index}
          setIndex={setIndex}
          attachmentIndex={index}
          setShow={setShow}
        />
      ))}
    </div>
  );
};

export default MessageAttachmentContainer;
