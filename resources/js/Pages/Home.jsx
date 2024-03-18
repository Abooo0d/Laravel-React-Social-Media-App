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
export default function Home() {
  return (
    <>
      <Head title="Social media Laravel + React" />
      <div className=" grid grid-cols-12 gap-3 min-h-full">
        <GroupsBar groups={groups} />
        <div className="col-span-6">Posts Feed</div>
        <div className="col-span-3">Users</div>
      </div>
    </>
  );
}
