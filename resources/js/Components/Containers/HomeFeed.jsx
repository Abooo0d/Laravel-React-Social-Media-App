import React, { useEffect, useState } from "react";
import CreatePost from "../Shared/CreatePost";
import PostContainer from "./PostContainer";

const HomeFeed = ({ posts, loading, refetch }) => {
  const [allPosts, setAllPosts] = useState(posts?.posts);
  useEffect(() => {
    setAllPosts(posts?.posts);
  }, [posts]);

  return (
    <div className="order-2 bg-gray-300 dark:bg-homeFeed lg:min-h-full min-h-[500px] max-h-barHeight flex-1 overflow-scroll">
      <PostContainer
        posts={allPosts}
        AllPostsData={posts?.posts?.data}
        classes="px-4"
        isLoading={loading}
        refetch={refetch}
      >
        <CreatePost
          classes="px-3 py-3 bg-gray-900"
          refetch={refetch}
          groupId=""
        />
      </PostContainer>
    </div>
  );
};

export default HomeFeed;
