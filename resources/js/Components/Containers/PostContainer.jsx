import React, { useEffect, useState } from "react";
import PostCard from "../Shared/PostCard";
import { useInView } from "react-intersection-observer";
import axiosClient from "@/AxiosClient/AxiosClient";

const PostContainer = ({ posts, currentUser }) => {
  const [ref, inView, entry] = useInView();
  const [allPosts, setAllPosts] = useState(posts.posts.data);
  const [allData, setAllData] = useState(posts);
  useEffect(() => {
    if (inView && allData.meta.current_page < allData.meta.last_page) {
      axiosClient
        .get(`http://192.168.1.103:8000?page=${allData.meta.current_page + 1}`)
        .then((data) => {
          setAllData((prevData) => ({
            ...prevData,
            meta: data.data.posts.meta,
          }));
          setAllPosts((prevPosts) => [...prevPosts, ...data.data.posts.posts]);
          console.log(data.data.posts.posts);
        });
    }
  }, [inView]);
  useEffect(() => {
    setAllPosts(posts.posts.data);
    setAllData(posts);
  }, [posts]);
  return (
    <>
      <div className="flex flex-col pb-4 lg:gap-5 gap-3 lg:py-4 lg:px-6 px-2 py-3 w-full lg:max-h-homeFeed max-h-postContainerM_H overflow-y-auto items-center">
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
          <div className="text-gray-700 my-[-10px]"> No More Posts</div>
        )}
      </div>
    </>
  );
};

export default PostContainer;
