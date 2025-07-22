import { useEffect, useRef, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import PostOwnerInfo from "./PostOwnerInfo";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import PostPreview from "./PostPreview";
import ImageFullView from "./ImageFullView";
import UpdatePostPostAttachments from "./UpdatePostPostAttachments";
import { SecondaryButton } from "./Buttons";
import PopupCard from "./PopupCard";
import { useMainContext } from "@/Contexts/MainContext";
import axiosClient from "@/AxiosClient/AxiosClient";
export default function UpdatePostForm({
  post,
  user,
  showForm,
  setShowForm,
  refetch,
}) {
  const { setSuccessMessage, setErrors } = useMainContext();
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [postData, setPostData] = useState(post);
  const [imageIndex, setImageIndex] = useState();
  const [attachmentsErrors, setAttachmentsErrors] = useState([]);
  const inputRef = useRef();
  const [finalPost, setFinalPost] = useState({
    ...post,
    attachments: [],
    deletedFilesIds: [],
  });

  function close() {
    setShowForm(false);
  }
  const handleInput = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "80px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  useEffect(() => {
    setPostData(post);
    setFinalPost({
      ...post,
      attachments: [],
      deletedFilesIds: [],
    });
    setAttachmentsErrors([]);
    handleInput();
  }, [showForm]);

  const handelSubmit = () => {
    const formData = new FormData();
    formData.append("id", finalPost.id);
    formData.append("body", finalPost.body);
    formData.append("user_id", finalPost.user.id);
    formData.append("group_id", finalPost.group ? finalPost.group.id : "");
    const ids = finalPost.deletedFilesIds;
    ids.forEach((id) => {
      formData.append("deletedFilesIds[]", id);
    });
    const attachments = finalPost.attachments;
    attachments.forEach((attachment) => {
      formData.append("attachments[]", attachment);
    });
    if (post.body !== "" || post.attachments.length !== 0) {
      axiosClient
        .post(route("post.update", finalPost.id), formData)
        .then((data) => {
          refetch();
          setSuccessMessage("The Post Updated Successfully");
          setShowForm(false);
        })
        .catch((err) => {
          setAttachmentsErrors([]);
          for (const key in e) {
            setAttachmentsErrors((prevErrors) => [
              ...prevErrors,
              {
                index: key.split(".")[1],
                message: e[key],
              },
            ]);
          }
          setErrors([e?.response?.data?.message || "Some Thing Went Wrong"]);
        });
    }
    handleInput();
  };
  const HandelTheFiles = async (e) => {
    let files = e.target.files;
    const updatedFiles = [...files].map((file) => {
      return { file: file, url: URL.createObjectURL(file) };
    });
    for (const f of updatedFiles) {
      setPostData((prev) => ({
        ...prev,
        attachments: [f, ...prev.attachments],
      }));
      setFinalPost((prev) => ({
        ...prev,
        attachments: [f.file, ...prev.attachments],
      }));
    }
    e.target.value = null;
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
  useEffect(() => {
    handleInput();
  }, [postData]);
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
          <textarea
            className="bg-gray-800 flex-1 w-full rounded-md outline-none border-none focus:outline-none focus:border-none ring-0 focus:ring-0 text-gray-300 resize-none min-h-[80px] max-h-[150px] "
            ref={inputRef}
            name="message"
            value={postData?.body || ""}
            placeholder="What On You Mind"
            onChange={(e) => {
              setPostData({ ...postData, body: e.target.value });
              setFinalPost({ ...finalPost, body: e.target.value });
            }}
          ></textarea>
          <UpdatePostPostAttachments
            post={postData}
            setImage={setImage}
            setShowImage={setShowImage}
            setShowPost={setShowPost}
            setImageIndex={setImageIndex}
            imageIndex={imageIndex}
            onDelete={onDelete}
            undoDelete={undoDelete}
            update={true}
            attachmentsErrors={attachmentsErrors}
          />
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
