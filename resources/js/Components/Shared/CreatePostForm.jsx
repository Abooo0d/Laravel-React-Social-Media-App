import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { HiMiniXMark } from "react-icons/hi2";
import "./index.css";
import { router } from "@inertiajs/react";
import { isImage } from "@/Functions";
import ImageFullView from "./ImageFullView";
import PostPreview from "./PostPreview";
import CreatePostPostAttachments from "./CreatePostPostAttachments";
import { SecondaryButton, PrimaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
const CreatePostForm = ({ showForm, setShowForm, user }) => {
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const [showPost, setShowPost] = useState(false);
  const [post, setPost] = useState({ body: "", attachments: [] });
  const [_post, set_Post] = useState({ body: "", attachments: [] });
  useEffect(() => {
    setPost({ body: "", attachments: [] });
    set_Post({ body: "", attachments: [] });
  }, [showForm]);

  function close() {
    setPost({ body: "", attachments: [] });
    set_Post({ body: "", attachments: [] });
    setShowForm(false);
  }
  const handelSubmit = () => {
    router.post(route("post.create"), _post, {
      forceFormData: true,
      onSuccess: () => {
        setPost({ body: "", attachment: [] });
        set_Post({ body: "", attachments: [] });
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
      set_Post((prevPost) => ({
        ...prevPost,
        attachments: [...prevPost.attachments, myFile.file],
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
      <PopupCard showForm={showForm}>
        <SecondaryButton
          event={close}
          classes={"absolute top-[20px] right-[20px] py-1.5 px-3"}
        >
          <HiMiniXMark className="w-5 h-5 text-gray-200" />
        </SecondaryButton>
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
              set_Post({ ..._post, body: editor.getData() });
            }}
          />
          <CreatePostPostAttachments
            setPost={setPost}
            post={post}
            setImage={setImage}
            setShowImage={setShowImage}
            setShowPost={setShowPost}
          />
        </div>
        <div className="mt-4 gap-2 flex justify-end items-center">
          <SecondaryButton classes="relative py-1.5 px-3">
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
          </SecondaryButton>
          <PrimaryButton
            classes={"py-1.5 px-3"}
            event={() => {
              handelSubmit();
            }}
          >
            Submit
          </PrimaryButton>
        </div>
      </PopupCard>
      <PostPreview
        show={showPost}
        user={user}
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
  );
};

export default CreatePostForm;
