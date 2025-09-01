import React, { useEffect, useState } from "react";
import PostCard from "../Shared/PostCard";
import { useInView } from "react-intersection-observer";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";
import Spinner from "../Shared/Spinner";
import HomeLoader from "./HomeLoader";
import { getRandomFloat } from "@/Functions";
import FriendSuggestionsContainer from "./FriendSuggestionsContainer";

const PostContainer = ({
  posts,
  AllPostsData,
  classes,
  children,
  isLoading,
  refetch,
  suggestions,
  showSuggestions,
  isLoadingSuggestions,
}) => {
  const [ref, inView, entry] = useInView();
  const [allPosts, setAllPosts] = useState(posts?.data);
  const [allData, setAllData] = useState(posts);
  const { user } = useUserContext();
  let random = getRandomFloat(10, 20);

  useEffect(() => {
    if (inView && allData?.meta?.current_page < allData?.meta?.last_page) {
      axiosClient
        .get(allData.links.next)
        .then(({ data }) => {
          setAllPosts((prevPosts) => [...prevPosts, ...data?.posts?.data]);
          setAllData(data?.posts);
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
        });
    }
  }, [inView]);
  useEffect(() => {
    setAllPosts(posts?.data);
    setAllData(posts);
  }, [posts]);
  return (
    <>
      <>
        <div
          className={`flex flex-col gap-3 w-full h-full items-center ${classes} pt-2 md:pt-4`}
        >
          {children}
          {isLoading ? (
            <HomeLoader />
          ) : (
            <>
              {AllPostsData?.length > 0 ? (
                <>
                  {allPosts?.length > 0 ? (
                    <>
                      {allPosts.map((post, index) => (
                        <>
                          {index == random ? (
                            <>
                              {showSuggestions ? (
                                <>
                                  <FriendSuggestionsContainer
                                    data={suggestions}
                                    isLoadingSuggestions={isLoadingSuggestions}
                                    key={(index, "a")}
                                  />
                                  <PostCard
                                    post={post}
                                    currentUser={user}
                                    key={index}
                                    refetch={refetch}
                                  />
                                </>
                              ) : (
                                <PostCard
                                  post={post}
                                  currentUser={user}
                                  key={index}
                                  refetch={refetch}
                                />
                              )}
                            </>
                          ) : (
                            <PostCard
                              post={post}
                              currentUser={user}
                              key={index}
                              refetch={refetch}
                            />
                          )}
                        </>
                      ))}
                      {allData?.meta?.current_page <
                      allData?.meta?.last_page ? (
                        <Spinner ref={ref} />
                      ) : (
                        <div className="text-gray-600 text-sm pb-4">
                          No More Posts
                        </div>
                      )}
                    </>
                  ) : (
                    <HomeLoader />
                  )}
                </>
              ) : (
                <>
                  <div className="text-gray-600 text-sm">No Posts To Show</div>
                  <HomeLoader />
                </>
              )}
            </>
          )}
        </div>
      </>
    </>
  );
};

export default PostContainer;
