import CustomTab from "@/Components/Shared/CustomTab";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { CiCamera } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";
import { Tab } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useForm, Head, usePage, router } from "@inertiajs/react";
import { useMainContext } from "@/Contexts/MainContext";
import { PrimaryButton } from "@/Components/Shared/Buttons";
import InviteUserForm from "@/Components/Shared/InviteUserForm";
import axiosClient from "@/AxiosClient/AxiosClient";
import UserRequestCard from "@/Components/Shared/UserRequestCard";
import UserMemberCard from "@/Components/Shared/UserMemberCard";
import GroupAboutForm from "@/Components/Shared/GroupAboutForm";
import PostContainer from "@/Components/Containers/PostContainer";
import CreatePost from "@/Components/Shared/CreatePost";
import { useUserContext } from "@/Contexts/UserContext";
const View = ({
  auth,
  group,
  requests,
  users,
  isAdmin,
  posts,
  notifications,
  groups,
  followers,
}) => {
  const isCurrentUserJoined = !!(group.status == "approved");
  const [groupData, setGroupData] = useState(group);
  const [requestsData, setRequestsData] = useState(requests);
  const [allPosts, setAllPosts] = useState(posts);
  const [coverImage, setCoverImage] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [isTheCoverChanged, setIsTheCoverChanged] = useState(false);
  const [isTheAvatarChanged, setIsTheAvatarChanged] = useState(false);
  const { setSuccessMessage, setErrors } = useMainContext();
  const { flash, errors } = usePage().props;
  const { setUser } = useUserContext();
  const { setData, post } = useForm({
    coverImage: null,
    avatarImage: null,
    group_id: groupData.id,
  });
  useEffect(() => {
    setUser(auth.user);
  }, [auth?.user]);

  useEffect(() => {
    if (flash.success) setSuccessMessage(flash.success);
    if (flash.error) setErrors([flash.error]);
  }, [flash]);

  useEffect(() => {
    let messages = [];
    Object.keys(errors).map((key) => messages.push(errors[key]));
    setErrors(messages);
  }, [errors]);

  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (!auth?.user) {
      window.location.href(route("login"));
    }
  }, [auth]);

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
    post(route("group.changeImages"), {});
    setIsTheAvatarChanged(false);
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
    post(route("group.changeImages"));
    setIsTheCoverChanged(false);
  };
  function requestJoin() {
    axiosClient
      .post(route("group.join", groupData))
      .then(({ data }) => {
        setSuccessMessage(data.message);
        setGroupData(data.group);
        router.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
        followers={followers}
      >
        <div className="container mx-auto ">
          <div className="max-h-[350px] w-full relative">
            <div className="relative max-h-[350px] w-full group">
              <img
                src={
                  coverImage ||
                  groupData.cover_url ||
                  "/images/default_cover_image.jpg"
                }
                alt="cover Image"
                className="h-[300px] max-md:h-[220px] w-full object-cover "
              />
              {isAdmin && (
                <>
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
                </>
              )}
            </div>
            <div className="absolute lg:w-[200px] lg:h-[200px] md:w-[160px] md:h-[160px] w-[130px] h-[130px] -bottom-[50px] max-md:bottom-[50px] max-md:left-[40px] md:left-20 left-0 group overflow-hidden">
              <img
                src={
                  avatarImage ||
                  groupData.thumbnail_url ||
                  "/images/default_group_avatar_image.png"
                }
                alt="AvatarImage"
                className=" rounded-full w-full h-full object-cover"
              />
              {isAdmin && (
                <>
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
                </>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between items-center gap-4 bg-gray-900 py-4 px-8">
            <h2 className="pl-[250px] max-md:pl-4 text-gray-400 text-lg max-md:text-[16px]">
              {groupData.name}
            </h2>
            <div className="flex justify-start items-center gap-4">
              {isAdmin === true && (
                <PrimaryButton
                  classes="px-6 py-3 max-md:px-3 max-md:py-2 max-md:text-[14px]"
                  event={() => {
                    setShowInviteForm(true);
                  }}
                >
                  Invite Members
                </PrimaryButton>
              )}
              {!groupData.status && !groupData.auto_approval && (
                <PrimaryButton
                  classes="px-6 py-3 max-md:px-3 max-md:py-2 max-md:text-[14px]"
                  event={requestJoin}
                >
                  Request Join
                </PrimaryButton>
              )}
              {!groupData.status && groupData.auto_approval ? (
                <PrimaryButton
                  classes="px-6 py-3 max-md:px-3 max-md:py-2 max-md:text-[14px]"
                  event={() => {
                    requestJoin();
                  }}
                >
                  Join To Group
                </PrimaryButton>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="w-full">
            <Tab.Group>
              <Tab.List className="md:px-[40px] px-[20px] flex p-1 gap-5 dark:bg-gray-900 bg-gray-100 rounded-b-md border-t-solid border-t-gray-700 border-t-[1px]">
                <CustomTab text="Posts" />
                <CustomTab text="Photos" />
                {isCurrentUserJoined && <CustomTab text="Members" />}
                {isAdmin && <CustomTab text="Requests" />}
                {isAdmin && <CustomTab text="About" />}
              </Tab.List>
              <Tab.Panels className=" rounded-md">
                <Tab.Panel className="rounded-md flex flex-col w-full">
                  <div className=" dark:bg-homeFeed rounded-md">
                    <PostContainer posts={allPosts}>
                      {group.status && (
                        <CreatePost
                          user={auth.user}
                          setPosts={setAllPosts}
                          posts={allPosts}
                          groupId={group.id}
                          classes="bg-homeFeed px-3 py-3"
                        />
                      )}{" "}
                    </PostContainer>
                  </div>
                </Tab.Panel>

                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="relative rounded-md p-3 mb-2 dark:bg-gray-800 bg-gray-100 duration-200">
                    <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                      Photos
                    </h3>
                  </div>
                </Tab.Panel>
                {isCurrentUserJoined && (
                  <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                    <div className="relative rounded-md p-3 mb-2 dark:bg-gray-900 bg-gray-100 duration-200 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
                      {users.map((user, index) => (
                        <UserMemberCard
                          member={user}
                          key={index}
                          isAdmin={isAdmin}
                          group={group}
                        />
                      ))}
                    </div>
                  </Tab.Panel>
                )}
                {isAdmin && (
                  <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                    {requestsData.length > 0 ? (
                      <div className="relative rounded-md p-3 mb-2 dark:bg-gray-900 bg-gray-100 duration-200 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
                        {requestsData.map((request, index) => (
                          <UserRequestCard
                            request={request}
                            key={index}
                            group={groupData}
                            setGroup={setGroupData}
                            requestsData={requestsData}
                            setRequestsData={setRequestsData}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="relative rounded-md p-3 bg-gray-900 duration-200 w-full text-center text-gray-400 cursor-default">
                        There Is No Requests
                      </div>
                    )}
                  </Tab.Panel>
                )}
                {isAdmin && (
                  <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                    <GroupAboutForm group={group} />
                  </Tab.Panel>
                )}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        <InviteUserForm
          showForm={showInviteForm}
          setShowForm={setShowInviteForm}
          group={group}
        />
      </Authenticated>
    </>
  );
};

export default View;
