import React from "react";
import PostCard from "../Shared/PostCard";

const PostContainer = ({ posts }) => {
  console.log("Abood", posts);
  return (
    <div className="flex flex-col lg:gap-5 gap-2 lg:py-4 lg:px-6 px-2 py-3 w-full lg:max-h-homeFeed max-h-postContainerM_H overflow-y-auto items-center">
      {posts.map((post, index) => (
        <PostCard post={post} key={index} />
      ))}
    </div>
  );
};

export default PostContainer;
