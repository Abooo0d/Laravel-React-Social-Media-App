import AIChatContainer from "@/Components/Containers/AIChatContainer";
import AiChatsSideBar from "@/Components/Containers/AiChatsSideBar";
import { useAIContext } from "@/Contexts/AIContext";
import { useMainContext } from "@/Contexts/MainContext";
import { useUserContext } from "@/Contexts/UserContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

const View = ({ auth, chats }) => {
  const { setUser } = useUserContext();
  const { setAIChats } = useAIContext();
  const { flash, errors } = usePage().props;
  const { setErrors, setSuccessMessage } = useMainContext();
  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  useEffect(() => {
    setAIChats(chats);
  }, [chats]);

  useEffect(() => {
    if (flash?.success) setSuccessMessage(flash.success);
    if (flash?.error) setErrors([flash.error]);
  }, [flash]);

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
