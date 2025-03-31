import CustomTab from "@/Components/Shared/CustomTab";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { CiCamera } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";
import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import Edit from "./Edit";
import { Head, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";
import PostContainer from "@/Components/Containers/PostContainer";
import CreatePost from "@/Components/Shared/CreatePost";

const View = ({
  auth,
  user,
  posts,
  mustVerifyEmail,
  status,
  groups,
  notifications,
}) => {
  const { flash, errors } = usePage().props;
  const { setErrors, setSuccessMessage } = useMainContext();
  const { setData, post } = useForm({
    coverImage: null,
    avatarImage: null,
  });
  const [allPosts, setAllPosts] = useState(posts);
  const [coverImage, setCoverImage] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [isTheCoverChanged, setIsTheCoverChanged] = useState(false);
  const [isTheAvatarChanged, setIsTheAvatarChanged] = useState(false);
  useEffect(() => {
    let messages = [];
    Object.keys(errors).map((key) => messages.push(errors[key]));
    setErrors(messages);
  }, [errors]);
  useEffect(() => {
    if (flash?.success) setSuccessMessage(flash.success);
    if (flash?.error) setErrors([flash.error]);
  }, [flash]);
  const handelAvatarChange = (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        setData("avatarImage", e.target.files[0]);
        setIsTheAvatarChanged(true);
        const reader = new FileReader();
        reader.onload = () => {
          setAvatarImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetAvatarImage = () => {
    setAvatarImage("");
    setData({
      avatarImage: null,
    });
    setIsTheCoverChanged(false);
  };
  const submitAvatarImage = () => {
    try {
      post(route("profile.changeImages"), {
        preserveScroll: true,
      });
      setIsTheAvatarChanged(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handelCoverChange = (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        setData("coverImage", e.target.files[0]);
        setIsTheCoverChanged(true);
        const reader = new FileReader();
        reader.onload = () => {
          setCoverImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetCoverImage = () => {
    setCoverImage("");
    setData({
      coverImage: null,
    });
    setIsTheCoverChanged(false);
  };
  const submitCoverImage = () => {
    try {
      post(route("profile.changeImages"), {
        preserveScroll: true,
      });
      setIsTheCoverChanged(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Social media Laravel + React</title>
        <meta
          head-key="description"
          name="description"
          content="This is the default description"
        />
        <link rel="icon" type="image/svg+xml" href="/images.jpeg" />
      </Head>
      <Authenticated
        currentUser={auth.user}
        groups={groups}
        notifications={notifications}
      >
        <div className="container mx-auto ">
          <div className="max-h-[350px] w-full relative">
            <div className="relative max-h-[350px] w-full group">
              <img
                src={
                  coverImage ||
                  user.cover_url ||
                  "/images/default_cover_image.jpg"
                }
                alt="cover Image"
                className="h-[300px] w-full object-cover "
              />
              {!isTheCoverChanged ? (
                <button className="group-hover:opacity-100 opacity-0 rounded-md absolute top-2 right-2 py-1 px-4 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex gap-2 justify-center items-center">
                  <CiCamera className="text-gray-800 w-[20px] h-[20px]" />
                  Change Cover Image
                  <input
                    type="file"
                    name="cover_image"
                    className="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer"
                    onChange={(e) => handelCoverChange(e)}
                  />
                </button>
              ) : (
                <div className="absolute top-2 right-2  flex justify-center items-center gap-2 group-hover:opacity-100 opacity-0 duration-300">
                  <button
                    onClick={resetCoverImage}
                    className="rounded-md py-1 px-4 bg-gray-800/80 hover:bg-gray-800 duration-300 text-gray-200 flex gap-2 justify-center items-center"
                  >
                    <HiMiniXMark />
                    Cancel
                  </button>
                  <button
                    onClick={submitCoverImage}
                    className="rounded-md py-1 px-4 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex gap-2 justify-center items-center"
                  >
                    <FaCheck />
                    Submit
                  </button>
                </div>
              )}
            </div>
            <div className="absolute lg:w-[200px] lg:h-[200px] md:w-[160px] md:h-[160px] w-[130px] h-[130px] -bottom-[50px] md:left-20 left-0 group overflow-hidden">
              <img
                src={
                  avatarImage ||
                  user.avatar_url ||
                  "/images/default_avatar_image.png"
                }
                alt="AvatarImage"
                className=" rounded-full w-full h-full "
              />
              <div className="absolute rounded-full bg-black/50 backdrop-blur-[3px] top-0 left-0 right-0 bottom-0 duration-300 group-hover:opacity-100 opacity-0 flex justify-center items-center">
                {!isTheAvatarChanged ? (
                  <button className="cursor-pointer z-10 overflow-hidden rounded-md relative py-2 px-2 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex gap-2 justify-center items-center">
                    <CiCamera className="text-gray-800 w-[30px] h-[30px]" />
                    <input
                      type="file"
                      name="cover_image"
                      className="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer"
                      onChange={(e) => handelAvatarChange(e)}
                    />
                  </button>
                ) : (
                  <div className="  flex justify-center items-center gap-2 group-hover:opacity-100 opacity-0 duration-300">
                    <button
                      onClick={resetAvatarImage}
                      className="cursor-pointer z-10 overflow-hidden rounded-md relative py-2 px-2 bg-gray-800/80 hover:bg-gray-800 text-gray-200 duration-300  flex gap-2 justify-center items-center"
                    >
                      <HiMiniXMark />
                    </button>
                    <button
                      onClick={submitAvatarImage}
                      className="cursor-pointer z-10 overflow-hidden rounded-md relative py-2 px-2 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex gap-2 justify-center items-center"
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center gap-4 bg-gray-900 py-4 px-8">
            <h2 className="pl-[250px] max-md:pl-4 text-gray-400 text-lg max-md:text-[16px]">
              {user.name}
            </h2>
          </div>
          <div className="w-full">
            <Tab.Group>
              <Tab.List className="md:px-[40px] px-[20px] flex p-1 gap-5 dark:bg-gray-900 bg-gray-100 rounded-b-md border-t-solid border-t-gray-700 border-t-[1px]">
                <CustomTab text="Posts" />
                <CustomTab text="Followers" />
                <CustomTab text="Friends" />
                <CustomTab text="Photos" />
                <CustomTab text="About" />
              </Tab.List>
              <Tab.Panels className="rounded-md">
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className=" dark:bg-homeFeed rounded-md">
                    <PostContainer posts={posts}>
                      <CreatePost
                        user={user}
                        setPosts={setAllPosts}
                        posts={allPosts}
                        classes="px-3 py-3 bg-homeFeed "
                      />
                    </PostContainer>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-900 bg-gray-100 duration-200">
                    <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                      Followers
                    </h3>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-900 bg-gray-100 duration-200">
                    <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                      Friends
                    </h3>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-900 bg-gray-100 duration-200">
                    <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                      Photos
                    </h3>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <Edit mustVerifyEmail={mustVerifyEmail} status={status} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </Authenticated>
    </>
  );
};

export default View;
