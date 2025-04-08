import PostCard from "@/Components/Shared/PostCard";
import { useUserContext } from "@/Contexts/UserContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect } from "react";

const View = ({ groups, notifications, auth, post }) => {
  const { setUser } = useUserContext();
  useEffect(() => {
    if (auth?.user) {
      setUser(auth.user);
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
        groups={groups}
        notifications={notifications}
        followers={auth.user.friends}
      >
        <div className="w-full flex justify-center items-start py-4 max-h-barHeight overflow-auto">
          <PostCard post={post} currentUser={auth.user} />
        </div>
      </Authenticated>
    </>
  );
};

export default View;
