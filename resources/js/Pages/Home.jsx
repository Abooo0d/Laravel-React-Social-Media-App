import FollowersBar from "@/Components/Containers/FollowersBar";
import GroupsBar from "@/Components/Containers/GroupsBar";
import GroupsContainer from "@/Components/Containers/GroupsContainer";
import HomeFeed from "@/Components/Containers/HomeFeed";
import Notification from "@/Components/Shared/Notification";
import TextInput from "@/Components/TextInput";
import { useMainContext } from "@/Contexts/MainContext";
import { useUserContext } from "@/Contexts/UserContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
const followers = [
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "Laravel Dev",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
  {
    name: "React groupe",
    username: ["Alice", "Bob"],
    image: "https://picsum.photos/51",
  },
  {
    name: "React Native groupe ",
    username: "Laravel Dev",
    image: "https://picsum.photos/51",
  },
];
export default function Home({ auth, posts, user, groups }) {
  const { setUser } = useUserContext();
  const [groupsData, setGroupsData] = useState(groups);
  useEffect(() => {
    setUser(user);
  }, [user]);

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
      <Authenticated user={auth.user}>
        <div className="flex flex-col lg:gap-0 gap-2 p-2 lg:p-0 lg:grid lg:grid-cols-12 min-h-barHeight lg:max-h-barHeight overflow-scroll bg-gray-900">
          <GroupsBar groups={groupsData} setGroups={setGroupsData} />
          <HomeFeed posts={posts} user={user} />
          <FollowersBar followers={followers} />
        </div>
      </Authenticated>
    </>
  );
}
