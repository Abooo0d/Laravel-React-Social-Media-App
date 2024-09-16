import React, { useEffect, useState } from "react";
import FullPostCard from "./FullPostCard";
import ImageFullView from "./ImageFullView";
import PostOwnerInfo from "./PostOwnerInfo";
import PostCardMenu from "./PostCardMenu";
import PostCardPostBody from "./PostCardPostBody";
import PostCardPostAttachments from "./PostCardPostAttachments";
import PostCardPostActions from "./PostCardPostActions";
const PostCard = ({ post, user }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    setOpenMenu(false);
  }, []);
  return (
    <>
      <div className="max-w-[700px] w-full dark:bg-gray-900 bg-gray-200 rounded-lg py-4 lg:px-6 px-4 flex lg:gap-6 gap-2 flex-col duration-200 shadow-md">
        <div className="flex justify-between items-center">
          <PostOwnerInfo post={post} user={user} />
          <PostCardMenu
            post={post}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </div>
        <PostCardPostBody post={post} />
        <PostCardPostAttachments
          post={post}
          setImage={setImage}
          setShowImage={setShowImage}
          setShowPost={setShowPost}
          setImageIndex={setImageIndex}
        />
        <PostCardPostActions />
      </div>
      <FullPostCard
        show={showPost}
        post={post}
        setShow={setShowPost}
        setImage={setImage}
        setShowImage={setShowImage}
        user={user}
        setImageIndex={setImageIndex}
      />
      <ImageFullView
        post={post}
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
        show={showImage}
        setShowImage={setShowImage}
        update={true}
      />
    </>
  );
};

export default PostCard;
