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
import ProfileImageFullView from "@/Components/Shared/ProfileImageFullView";

const View = ({
  auth,
  user,
  posts,
  groups,
  notifications,
  isFriend,
  photos,
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const { setSuccessMessage, setErrors } = useMainContext();
  const { setUser } = useUserContext();
  const { flash, errors } = usePage().props;
  const { data, post } = useForm({
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
    post(route("user.addFriend", user.id));
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
        followers={auth.user.friends}
      >
        <div className="container mx-auto ">
          <div className="max-h-[350px] w-full relative">
            <img
              src={user.cover_url || "/images/default_cover_image.jpg"}
              alt="cover Image"
              className="h-[300px] w-full object-cover "
            />
            <div className="absolute lg:w-[200px] lg:h-[200px] md:w-[160px] md:h-[160px] w-[130px] h-[130px] -bottom-[50px] md:left-20 left-0 group overflow-hidden">
              <img
                src={user.avatar_url || "/images/default_avatar_image.png"}
                alt="AvatarImage"
                className=" rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-900 py-4 pl-[250px] pr-8">
            {" "}
            <div className="w-full flex flex-col justify-start items-start gap-1">
              <div className="flex gap-2 justify-center items-center">
                <h2 className="text-gray-300 text-lg mb-0">{user.name}</h2>
                <p className=" text-gray-500">{user.email}</p>
              </div>
              <h2 className="text-gray-500 text-lg mb-0">@{user.username}</h2>
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
            )}
          </div>
          <div className="w-full">
            <Tab.Group>
              <Tab.List className="md:px-[40px] px-[20px] mb-4 flex p-1 gap-5 dark:bg-gray-900 bg-gray-100 rounded-b-md border-t-solid border-t-gray-700 border-t-[1px]">
                <CustomTab text="Posts" />
                <CustomTab text="Photos" />
                <CustomTab text="Friends" />
              </Tab.List>
              <Tab.Panels className=" py-2 rounded-md mt-2">
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="bg-homeFeed rounded-md">
                    <PostContainer posts={posts} />
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
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
                    <ProfileImageFullView
                      photos={photos}
                      setShowImage={setShowImage}
                      showImage={showImage}
                      setImageIndex={setImageIndex}
                      imageIndex={imageIndex}
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="relative rounded-md p-3 mb-2 dark:bg-gray-900 bg-gray-100 duration-200 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
                    {user.friends?.map((friend, index) => (
                      <UserFriendCard user={friend} key={index} />
                    ))}
                  </div>
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
