import React, { useState } from "react";
import { router } from "@inertiajs/react";
const CreatePost = () => {
  const [showForm, setShowForm] = useState(false);
  const [post, setPost] = useState({
    body: "",
  });
  const handelSubmit = () => {
    console.log(post);
    router.post(route("post.create"), post, {
      onSuccess: () => {
        setPost({ body: "" });
      },
    });
  };

  return (
    <div
      className={`w-full bg-gray-200 dark:bg-gray-900 px-3 py-3 flex flex-col gap-4 border-b-[2px] dark:border-gray-900 border-gray-300 duration-300 overflow-hidden  ${
        showForm ? "h-[230px]" : "h-[65px]"
      }`}
    >
      <textarea
        className={`w-full resize-none rounded-lg border-none bg-white/5 py-1.5  px-3 text-lg text-white
                  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 duration-200 min-h-[40px] ${
                    showForm ? "h-[150px]" : "h-[40px]"
                  }`}
        placeholder=" Click here To Create post"
        onClick={() => setShowForm(true)}
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
      ></textarea>

      <div className={`flex justify-between items-center duration-100`}>
        <button
          className="py-2 px-8 rounded-lg bg-indigo-500 duration-200 cursor-pointer hover:bg-indigo-700 text-gray-300"
          onClick={() => {
            handelSubmit();
          }}
        >
          Submit
        </button>
        <button
          className="py-2 px-8 rounded-lg bg-gray-500 duration-200 cursor-pointer hover:bg-gray-600 text-gray-300"
          onClick={() => {
            setShowForm(false);
            setPost({ body: "" });
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
