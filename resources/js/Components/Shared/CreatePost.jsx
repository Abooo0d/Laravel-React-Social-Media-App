import React, { useState } from "react";
import CreatePostForm from "./CreatePostForm";
const CreatePost = ({ groupId = null, classes, refetch }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div
      className={`max-w-[700px] w-full bg-gray-200 dark:bg-gray-900 rounded-lg lg:px-6 px-4 flex flex-col duration-500  ${classes}`}
    >
      <div
        className="w-full rounded-lg bg-gray-300 hover:bg-gray-300/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 py-1.5 px-3 duration-200 min-h-[40px] cursor-pointer text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600 border-[1px] border-solid border-gray-300 dark:border-gray-600/50"
        onClick={() => setShowForm(true)}
      >
        What`s On Your Mind
      </div>
      <CreatePostForm
        refetch={refetch}
        showForm={showForm}
        setShowForm={setShowForm}
        groupId={groupId}
      />
    </div>
  );
};

export default CreatePost;
