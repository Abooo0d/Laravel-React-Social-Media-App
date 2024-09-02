import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import PostModel from "./PostModel";
const CreatePost = () => {
  const [showForm, setShowForm] = useState(false);
  const [post, setPost] = useState({
    body: "",
  });

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-900 px-3 py-3 flex flex-col gap-4  duration-300 h-[65px] border-b-[1px] border-solid border-gray-700">
      <div
        className="w-full resize-none rounded-lg bg-white/5 py-1.5  px-3 text-lg focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 duration-200 min-h-[40px] cursor-pointer text-gray-400 hover:border-sky-600 border-[1px] border-solid border-transparent"
        onClick={() => setShowForm(true)}
      >
        What`s On Your Mind
      </div>
      <PostModel showForm={showForm} setShowForm={setShowForm} />
    </div>
  );
};

export default CreatePost;
