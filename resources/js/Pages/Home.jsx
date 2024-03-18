import FollowersBar from "@/Components/Containers/FollowersBar";
import GroupsBar from "@/Components/Containers/GroupsBar";
import GroupsContainer from "@/Components/Containers/GroupsContainer";
import TextInput from "@/Components/TextInput";
import { Head } from "@inertiajs/react";
const groups = [
  {
    name: "Laravel Dev",
    members: ["Alice", "Bob"],
    image: "https://picsum.photos/50",
    info: "ahsd asdjh asdjh asdia  aisdj iasd",
  },
  {
    name: "React groupe",
    members: ["Alice", "Bob"],
    image: "https://picsum.photos/50",
    info: "ahsd asdjh asdjh asdia  aisdj iasd",
  },
  {
    name: "React Native groupe ",
    members: ["Alice", "Bob"],
    image: "https://picsum.photos/50",
    info: "ahsd asdjh asdjh asdia  aisdj iasd",
  },
];
const followers = [
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
export default function Home() {
  return (
    <>
      <Head title="Social media Laravel + React" />
      <div className=" grid grid-cols-12 gap-3 min-h-[100vh]">
        <GroupsBar groups={groups} />
        <div className="col-span-6">Posts Feed</div>
        <FollowersBar followers={followers} />
      </div>
    </>
  );
}
