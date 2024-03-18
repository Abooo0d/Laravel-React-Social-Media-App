import React from "react";
import PostCard from "../Shared/PostCard";

const PostContainer = ({ posts }) => {
  return (
    <div className="flex flex-col gap-5 py-4 px-6 w-full">
      {posts.map((post, index) => (
        <PostCard post={post} key={index} />
      ))}
    </div>
  );
};

export default PostContainer;
