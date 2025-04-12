import React, { useEffect, useState } from "react";
import PostCard from "../Shared/PostCard";
import { useInView } from "react-intersection-observer";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useUserContext } from "@/Contexts/UserContext";

const PostContainer = ({ posts, classes, children }) => {
  const [ref, inView, entry] = useInView();
  const [allPosts, setAllPosts] = useState(posts.data);
  const [allData, setAllData] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUserContext();

  useEffect(() => {
    if (inView && currentPage < allData.meta.last_page) {
      axiosClient
        .get(allData.meta.path + `?page=${currentPage + 1}`)
        .then(({ data }) => {
          setAllPosts((prevPosts) => [...prevPosts, ...data.posts]);
          setCurrentPage((prev) => {
            return prev + 1;
          });
        });
    }
  }, [inView]);
  useEffect(() => {
    setAllPosts(posts.data);
    setAllData(posts);
  }, [posts]);
  return (
    <>
      <div
        className={`flex flex-col gap-3 w-full h-full items-center ${classes} pt-4`}
      >
        {children}

        {allPosts.length > 0 ? (
          <>
            {allPosts.map((post, index) => (
              <PostCard post={post} currentUser={user} key={index} />
            ))}
            {currentPage < allData.meta.last_page ? (
              <div
                ref={ref}
                className="w-[40px] min-h-[40px] bg-transparent border-[2px] rounded-full border-t-gray-600 border-t-[4px] border-gray-700/50 border-top-gray-900 mx-auto my-1 animate-spin"
              />
            ) : (
              <div className="text-gray-600 text-sm pb-4">No More Posts</div>
            )}
          </>
        ) : (
          <div className="text-gray-600 text-sm">No Posts To Show</div>
        )}
      </div>
    </>
  );
};

export default PostContainer;
