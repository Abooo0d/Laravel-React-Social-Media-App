import CustomTab from "@/Components/Shared/CustomTab";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import PostContainer from "@/Components/Containers/PostContainer";
import UserFriendCard from "@/Components/Shared/UserFriendCard";
import axiosClient from "@/AxiosClient/AxiosClient";
import { useMainContext } from "@/Contexts/MainContext";
import { PrimaryButton } from "@/Components/Shared/Buttons";
import { FiUserPlus } from "react-icons/fi";
import { useUserContext } from "@/Contexts/UserContext";
import ProfilePhotosFullView from "@/Components/Shared/ProfilePhotosFullView";
import ProfileImageFullView from "@/Components/Shared/ProfileImageFullView";

const View = ({ auth, user, posts, isFriend, photos }) => {
  console.log(posts);

  const [imageIndex, setImageIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const { setSuccessMessage, setErrors } = useMainContext();
  const { setUser } = useUserContext();
  const { flash } = usePage().props;
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [imageType, setImageType] = useState("cover");

  const { post } = useForm({
    type: "add",
  });

  useEffect(() => {
    if (!auth?.user) {
      window.location.href(route("login"));
    } else {
      setUser(auth.user);
    }
  }, [auth]);

  useEffect(() => {
    if (flash.success) setSuccessMessage(flash.success);
    if (flash.error) setErrors([flash.error]);
  }, [flash]);

  const addFriend = () => {
    post(route("user.addFriend", user.id), {
      onError: (error) => {
        setErrors([error?.response?.data?.message || "Some Thing Went Wrong"]);
      },
    });
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
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link rel="icon" type="image/svg+xml" href="/images.jpeg" />
      </Head>
      <div className="container mx-auto ">
        <div className="max-h-[350px] w-full relative">
          <img
            src={user.cover_url || "/images/default_cover_image.jpg"}
            alt="cover Image"
            className="h-[300px] w-full object-cover cursor-pointer"
            onClick={() => {
              setProfileImage(user.cover_url);
              setShowProfileImage(true);
              setImageType("cover");
            }}
          />
          <div className="absolute lg:w-[200px] lg:h-[200px] md:w-[160px] md:h-[160px] w-[100px] h-[100px] md:-bottom-[50px] md:left-20 left-4 -bottom-[40px] group overflow-hidden">
            <img
              src={user.avatar_url || "/images/default_avatar_image.png"}
              alt="AvatarImage"
              className=" rounded-full w-full h-full object-cover cursor-pointer"
              onClick={(e) => {
                setProfileImage(user.avatar_url);
                setShowProfileImage(true);
                setImageType("avatar");
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center bg-gray-900 py-4 lg:pl-[300px] md:pl-[250px] pl-[40px] max-md:pt-[50px] md:pr-8 pr-4">
          <div className="w-full flex flex-col justify-start items-start">
            <div className="flex gap-2 justify-center items-start max-sm:flex-col max-sm:gap-0">
              <h2 className="text-gray-300 md:text-[20px] text-[16px] mb-0">
                {user.name}
              </h2>
              <p className=" text-gray-500 md:text-[20px] text-[16px]">
                {user.email}
              </p>
            </div>
            <h2 className="text-gray-500 mb-0 md:text-[20px] text-[16px]">
              @{user.username}
            </h2>
          </div>
          {!isFriend ? (
            <PrimaryButton
              event={addFriend}
              classes="py-1.5 px-2 flex w-[200px] gap-2"
            >
              Add Friend
              <FiUserPlus />
            </PrimaryButton>
          ) : (
            <div className="text-gray-500 cursor-pointer">Friend.</div>
          )}{" "}
        </div>
        <div className="w-full h-full max-sm:pb-[55px] ">
          <Tab.Group>
            <Tab.List className="md:px-[40px] px-[20px] flex p-1 gap-5 dark:bg-gray-900 bg-gray-100 rounded-b-md border-t-solid border-t-gray-700 border-t-[1px]">
              <CustomTab text="Posts" />
              <CustomTab text="Photos" />
              <CustomTab text="Friends" />
            </Tab.List>
            <Tab.Panels className=" py-2 rounded-md">
              <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                <div className="bg-homeFeed rounded-md">
                  <PostContainer posts={posts} AllPostsData={posts?.data} />
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
                <div className="relative rounded-md p-3 mb-2 dark:bg-gray-900 bg-gray-100 duration-200 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
                  {user.friends?.map((friend, index) => (
                    <UserFriendCard user={friend} key={index} />
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <ProfileImageFullView
          show={showProfileImage}
          setShowImage={setShowProfileImage}
          image={profileImage}
          downloadUrl={route("download.userImage", {
            user: auth.user.id,
            type: imageType,
          })}
        />
      </div>
    </>
  );
};
View.layout = (page) => {
  return <Authenticated children={page}></Authenticated>;
};
export default View;
