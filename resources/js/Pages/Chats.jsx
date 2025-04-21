import ChatsBar from "@/Components/Containers/ChatsBar";
import MessagesContainer from "@/Components/Containers/MessagesContainer";
import { useMainContext } from "@/Contexts/MainContext";
import { useUserContext } from "@/Contexts/UserContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
function Chats({ auth, groupsChat, chat_with_friend, allChats }) {
  const { setUser } = useUserContext();
  const { setSuccessMessage, setErrors } = useMainContext();
  const { flash, errors } = usePage().props;
  const [currentChat, setCurrentChat] = useState(chat_with_friend);
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
      <div className="flex min-h-barHeight overflow-hidden bg-red-900">
        <ChatsBar
          chats={allChats}
          setChat={setCurrentChat}
          groupsChat={groupsChat}
        />
        <MessagesContainer chat={currentChat} setChat={setCurrentChat} />
      </div>
    </>
  );
}

Chats.layout = (page) => {
  return <Authenticated children={page}></Authenticated>;
};
export default Chats;
