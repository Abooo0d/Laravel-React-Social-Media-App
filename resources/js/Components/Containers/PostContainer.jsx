import React, { useEffect, useState } from "react";
import PostCard from "../Shared/PostCard";
import { useInView } from "react-intersection-observer";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";
import Spinner from "../Shared/Spinner";
import HomeLoader from "./HomeLoader";

const PostContainer = ({ posts, classes, children, isLoading, refetch }) => {
  const [ref, inView, entry] = useInView();
  const [allPosts, setAllPosts] = useState(posts?.data);
  const [allData, setAllData] = useState(posts);
  const { user } = useUserContext();
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
          className={`flex flex-col gap-3 w-full h-full items-center ${classes} pt-4`}
        >
          {children}
          {isLoading ? (
            <HomeLoader />
          ) : (
            <>
              {allPosts?.length > 0 ? (
                <>
                  {allPosts.map((post, index) => (
                    <PostCard
                      post={post}
                      currentUser={user}
                      key={index}
                      refetch={refetch}
                    />
                  ))}
                  {allData?.meta?.current_page < allData?.meta?.last_page ? (
                    <Spinner ref={ref} />
                  ) : (
                    <div className="text-gray-600 text-sm pb-4">
                      No More Posts
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-600 text-sm">No Posts To Show</div>
              )}
            </>
          )}
        </div>
      </>
    </>
  );
};

export default PostContainer;
