import ChatsBar from "@/Components/Containers/ChatsBar";
import MessagesContainer from "@/Components/Containers/MessagesContainer";
import { useChatsContext } from "@/Contexts/ChatsContext";
import { useMainContext } from "@/Contexts/MainContext";
import { useUserContext } from "@/Contexts/UserContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
function Chats({ auth, groupsChat, allChats }) {
  const { setUser } = useUserContext();
  const [isLoading, setIsLoading] = useState();
  const { setSuccessMessage, setErrors } = useMainContext();
  const { flash, errors } = usePage().props;
  const { setCurrentChat, setAllChats, setGroupChats } = useChatsContext();

  useEffect(() => {
    if (flash?.success) setSuccessMessage(flash.success);
    if (flash?.error) setErrors([flash.error]);
  }, [flash]);

  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  useEffect(() => {
    let messages = [];
    Object.keys(errors).map((key) => messages.push(errors[key]));
    setErrors(messages);
  }, [errors]);

  useEffect(() => {
    if (!auth?.user) {
      router.get(route("login"));
    }
  }, [auth]);

  useEffect(() => {
    setCurrentChat(null);
    setAllChats(allChats);
    setGroupChats(groupsChat);
  }, [allChats, groupsChat]);

  return (
    <>
      <Head>
        <title>Social media Laravel + React</title>
        <meta
          head-key="description"
          name="description"
          content="This is the default description"
        />
        <link rel="icon" type="image/svg+xml" href="/images.jpeg" />
      </Head>
      <div className="flex min-h-barHeight overflow-hidden">
        <ChatsBar setIsLoading={setIsLoading} />
        <MessagesContainer isLoading={isLoading} />
      </div>
    </>
  );
}

Chats.layout = (page) => {
  return <Authenticated children={page}></Authenticated>;
};
export default Chats;
