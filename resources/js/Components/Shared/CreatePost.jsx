import React, { useState } from "react";
import CreatePostForm from "./CreatePostForm";
import { useUserContext } from "@/Contexts/UserContext";
const CreatePost = ({ setPosts, posts, groupId, classes }) => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useUserContext();
  return (
    <div
      className={`max-lg:px-4 w-full bg-gray-200 flex flex-col duration-300 border-solid border-gray-700 ${classes}`}
    >
      <div
        className="w-full rounded-ld bg-gray-800/50 hover:bg-gray-700/50 py-1.5 px-3 duration-200 min-h-[40px] cursor-pointer text-gray-400 hover:border-gray-600 border-[1px] border-solid border-gray-600/50"
        onClick={() => setShowForm(true)}
      >
        What`s On Your Mind
      </div>
      <CreatePostForm
        showForm={showForm}
        setShowForm={setShowForm}
        user={user}
        setPosts={setPosts}
        posts={posts}
        groupId={groupId}
      />
    </div>
  );
};

export default CreatePost;
