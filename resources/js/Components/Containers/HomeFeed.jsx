import React, { useEffect, useState } from "react";
import CreatePost from "../Shared/CreatePost";
import PostContainer from "./PostContainer";
import { useUserContext } from "@/Contexts/UserContext";

const HomeFeed = ({ posts }) => {
  const [allPosts, setAllPosts] = useState(posts);
  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);

  return (
    <div className="order-2 bg-gray-300 dark:bg-homeFeed lg:min-h-full min-h-[500px] max-h-homeFeedM_H col-span-6 rounded-lg lg:rounded-none overflow-scroll">
      <CreatePost
        setPosts={setAllPosts}
        posts={allPosts}
        classes="px-3 pt-2 pb-2 bg-gray-900 border-b-solid border-b-[1px] border-gray-300"
      />
      <PostContainer posts={allPosts} classes="pb-20" />
    </div>
  );
};

export default HomeFeed;
