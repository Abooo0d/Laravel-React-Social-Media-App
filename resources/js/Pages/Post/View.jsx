import PostCard from "@/Components/Shared/PostCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const View = ({ groups, notifications, auth, post }) => {
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
        currentUser={auth.user}
        groups={groups}
        notifications={notifications}
      >
        <div className="w-full flex justify-center items-start pt-4 max-h-barHeight">
          <PostCard post={post} currentUser={auth.user} />
        </div>
      </Authenticated>
    </>
  );
};

export default View;
