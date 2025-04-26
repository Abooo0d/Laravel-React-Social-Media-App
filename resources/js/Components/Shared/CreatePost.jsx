import React, { useState } from "react";
import CreatePostForm from "./CreatePostForm";
import { useUserContext } from "@/Contexts/UserContext";
const CreatePost = ({ groupId = null, classes }) => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useUserContext();
  return (
    <div
      className={`max-w-[700px] w-full dark:bg-gray-900 rounded-lg lg:px-6 px-4 flex flex-col duration-500 z-[50] ${classes}`}
    >
      <div
        className="w-full rounded-lg bg-gray-800/50 hover:bg-gray-700/50 py-1.5 px-3 duration-200 min-h-[40px] cursor-pointer text-gray-400 hover:border-gray-600 border-[1px] border-solid border-gray-600/50"
        onClick={() => setShowForm(true)}
      >
        What`s On Your Mind
      </div>
      <CreatePostForm
        showForm={showForm}
        setShowForm={setShowForm}
        groupId={groupId}
      />
    </div>
  );
};

export default CreatePost;
