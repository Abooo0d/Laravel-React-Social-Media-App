import React from "react";
import CreatePost from "../Shared/CreatePost";
import PostContainer from "./PostContainer";

const HomeFeed = ({ posts }) => {
  return (
    <div className=" bg-gray-300 dark:bg-homeFeed min-h-full col-span-6">
      <CreatePost />
      <PostContainer posts={posts} />
    </div>
  );
};

export default HomeFeed;
