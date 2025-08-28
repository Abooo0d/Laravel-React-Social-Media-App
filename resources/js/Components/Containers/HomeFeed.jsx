import React, { useEffect, useState } from "react";
import CreatePost from "../Shared/CreatePost";
import PostContainer from "./PostContainer";
import FriendSuggestionsContainer from "./FriendSuggestionsContainer";
import HomeLoader from "./HomeLoader";
import ProfileLoader from "./ProfileLoader";

const HomeFeed = ({
  posts,
  loading,
  refetch,
  suggestions,
  isLoadingSuggestions,
}) => {
  const [allPosts, setAllPosts] = useState(posts?.posts);
  useEffect(() => {
    setAllPosts(posts?.posts);
  }, [posts]);

  return (
    <div className="order-2 bg-gray-300 dark:bg-homeFeed lg:min-h-full min-h-[500px] max-h-barHeight flex-1 overflow-scroll">
      <PostContainer
        posts={allPosts}
        AllPostsData={posts?.posts?.data}
        classes="px-2 md:px-4 "
        isLoading={loading}
        refetch={refetch}
        suggestions={suggestions}
        showSuggestions={true}
        isLoadingSuggestions={isLoadingSuggestions}
      >
        <CreatePost classes="px-3 py-3" refetch={refetch} groupId="" />
      </PostContainer>
    </div>
  );
};

export default HomeFeed;
