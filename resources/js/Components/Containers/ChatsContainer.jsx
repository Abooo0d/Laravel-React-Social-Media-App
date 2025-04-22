import React from "react";
import ChatCard from "../Shared/ChatCard";
import { useChatsContext } from "@/Contexts/ChatsContext";

const ChatsContainer = () => {
  const { allChats, groupChats } = useChatsContext();
  return (
    <div className="py-4 max-h-barContainerHeight flex h-barHeight overflow-hidden">
      {false ? (
        <div className="text-gray-600 text-center">There Is No Chats Yet</div>
      ) : (
        <div className="flex flex-col gap-3 max-h-barHeight h-full overflow-scroll flex-1">
          {groupChats?.length > 0 && (
            <>
              {/* <h2 className="text-gray-500 pl-2">Groups:</h2> */}
              {groupChats?.map((chat, index) => (
                <div
                  className="flex flex-col justify-start items-center gap-2"
                  key={index}
                >
                  <ChatCard chat={chat} key={index} isGroup={true} />
                  {/* <div className="w-[80%] h-[1px] relative bg-gray-700/40 mx-auto" /> */}
                </div>
              ))}
            </>
          )}
          {allChats?.map((chat, index) => (
            <div
              className="flex flex-col justify-start items-center gap-2"
              key={index}
            >
              <ChatCard chat={chat} key={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatsContainer;
