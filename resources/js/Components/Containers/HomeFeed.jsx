import React, { useState } from "react";
import CreatePost from "../Shared/CreatePost";
import PostContainer from "./PostContainer";

const HomeFeed = ({ posts, user }) => {
  const [allPosts, setAllPosts] = useState(posts);
  return (
    <div className="order-2 bg-gray-300 dark:bg-homeFeed lg:min-h-full min-h-[500px] max-h-homeFeedM_H col-span-6 rounded-lg lg:rounded-none overflow-hidden">
      <CreatePost user={user} setPosts={setAllPosts} posts={allPosts} />
      <PostContainer posts={allPosts} />
    </div>
  );
};

export default HomeFeed;
