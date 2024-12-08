import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { HiMiniXMark } from "react-icons/hi2";
import { router } from "@inertiajs/react";
import { isImage } from "@/Functions";
import ImageFullView from "./ImageFullView";
import PostPreview from "./PostPreview";
import CreatePostPostAttachments from "./CreatePostPostAttachments";
import { SecondaryButton, PrimaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
import "./index.css";
import { useMainContext } from "@/Contexts/MainContext";
import Notification from "./Notification";
const CreatePostForm = ({ showForm, setShowForm, user, setPosts, posts }) => {
  const { errors, setErrors, successMessage, setSuccessMessage } =
    useMainContext();
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const [showPost, setShowPost] = useState(false);
  const [imageIndex, setImageIndex] = useState();
  const [attachmentsErrors, setAttachmentsErrors] = useState([]);
  const [post, setPost] = useState({ body: "", attachments: [] });
  const [_post, set_Post] = useState({ body: "", attachments: [] });
  let myFile;
  useEffect(() => {
    setPost({ body: "", attachments: [] });
    setAttachmentsErrors([]);
  }, [showForm]);
  useEffect(() => {
    if (post.body !== "" || post?.attachments?.length !== 0) {
      set_Post(() => ({
        ...post,
        attachments: post?.attachments?.map((attachment) => attachment.file),
      }));
    }
  }, [post]);

  function close() {
    setPost({ body: "", attachments: [] });
    setShowForm(false);
  }
  const handelSubmit = () => {
    if (post.body !== "" || post.attachments.length !== 0) {
      router.post(route("post.create"), _post, {
        forceFormData: true,
        onSuccess: (data1) => {
          setPost({ body: "", attachments: [] });
          setShowForm(false);
          setSuccessMessage("Post Created Successfully");
          setPosts((prevPosts) => ({
            ...prevPosts,
            posts: {
              ...prevPosts.posts,
              data: [data1.props.posts.posts.data[0], ...prevPosts.posts.data],
            },
          }));
        },
        onError: (errors) => {
          setAttachmentsErrors([]);
          setSuccessMessage("");
          setErrors([]);
          for (const key in errors) {
            setAttachmentsErrors((prevErrors) => [
              ...prevErrors,
              {
                index: key.split(".")[1],
                message: errors[key],
              },
            ]);
            setErrors([...errors, errors[key]]);
          }
        },
      });
    }
  };
  const HandelTheFiles = async (e) => {
    for (const file of e.target.files) {
      myFile = {
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
  const onDelete = (attachment, index, update) => {
    if (attachment.file) {
      setPost((prevPost) => ({
        ...prevPost,
        attachments: prevPost.attachments.filter((f) => f !== attachment),
      }));
      if (update) {
        setFinalPost((prevPost) => ({
          ...prevPost,
          attachments: prevPost.attachments.filter((f) => f !== attachment),
        }));
      }
      setAttachmentsErrors((prevErrors) =>
        prevErrors.filter((f) => f.index != index)
      );
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        attachments: prevPost.attachments.map((f) => ({
          ...f,
          isDeleted: f === attachment || f.isDeleted === true ? true : false,
        })),
      }));
      if (update) {
        setFinalPost((prevPost) => ({
          ...prevPost,
          deletedFilesIds: [...prevPost.deletedFilesIds, attachment.id],
        }));
      }
    }
  };
  const undoDelete = (attachment, update) => {
    setPost((prevPost) => ({
      ...prevPost,
      attachments: prevPost.attachments.map((f) => ({
        ...f,
        isDeleted: f === attachment ? false : f.isDeleted,
      })),
    }));
    if (update) {
      setFinalPost((prevPost) => ({
        ...prevPost,
        deletedFilesIds: [
          ...prevPost.deletedFilesIds.filter((f) => f !== attachment.id),
        ],
      }));
    }
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
            }}
          />
          <CreatePostPostAttachments
            post={post}
            attachmentsErrors={attachmentsErrors}
            onDelete={onDelete}
            undoDelete={undoDelete}
            update={false}
            setImage={setImage}
            setShowImage={setShowImage}
            setShowPost={setShowPost}
            setImageIndex={setImageIndex}
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
        update={false}
        attachmentsErrors={attachmentsErrors}
        onDelete={onDelete}
        undoDelete={undoDelete}
        setShow={setShowPost}
        setImage={setImage}
        setShowImage={setShowImage}
        setImageIndex={setImageIndex}
      />
      <ImageFullView
        image={image}
        show={showImage}
        imageIndex={imageIndex}
        post={post}
        setShowImage={setShowImage}
        setImageIndex={setImageIndex}
        update={false}
      />
    </div>
  );
};

export default CreatePostForm;
