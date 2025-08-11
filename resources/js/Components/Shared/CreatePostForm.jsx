import React, { useEffect, useRef, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import ImageFullView from "./ImageFullView";
import PostPreview from "./PostPreview";
import CreatePostPostAttachments from "./CreatePostPostAttachments";
import { SecondaryButton, PrimaryButton } from "./Buttons";
import { SiOpenai } from "react-icons/si";
import { BsStars } from "react-icons/bs";

import PopupCard from "./PopupCard";
import { useUserContext } from "@/Contexts/UserContext";
import axiosClient from "@/AxiosClient/AxiosClient";
import Spinner from "./Spinner";
import { useMainContext } from "@/Contexts/MainContext";
import { formatDate } from "date-fns";
const CreatePostForm = ({ showForm, setShowForm, groupId = "", refetch }) => {
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const [showPost, setShowPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState();
  const [attachmentsErrors, setAttachmentsErrors] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const { user } = useUserContext();
  const [chosenFiles, setChosenFiles] = useState([]);
  const { setErrors, setSuccessMessage } = useMainContext();
  const inputRef = useRef();
  const [post, setPost] = useState({
    body: "",
    attachments: [],
    user_id: user.id,
    group_id: groupId || "",
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
  const handelSubmit = () => {
    try {
      if (post.body !== "" || post.attachments.length !== 0) {
        const formData = new FormData();
        formData.append("body", post.body);
        formData.append("user_id", post.user_id);
        formData.append("group_id", post.group_id);
        const finalFiles = chosenFiles.map((file) => {
          return file.file;
        });
        finalFiles.forEach((file) => {
          formData.append("attachments[]", file);
        });
        axiosClient
          .post(route("post.create"), formData)
          .then((data) => {
            setShowForm(false);
            refetch();
            setSuccessMessage(data?.data?.success);
          })
          .catch((err) => {
            setErrors([
              err?.response?.data?.message || "Some Thing Went Wrong",
            ]);
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
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandelTheFiles = async (e) => {
    let files = e.target.files;
    const updatedFiles = [...files].map((file) => {
      return { file: file, url: URL.createObjectURL(file) };
    });
    setChosenFiles((prev) => [...prev, ...updatedFiles]);
  };

  const onDelete = (attachment, index, update) => {
    try {
      if (attachment.file) {
        setChosenFiles((prev) =>
          prev.filter((file) => file.file !== attachment.file)
        );
        setAttachmentsErrors((prevErrors) =>
          prevErrors.filter((f) => f.index != index)
        );
      } else {
        setChosenFiles((prev) =>
          prev.map((file) => ({
            ...file,
            isDeleted:
              file == attachment || file.isDeleted == true ? true : false,
          }))
        );
        setAttachmentsErrors((prevErrors) =>
          prevErrors.filter((f) => f.index != index)
        );
      }
    } catch (error) {
      setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
    }
  };

  const aiPost = () => {
    if (post.body == "") return;
    setLoadingAi(true);
    try {
      axiosClient
        .post(route("post.aiPost"), {
          message: post.body,
        })
        .then(({ data }) => {
          setPost({ ...post, body: data.message });
          setLoadingAi(false);
        })
        .catch((error) => {
          setErrors([
            error?.response?.data?.message || "Some Thing Went Wrong",
          ]);
          setLoadingAi(false);
        });
    } catch (error) {
      setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    setPost({ body: "", attachments: [], user_id: user.id, group_id: groupId });
    setChosenFiles([]);
    setAttachmentsErrors([]);
    handleInput();
  }, [showForm]);

  useEffect(() => {
    handleInput();
  }, [post]);

  useEffect(() => {
    setPost((prevPost) => {
      return {
        ...prevPost,
        attachments: chosenFiles,
      };
    });
  }, [chosenFiles]);
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
        <div className="max-h-[400px] h-fit overflow-auto">
          <div className="relative">
            <PrimaryButton
              classes="absolute top-[10px] right-[10px] z-[100] flex justify-center items-center w-[35px] h-[35px] text-gray-400"
              event={aiPost}
            >
              {loadingAi ? (
                <Spinner size="small " />
              ) : (
                <BsStars className=" w-[20px] h-[20px]" />
              )}
            </PrimaryButton>
            <textarea
              className="bg-gray-800 flex-1 w-full rounded-md outline-none border-none focus:outline-none focus:border-none ring-0 focus:ring-0 text-gray-300 resize-none h-auto min-h-[40px] max-h-[150px] "
              ref={inputRef}
              name="message"
              value={post.body}
              placeholder="What On You Mind"
              onChange={(e) => {
                setPost((prev) => ({ ...prev, body: e.target.value }));
              }}
            ></textarea>
          </div>
          <CreatePostPostAttachments
            post={post}
            attachmentsErrors={attachmentsErrors}
            onDelete={onDelete}
            setImage={setImage}
            setShowImage={setShowImage}
            setShowPost={setShowPost}
            setImageIndex={setImageIndex}
          />
        </div>
        <div className="mt-4 gap-2 flex justify-end items-center">
          <SecondaryButton classes="relative py-1.5 px-3" enabled={true}>
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
            enabled={true}
          >
            Submit
          </PrimaryButton>
        </div>
      </PopupCard>
      <PostPreview
        show={showPost}
        user={user}
        post={post}
        // update={false}
        attachmentsErrors={attachmentsErrors}
        onDelete={onDelete}
        // undoDelete={undoDelete}
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
