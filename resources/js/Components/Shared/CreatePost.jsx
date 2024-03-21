import React, { useState } from "react";

const CreatePost = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-900 p-6 flex flex-col gap-3 border-b-[2px] dark:border-gray-900 border-gray-300">
      <div
        className="w-full text-gray-800 dark:text-gray-500 text-xl py-2 px-8 border-[2px] border-solid dark:border-gray-800 border-gray-300 rounded-lg cursor-pointer"
        onClick={() => setShowForm(true)}
      >
        Click here To Create post
      </div>
      <div
        className={`flex justify-between items-center ${
          showForm ? "flex" : "hidden"
        }`}
      >
        <button className="py-2 px-8 rounded-lg bg-indigo-500 duration-200 cursor-pointer hover:bg-indigo-700 text-gray-300">
          Submit
        </button>
        <button className="py-2 px-8 rounded-lg bg-gray-500 duration-200 cursor-pointer hover:bg-gray-600 text-gray-300">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
