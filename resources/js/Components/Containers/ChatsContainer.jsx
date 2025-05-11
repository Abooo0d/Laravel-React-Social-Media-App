import React, { useEffect } from "react";
import ChatCard from "../Shared/ChatCard";
import { useChatsContext } from "@/Contexts/ChatsContext";
const ChatsContainer = ({
  setShow,
  setIsLoading,
  searchResults,
  searchName,
  didSearch,
}) => {
  const { combinedChats } = useChatsContext();
  return (
    <div className="py-4 flex justify-start flex-col items-center gap-2">
      {false ? (
        <div className="text-gray-600 text-center">There Is No Chats Yet</div>
      ) : (
        <>
          {didSearch && searchName.trim() != "" ? (
            <>
              {searchResults?.length > 0 ? (
                <>
                  {searchResults?.map((chat, index) => (
                    <div
                      className="flex flex-col justify-start items-center gap-2"
                      key={index}
                    >
                      <ChatCard
                        chat={chat}
                        key={index}
                        setShow={setShow}
                        setIsLoading={setIsLoading}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className="w-full text-gray-500 text-center p-4">
                  No Chat With This Name
                </div>
              )}
            </>
          ) : (
            <>
              {combinedChats?.length > 0 && (
                <>
                  {combinedChats?.map((chat, index) => (
                    <div
                      className="flex flex-col justify-start items-center gap-2"
                      key={index}
                    >
                      <ChatCard
                        chat={chat}
                        key={index}
                        setShow={setShow}
                        setIsLoading={setIsLoading}
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ChatsContainer;
