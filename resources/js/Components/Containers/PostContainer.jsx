import React, { useEffect, useState } from "react";
import PostCard from "../Shared/PostCard";
import { useInView } from "react-intersection-observer";
import axiosClient from "@/AxiosClient/AxiosClient";

const PostContainer = ({ posts, currentUser, classes }) => {
  const [ref, inView, entry] = useInView();
  const [allPosts, setAllPosts] = useState(posts.posts.data);
  const [allData, setAllData] = useState(posts);
  useEffect(() => {
    if (inView && allData.meta.current_page < allData.meta.last_page) {
      axiosClient
        .get(`http://127.0.0.1:8000?page=${allData.meta.current_page + 1}`)
        .then((data) => {
          setAllData((prevData) => ({
            ...prevData,
            meta: data.data.posts.meta,
          }));
          setAllPosts((prevPosts) => [...prevPosts, ...data.data.posts.posts]);
        });
    }
  }, [inView]);
  useEffect(() => {
    setAllPosts(posts.posts.data);
    setAllData(posts);
  }, [posts]);
  return (
    <>
      <div
        className={`flex flex-col gap-3 w-full  h-full max-lg:pb-4 pt-4 px-4 overflow-y-auto items-center ${classes}`}
      >
        {allPosts.length > 0 ? (
          <>
            {allPosts.map((post, index) => (
              <React.Fragment key={index}>
                <PostCard post={post} user={post.user} />
              </React.Fragment>
            ))}
            {allData.meta.current_page < allData.meta.last_page ? (
              <div
                ref={ref}
                className="w-[40px] min-h-[40px] bg-transparent border-[2px] rounded-full border-t-gray-600 border-t-[4px] border-gray-700/50 border-top-gray-900 mx-auto my-1 animate-spin"
              />
            ) : (
              <div className="text-gray-600 text-sm">No More Posts</div>
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
