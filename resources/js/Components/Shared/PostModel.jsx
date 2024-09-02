import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { HiMiniXMark } from "react-icons/hi2";
import "./index.css";
import { router } from "@inertiajs/react";
import { isImage } from "@/Functions";
import { CiCirclePlus } from "react-icons/ci";
import FullPostCard from "./FullPostCard";
import ImageFullView from "./ImageFullView";
import PostPreview from "./PostPreview";
import PostAttachments from "./PostAttachments";
const PostModel = ({ showForm, setShowForm }) => {
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const [showPost, setShowPost] = useState(false);
  const [post, setPost] = useState({ body: "", attachments: [] });
  function open() {
    setIsOpen(true);
  }
  function close() {
    setShowForm(false);
  }
  const handelSubmit = () => {
    router.post(route("post.create"), post, {
      onSuccess: () => {
        setPost({ body: "", attachment: [] });
        setShowForm(false);
      },
    });
  };
  const HandelTheFiles = async (e) => {
    for (const file of e.target.files) {
      const myFile = {
        file,
        url: await readFile(file),
      };
      setPost((prev) => ({
        ...prev,
        attachments: [...prev.attachments, myFile],
      }));
    }
    e.target.value = null;
  };
  const readFile = async (file) => {
    return new Promise((res, rej) => {
      if (isImage(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          res(reader.result);
        };
        reader.onerror = rej;
        reader.readAsDataURL(file);
      } else {
        res(null);
      }
    });
  };
  return (
    <div
      className={`relative z-10 focus:outline-none delay-200 ${
        showForm ? "visible " : "invisible"
      }`}
    >
      <div className={`fixed inset-0 z-10 w-screen overflow-y-auto `}>
        <div className="flex min-h-full items-center justify-center p-4 bg-gray-900/30 backdrop-blur-sm">
          <div
            className={`relative max-w-[80%] w-[600px] rounded-xl bg-gray-900/90 border-[1px] border-solid border-gray-700 p-6 backdrop-blur-2xl duration-200 ${
              showForm
                ? "visible opacity-100"
                : "invisible opacity-0 scale-[95%]"
            } `}
          >
            <button
              className="bg-gray-800/70 absolute top-[20px] right-[20px] rounded-md flex justify-center items-center p-2 border-[1px] border-solid border-gray-700 hover:bg-gray-800 duration-200"
              onClick={() => {
                close();
              }}
            >
              <HiMiniXMark className="w-5 h-5 text-gray-200" />
            </button>
            <div as="h3" className="text-base/7 font-medium text-white mb-4">
              Create Post
            </div>
            <div className="max-h-[600px] overflow-auto">
              <CKEditor
                editor={ClassicEditor}
                data={post.body}
                config={{
                  toolbar: [
                    "heading", // Heading dropdown
                    "|", // Separator
                    "bold", // Bold
                    "italic", // Italic
                    "|", // Separator
                    "link", // Link
                    "blockquote", // Block quote
                    "|", // Separator
                    "bulletedList", // Bulleted list
                    "numberedList", // Numbered list
                    "|", // Separator
                    "outdent", // Outdent
                    "indent", // Indent
                    "|", // Separator
                    "undo", // Undo
                    "redo", // Redo
                  ],
                }}
                onChange={(event, editor) => {
                  setPost({ ...post, body: editor.getData() });
                }}
              />
              <PostAttachments
                setPost={setPost}
                post={post}
                setImage={setImage}
                setShowImage={setShowImage}
                setShowPost={setShowPost}
              />
            </div>
            <div className="mt-4 gap-2 flex justify-end items-center">
              <button className="cursor-pointer relative inline-flex items-center gap-2 rounded-md bg-gray-800/70 hover:bg-gray-800 duration-200 py-1.5 px-3 border-[1px] border-gray-700 border-solid text-sm/6 font-semibold text-white  focus:outline-none ">
                Add Files
                <input
                  type="file"
                  name="files"
                  className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer opacity-0"
                  multiple
                  onChange={(e) => {
                    HandelTheFiles(e);
                  }}
                />
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700/70 hover:bg-gray-700 duration-200 py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-none border-[1px] border-solid border-gray-700"
                onClick={() => {
                  handelSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <PostPreview
          show={showPost}
          post={post}
          setPost={setPost}
          setShow={setShowPost}
          setImage={setImage}
          setShowImage={setShowImage}
        />
        <ImageFullView
          image={image}
          show={showImage}
          setShowImage={setShowImage}
        />
      </div>
    </div>
  );
};

export default PostModel;
