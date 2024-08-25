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
        console.log("Abood");
      },
    });
  };
  return (
    <div
      className={`w-full bg-gray-200 dark:bg-gray-900 px-3 py-3 flex flex-col gap-4 border-b-[2px] dark:border-gray-900 border-gray-300 duration-300 overflow-hidden ${
        showForm ? "h-[130px]" : "h-[70px]"
      }`}
    >
      <input
        type="text"
        className="w-full text-gray-800 bg-gray-800 duration-300 dark:text-gray-500 lg:text-xl text-lg py-2 px-8 border-[1px] border-solid dark:border-gray-800 border-gray-300 rounded-lg cursor-pointer"
        onClick={() => setShowForm(true)}
        placeholder=" Click here To Create post"
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
      />

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
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
