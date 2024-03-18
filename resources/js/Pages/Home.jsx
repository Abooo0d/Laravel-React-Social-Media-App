import FollowersBar from "@/Components/Containers/FollowersBar";
import GroupsBar from "@/Components/Containers/GroupsBar";
import GroupsContainer from "@/Components/Containers/GroupsContainer";
import HomeFeed from "@/Components/Containers/HomeFeed";
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
const posts = [
  {
    ownerName: "Abood",
    ownerImage: "https://picsum.photos/51",
    postImage: "https://picsum.photos/200",
    caption:
      "khasd asdihad asdija asidjad i jauh aihd asd adjasdhkhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdha khasd asdihad asdija asidjad i jauh aihd asd adjasdhkhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdha khasd asdihad asdija asidjad i jauh aihd asd adjasdhkhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdha khasd asdihad asdija asidjad i jauh aihd asd adjasdhkhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdha khasd asdihad asdija asidjad i jauh aihd asd adjasdhkhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdha",
    createdAt: "20/7/2001",
  },
  {
    ownerName: "Ahmad",
    ownerImage: "https://picsum.photos/51",
    postImage: "https://picsum.photos/200",
    caption:
      "khasd asdihad asdija asidjad i jauh aihd asd adjasdhkhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdha",
    createdAt: "20/7/2001",
  },
  {
    ownerName: "Mohamad",
    ownerImage: "https://picsum.photos/51",
    postImage: "https://picsum.photos/200",
    caption:
      "khasd asdihad asdija asidjad i jauh aihd asd adjasdhkhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdhakhasd asdihad asdija asidjad i jauh aihd asd adjasdh asdha",
    createdAt: "20/7/2001",
  },
];
export default function Home() {
  return (
    <>
      <Head title="Social media Laravel + React" />
      <div className=" grid grid-cols-12 min-h-[100vh]">
        <GroupsBar groups={groups} />
        <HomeFeed posts={posts} />
        <FollowersBar followers={followers} />
      </div>
    </>
  );
}