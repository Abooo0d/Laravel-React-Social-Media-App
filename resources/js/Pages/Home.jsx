import ChatsBar from "@/Components/Containers/ChatsBar";
import HomeFeed from "@/Components/Containers/HomeFeed";
import { useMainContext } from "@/Contexts/MainContext";
import { useUserContext } from "@/Contexts/UserContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
export default function Home({ auth, posts, groups, notifications }) {
  const { setUser, user } = useUserContext();
  const [friends, setFriends] = useState(auth.user.friends);
  const { setSuccessMessage, setErrors } = useMainContext();
  const { flash, errors } = usePage().props;
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
    setFriends(auth.user.friends);
  }, [groups, posts, auth.user.friends]);

  useEffect(() => {
    if (!auth?.user) {
      window.location.href(route("login"));
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
      <Authenticated
        currentUser={auth?.user}
        notifications={notifications}
        groups={groups}
        followers={friends}
      >
        <div className="flex min-h-[calc(100vh-66px)] max-h-[calc(100vh-66px)] overflow-hidden bg-gray-900">
          <ChatsBar followers={friends} />
          <HomeFeed posts={posts} />
        </div>
      </Authenticated>
    </>
  );
}
