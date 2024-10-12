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
  const [localPost, setLocalPost] = useState(post);
  useEffect(() => {
    setOpenMenu(false);
  }, []);
  useEffect(() => {
    console.log("Abood");
  }, [localPost]);

  return (
    <>
      <div className="max-w-[700px] w-full dark:bg-gray-900 bg-gray-200 rounded-lg py-4 lg:px-6 px-4 flex lg:gap-6 gap-2 flex-col duration-200 shadow-md">
        <div className="flex justify-between items-center">
          <PostOwnerInfo post={localPost} user={user} />
          <PostCardMenu
            post={localPost}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </div>
        <PostCardPostBody post={localPost} />
        <PostCardPostAttachments
          post={localPost}
          setImage={setImage}
          setShowImage={setShowImage}
          setShowPost={setShowPost}
          setImageIndex={setImageIndex}
        />
        <PostCardPostActions post={localPost} setPost={setLocalPost} />
      </div>
      <FullPostCard
        show={showPost}
        post={localPost}
        setShow={setShowPost}
        setImage={setImage}
        setShowImage={setShowImage}
        user={user}
        setImageIndex={setImageIndex}
      />
      <ImageFullView
        post={localPost}
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
