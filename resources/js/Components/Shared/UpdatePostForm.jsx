import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
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
export default function UpdatePostForm({ post, user, showForm, setShowForm }) {
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [postData, setPostData] = useState(post);
  const [attachment, setAttachment] = useState();
  const [imageIndex, setImageIndex] = useState();
  const [attachmentId, setAttachmentId] = useState(0);
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
  }, [showForm]);

  const handelSubmit = () => {
    router.post(route("post.update", finalPost), finalPost, {
      forceFormData: true,
      onSuccess: () => {
        close();
      },
      _method: "PUT",
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
        attachments: [...prev.attachments, myFile],
      }));
      setFinalPost((prev) => ({
        ...prev,
        attachments: [...prev.attachments, myFile.file],
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
              setFinalPost={setFinalPost}
              setPost={setPostData}
              post={postData}
              setImage={setImage}
              setShowImage={setShowImage}
              setShowPost={setShowPost}
              setAttachment={setAttachment}
              setImageIndex={setImageIndex}
              imageIndex={imageIndex}
              setAttachmentId={setAttachmentId}
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
        finalPost={finalPost}
        setFinalPost={setFinalPost}
        show={showPost}
        user={user}
        post={postData}
        setPost={setPostData}
        setShow={setShowPost}
        setImage={setImage}
        setShowImage={setShowImage}
        setAttachment={setAttachmentId}
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
      />
      <ImageFullView
        image={image}
        show={showImage}
        setShowImage={setShowImage}
        attachment={attachmentId}
        setAttachment={setAttachmentId}
        imageIndex={imageIndex}
        setImageIndex={setImageIndex}
        post={postData}
      />
    </>
  );
}
