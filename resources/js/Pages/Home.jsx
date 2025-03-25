import FollowersBar from "@/Components/Containers/FollowersBar";
import GroupsBar from "@/Components/Containers/GroupsBar";
import GroupsContainer from "@/Components/Containers/GroupsContainer";
import HomeFeed from "@/Components/Containers/HomeFeed";
import Notification from "@/Components/Shared/Notification";
import TextInput from "@/Components/TextInput";
import { useMainContext } from "@/Contexts/MainContext";
import { useUserContext } from "@/Contexts/UserContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
export default function Home({ auth, posts, groups, followers }) {
  const { setUser, user } = useUserContext();
  const [postsData, setPostsData] = useState(posts);
  const [groupsData, setGroupsData] = useState(groups);
  const [followersData, setFollowersData] = useState(followers);
  const { setSuccessMessage } = useMainContext();
  const { flash } = usePage().props;
  useEffect(() => {
    if (flash?.success) setSuccessMessage(flash.success);
  }, [flash]);
  useEffect(() => {
    setPostsData(posts);
  }, [posts]);
  useEffect(() => {
    setUser(auth.user);
  }, []);

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
      <Authenticated>
        <div className="flex lg:flex-col flex-col-reverse lg:gap-0 gap-2 p-2 lg:p-0 lg:grid lg:grid-cols-12 min-h-barHeight max-h-barHeight overflow-scroll bg-gray-900">
          <GroupsBar groups={groupsData} setGroups={setGroupsData} />
          <HomeFeed posts={posts} />
          <FollowersBar followers={followersData} />
        </div>
      </Authenticated>
    </>
  );
}
