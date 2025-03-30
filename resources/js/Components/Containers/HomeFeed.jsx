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
      <PostContainer posts={allPosts} classes="pb-20">
        <CreatePost
          setPosts={setAllPosts}
          posts={allPosts}
          classes="px-3 py-3 bg-gray-900"
        />
      </PostContainer>
    </div>
  );
};

export default HomeFeed;
