import CustomTab from "@/Components/Shared/CustomTab";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { CiCamera } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";
import { Tab } from "@headlessui/react";
import { Head, router, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";
import PostContainer from "@/Components/Containers/PostContainer";
import CreatePost from "@/Components/Shared/CreatePost";
import UserFriendCard from "@/Components/Shared/UserFriendCard";
import UserFriendRequestCard from "@/Components/Shared/UserFriendRequestCard";
import ProfilePhotosFullView from "@/Components/Shared/ProfilePhotosFullView";
import { useUserContext } from "@/Contexts/UserContext";
import React, { useEffect, useState } from "react";
import Edit from "./Edit";
import { useGetPostsForUser } from "@/TanStackQurey/Querys";
import ProfileImageFullView from "@/Components/Shared/ProfileImageFullView";
const View = ({ auth, mustVerifyEmail, status, photos }) => {
  const { setUser, user } = useUserContext(auth?.user);
  const { flash, errors } = usePage().props;
  const { setErrors, setSuccessMessage } = useMainContext();
  const { setData, post } = useForm({
    coverImage: null,
    avatarImage: null,
  });
  const [allPosts, setAllPosts] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [isTheCoverChanged, setIsTheCoverChanged] = useState(false);
  const [isTheAvatarChanged, setIsTheAvatarChanged] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const {
    data: posts,
    refetch,
    isLoading: loadingPosts,
  } = useGetPostsForUser(auth.user.id);
  useEffect(() => {
    let messages = [];
    Object.keys(errors).map((key) => messages.push(errors[key]));
    setErrors(messages);
  }, [errors]);
  useEffect(() => {
    if (flash?.success) setSuccessMessage(flash.success);
    if (flash?.error) setErrors([flash.error]);
  }, [flash]);
  useEffect(() => {
    if (!auth?.user) {
      router.get(route("login"));
    } else {
      setUser(auth?.user);
    }
  }, [auth]);

  useEffect(() => {
    setAllPosts(posts?.posts);
  }, [posts]);

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
    setIsTheAvatarChanged(false);
    setData({
      avatarImage: null,
    });
  };
  const submitAvatarImage = () => {
    try {
      post(route("profile.changeImages"), {
        onSuccess: () => {
          refetch();
        },
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
        onSuccess: () => {
          refetch();
        },
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
              className="h-[300px] w-full object-cover cursor-pointer"
              onClick={() => {
                setProfileImage(user.cover_url);
                setShowProfileImage(true);
              }}
            />
            {!isTheCoverChanged ? (
              <button className="group-hover:opacity-100 opacity-0 rounded-md absolute top-2 right-2 py-1 px-4 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex gap-2 justify-center items-center">
                <CiCamera className="text-gray-800 w-[20px] h-[20px]" />
                Change Cover Image
                <input
                  type="file"
                  name="cover_image"
                  className="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    handelCoverChange(e);
                  }}
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
          <div className="absolute lg:w-[200px] lg:h-[200px] md:w-[160px] md:h-[160px] w-[130px] h-[130px] md:-bottom-[50px] md:left-20 left-4 -bottom-[80px] group">
            <img
              src={
                avatarImage ||
                user.avatar_url ||
                "/images/default_avatar_image.png"
              }
              alt="AvatarImage"
              className=" rounded-full w-full h-full object-cover cursor-pointer"
              onClick={(e) => {
                setProfileImage(user.avatar_url);
                setShowProfileImage(true);
              }}
            />
            <div className="absolute rounded-full bg-black/50 backdrop-blur-[3px] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-300 group-hover:opacity-100 opacity-0 flex justify-center items-center">
              {!isTheAvatarChanged ? (
                <button className="cursor-pointer z-10 overflow-hidden rounded-md relative py-2 px-2 bg-gray-50/80 hover:bg-gray-50 duration-300 text-gray-800 flex gap-2 justify-center items-center">
                  <CiCamera className="text-gray-800 w-[30px] h-[30px] cursor-pointer" />
                  <input
                    type="file"
                    name="cover_image"
                    className="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      e.preventDefault();
                      setShowProfileImage(false);
                    }}
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
        <div className="w-full flex flex-col justify-start items-start gap-1 sm:gap-0 bg-gray-900 py-4 lg:pl-[300px] md:pl-[250px] pl-[160px]">
          <div className="flex gap-2 justify-center items-start max-sm:flex-col max-sm:gap-0">
            <h2 className="text-gray-300 sm:text-lg text-[16px] mb-0">
              {user.name}
            </h2>
            <p className=" text-gray-500 sm:text-lg text-[16px]">
              {user.email}
            </p>
          </div>
          <h2 className="text-gray-500 mb-0 sm:text-lg text-[16px]">
            @{user.username}
          </h2>
        </div>
        <div className="w-full h-full max-sm:pb-[55px] ">
          <Tab.Group>
            <Tab.List className="md:px-[40px] px-[20px] flex p-1 gap-5 dark:bg-gray-900 bg-gray-100 rounded-b-md border-t-solid border-t-gray-700 border-t-[1px]">
              <CustomTab text="Posts" />
              <CustomTab text="Photos" />
              <CustomTab text="Friends" />
              <CustomTab text="requests" />
              <CustomTab text="About" />
            </Tab.List>
            <Tab.Panels className="rounded-md">
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                <div className=" dark:bg-homeFeed rounded-md">
                  <PostContainer posts={allPosts} refetch={refetch}>
                    <CreatePost
                      user={user}
                      setPosts={setAllPosts}
                      posts={allPosts}
                      classes="px-3 py-3 bg-homeFeed "
                      refetch={refetch}
                    />
                  </PostContainer>
                </div>
              </Tab.Panel>
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full mt-4">
                <div className="relative rounded-md mb-2 bg-gray-900 duration-200 flex flex-row gap-4 flex-wrap p-4">
                  {photos.length > 0 ? (
                    photos.map((photo, index) => (
                      <img
                        src={photo.url}
                        key={index}
                        alt=""
                        className="object-cover flex-1 min-w-[250px] max-h-[150px] rounded-md cursor-pointer border-gray-700/20 border-[1px] border-solid hover:border-gray-700 duration-200"
                        onClick={() => {
                          setImageIndex(index);
                          setShowImage(true);
                        }}
                      />
                    ))
                  ) : (
                    <div className="relative rounded-md p-3 bg-gray-900 duration-200 w-full text-center text-gray-400 cursor-default">
                      There Is No Photos
                    </div>
                  )}
                  <ProfilePhotosFullView
                    photos={photos}
                    setShowImage={setShowImage}
                    showImage={showImage}
                    setImageIndex={setImageIndex}
                    imageIndex={imageIndex}
                  />
                </div>
              </Tab.Panel>
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full mt-4">
                {auth.user.friends.length > 0 ? (
                  <div className="relative rounded-md p-3 mb-2 dark:bg-gray-900 bg-gray-100 duration-200 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
                    {auth.user.friends?.map((friend, index) => (
                      <UserFriendCard user={friend} key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="w-full text-center text-gray-500 py-8 dark:bg-gray-900 rounded-md">
                    You Don`t Have Any Friends Yet.
                  </div>
                )}
              </Tab.Panel>
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full mt-4">
                {auth.user?.pending_requests.length > 0 ? (
                  <div className="relative rounded-md p-3 mb-2 dark:bg-gray-900 bg-gray-100 duration-200 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
                    {auth.user.pending_requests?.map((request, index) => (
                      <UserFriendRequestCard request={request} key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="w-full text-center text-gray-500 py-8 dark:bg-gray-900 rounded-md">
                    There Is No Pending Requests
                  </div>
                )}
              </Tab.Panel>
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full mt-4">
                <Edit mustVerifyEmail={mustVerifyEmail} status={status} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <ProfileImageFullView
          show={showProfileImage}
          setShowImage={setShowProfileImage}
          image={profileImage}
        />
      </div>
    </>
  );
};
View.layout = (page) => {
  return <Authenticated children={page}></Authenticated>;
};
export default View;
