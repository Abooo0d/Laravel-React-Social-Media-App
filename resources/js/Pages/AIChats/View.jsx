import AIChatContainer from "@/Components/Containers/AIChatContainer";
import AiChatsSideBar from "@/Components/Containers/AiChatsSideBar";
import { useAIContext } from "@/Contexts/AIContext";
import { useUserContext } from "@/Contexts/UserContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect } from "react";

const View = ({ auth, chats }) => {
  const { setUser } = useUserContext();
  const { setAIChats } = useAIContext();
  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  useEffect(() => {
    setAIChats(chats);
  }, [chats]);

  return (
    <>
      <Head>
        <title>Chatter</title>
        <link rel="icon" type="image/svg+xml" href="/Logo_ico.ico" />
      </Head>
      <div className="flex min-h-barHeight overflow-hidden">
        <AIChatContainer />
        <AiChatsSideBar />
      </div>
    </>
  );
};
View.layout = (page) => {
  return <Authenticated children={page}></Authenticated>;
};
export default View;
