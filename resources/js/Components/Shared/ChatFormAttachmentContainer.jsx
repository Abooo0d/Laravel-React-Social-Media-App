import React from "react";
import MessageAttachment from "./MessageAttachment";
import { PrimaryButton } from "./Buttons";
import { HiMiniXMark } from "react-icons/hi2";

const ChatFormAttachmentContainer = ({ attachments, setAttachments }) => {
  return (
    <div
      className={`absolute z-[100] bottom-[calc(100%+10px)] left-[10px] dark:bg-gray-800 bg-gray-200 rounded-md border-[1px] border-solid dark:border-gray-500 border-gray-300 flex flex-col justify-start items-start gap-2 py-2 px-4 max-sm:p-2 w-[300px] max-h-[350px] overflow-hidden
        ${
          attachments.length > 0
            ? "opacity-100 visible z-100"
            : "opacity-0 invisible z-0"
        }`}
    >
      <div className="flex justify-between items-center w-full">
        <h2 className="m-0 text-lg dark:text-gray-300 text-gray-600 cursor-default">
          Attachments
        </h2>
        <PrimaryButton
          classes="px-1.5 py-1"
          event={() => {
            setAttachments([]);
          }}
        >
          <HiMiniXMark className="w-5 h-5 dark:text-gray-200 text-gray-600" />
        </PrimaryButton>
      </div>
      <div className="flex max-h-[300px] min-w-[272px] max-w-[272px] overflow-auto">
        <div className="flex gap-2 justify-start items-start flex-wrap w-full h-full p-2">
          {attachments?.map((attachment, index) => (
            <MessageAttachment
              attachment={attachment}
              setAllAttachments={setAttachments}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatFormAttachmentContainer;
