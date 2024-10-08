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
import { useUserContext } from "@/Contexts/UserContext";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const View = ({ auth, user }) => {
  const { setUser } = useUserContext();
  useEffect(() => {
    setUser(user);
  }, []);
  console.log(user);

  const { data, setData, post, progress } = useForm({
    coverImage: null,
    avatarImage: null,
  });
  const { errors } = usePage().props;
  let errorsArray = [];
  Object.keys(errors).map((key) => errorsArray.push(errors[key]));
  const { setSuccessMessage } = useMainContext();
  const [coverImage, setCoverImage] = useState("");
  const [avatarImage, setAvatarImage] = useState("");

  const [isTheCoverChanged, setIsTheCoverChanged] = useState(false);
  const [isTheAvatarChanged, setIsTheAvatarChanged] = useState(false);

  const handelAvatarChange = (e) => {
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
  };
  const resetAvatarImage = () => {
    setAvatarImage("");
    setData({
      avatarImage: null,
    });
    setIsTheCoverChanged(false);
  };
  const submitAvatarImage = () => {
    post(route("profile.changeImages"), {
      onStart: () => {
        errorsArray = [];
      },
      onSuccess: () => {
        console.log("Abood from Update Avatar Image");
        setSuccessMessage("Image Updated Successfully");
      },
    });
    setIsTheAvatarChanged(false);
  };
  const handelCoverChange = (e) => {
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
  };
  const resetCoverImage = () => {
    setCoverImage("");
    setData({
      coverImage: null,
    });
    setIsTheCoverChanged(false);
  };
  const submitCoverImage = () => {
    post(route("profile.changeImages"), {
      onStart: () => {
        errorsArray = [];
      },
      onFinish: () => {},
      onSuccess: () => {
        console.log("Abood From OnSuccess Int Profile Page");
        setSuccessMessage("Image Updated Successfully");
        console.log("Abood");
      },
    });
    setIsTheCoverChanged(false);
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
      <Authenticated user={auth.user}>
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
          <div className="w-full">
            <Tab.Group>
              <Tab.List className="lg:pl-[300px] md:pl-[250px] pl-[130px] flex p-1 gap-5 dark:bg-gray-800 bg-gray-100 rounded-b-md">
                <CustomTab text="About" />
                <CustomTab text="Posts" />
                <CustomTab text="Followers" />
                <CustomTab text="Friends" />
                <CustomTab text="Photos" />
              </Tab.List>
              <Tab.Panels className=" py-2 rounded-md mt-2">
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <Edit />
                </Tab.Panel>
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-800 bg-gray-100 duration-200">
                    <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                      Posts Content
                    </h3>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-800 bg-gray-100 duration-200">
                    <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                      Followers
                    </h3>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-800 bg-gray-100 duration-200">
                    <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                      Friends
                    </h3>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="relative rounded-md p-3 mb-2 dark:hover:bg-gray-700 hover:bg-gray-200 dark:bg-gray-800 bg-gray-100 duration-200">
                    <h3 className="text-sm font-medium leading-5 text-gray-800 dark:text-gray-300">
                      Photos
                    </h3>
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
