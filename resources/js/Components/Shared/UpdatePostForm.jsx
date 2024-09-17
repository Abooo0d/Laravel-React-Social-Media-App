import { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import PostOwnerInfo from "./PostOwnerInfo";
import { router } from "@inertiajs/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import PostPreview from "./PostPreview";
import ImageFullView from "./ImageFullView";
import { isImage } from "@/Functions";
import UpdatePostPostAttachments from "./UpdatePostPostAttachments";
import { SecondaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
import { useMainContext } from "@/Contexts/MainContext";
export default function UpdatePostForm({ post, user, showForm, setShowForm }) {
  const { setSuccessMessage, setErrors } = useMainContext();
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [postData, setPostData] = useState(post);
  const [attachment, setAttachment] = useState();
  const [imageIndex, setImageIndex] = useState();
  const [attachmentsErrors, setAttachmentsErrors] = useState([]);
  const [finalPost, setFinalPost] = useState({
    ...post,
    attachments: [],
    deletedFilesIds: [],
  });
  function close() {
    setShowForm(false);
  }
  useEffect(() => {
    setPostData(post);
    setFinalPost({
      ...post,
      attachments: [],
      deletedFilesIds: [],
    });
    setAttachmentsErrors([]);
  }, [showForm]);

  const handelSubmit = () => {
    router.post(route("post.update", finalPost), finalPost, {
      forceFormData: true,
      onSuccess: () => {
        console.log("Abood");
        close();
        setSuccessMessage("Post Updated Successfully");
      },
      _method: "PUT",
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
  };
  const HandelTheFiles = async (e) => {
    for (const file of e.target.files) {
      const myFile = {
        file,
        url: await readFile(file),
      };
      setPostData((prev) => ({
        ...prev,
        attachments: [myFile, ...prev.attachments],
      }));
      setFinalPost((prev) => ({
        ...prev,
        attachments: [myFile.file, ...prev.attachments],
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
      setPostData((prevPost) => ({
        ...prevPost,
        attachments: prevPost.attachments.filter((f) => f !== attachment),
      }));
      if (update) {
        setFinalPost((prevPost) => ({
          ...prevPost,
          attachments: prevPost.attachments.filter(
            (f) => f !== attachment.file
          ),
        }));
      }
      setAttachmentsErrors((prevErrors) =>
        prevErrors.filter((f) => f.index != index)
      );
    } else {
      setPostData((prevPost) => ({
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
      setAttachmentsErrors((prevErrors) =>
        prevErrors.filter((f) => f.index != index)
      );
    }
  };
  const undoDelete = (attachment, update) => {
    setPostData((prevPost) => ({
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
    <>
      <PopupCard showForm={showForm}>
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-base/7 font-medium text-white mb-4">
              Edit Post
            </h3>
            <SecondaryButton event={close} classes={" px-3 py-1.5"}>
              <HiMiniXMark className="w-5 h-5 text-gray-200 " />
            </SecondaryButton>
          </div>
          <PostOwnerInfo post={post} user={user} />
          <div className="w-full max-h-[500px] flex flex-col gap-2 overflow-auto">
            <CKEditor
              editor={ClassicEditor}
              data={postData.body}
              onChange={(event, editor) => {
                setPostData({ ...postData, body: editor.getData() });
                setFinalPost({ ...finalPost, body: editor.getData() });
              }}
            />
            <UpdatePostPostAttachments
              post={postData}
              setImage={setImage}
              setShowImage={setShowImage}
              setShowPost={setShowPost}
              setAttachment={setAttachment}
              setImageIndex={setImageIndex}
              imageIndex={imageIndex}
              onDelete={onDelete}
              undoDelete={undoDelete}
              update={true}
              attachmentsErrors={attachmentsErrors}
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
      </PopupCard>
      <PostPreview
        show={showPost}
        user={user}
        post={postData}
        setShow={setShowPost}
        setImage={setImage}
        setShowImage={setShowImage}
        setImageIndex={setImageIndex}
        update={true}
        attachmentsErrors={attachmentsErrors}
        onDelete={onDelete}
        undoDelete={undoDelete}
      />
      <ImageFullView
        image={image}
        show={showImage}
        setShowImage={setShowImage}
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
        post={postData}
        update={true}
      />
    </>
  );
}
