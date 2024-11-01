import React from "react";
import PostCard from "../Shared/PostCard";

const PostContainer = ({ posts, currentUser }) => {
  return (
    <div className="flex flex-col pb-0 lg:gap-5 gap-2 lg:py-4 lg:px-6 px-2 py-3 w-full lg:max-h-homeFeed max-h-postContainerM_H overflow-y-auto items-center">
      {posts.map((post, index) => (
        <PostCard post={post} user={post.user} key={index} />
      ))}
    </div>
  );
};

export default PostContainer;
