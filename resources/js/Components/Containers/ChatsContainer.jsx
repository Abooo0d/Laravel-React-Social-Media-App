import React, { useEffect } from "react";
import ChatCard from "../Shared/ChatCard";

const ChatsContainer = ({ chats, setChat, groupChats }) => {
  return (
    <div className="py-4 max-h-barContainerHeight flex h-barHeight">
      {false ? (
        <div className="text-gray-600 text-center">There Is No Chats Yet</div>
      ) : (
        <div className="flex flex-col gap-3 max-h-barHeight h-full overflow-scroll flex-1">
          {chats?.map((chat, index) => (
            <ChatCard chat={chat} key={index} setChat={setChat} />
          ))}
          {groupChats?.length > 0 && (
            <>
              <h2 className="text-gray-500">Groups:</h2>
              {groupChats?.map((chat, index) => (
                <ChatCard
                  chat={chat}
                  key={index}
                  setChat={setChat}
                  isGroup={true}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatsContainer;
