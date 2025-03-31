import CustomTab from "@/Components/Shared/CustomTab";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Tab } from "@headlessui/react";
import React from "react";
import { Head } from "@inertiajs/react";
import PostContainer from "@/Components/Containers/PostContainer";

const View = ({ auth, user, posts, groups, notifications }) => {
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
            <img
              src={user.cover_url || "/images/default_cover_image.jpg"}
              alt="cover Image"
              className="h-[300px] w-full object-cover "
            />
            <div className="absolute lg:w-[200px] lg:h-[200px] md:w-[160px] md:h-[160px] w-[130px] h-[130px] -bottom-[50px] md:left-20 left-0 group overflow-hidden">
              <img
                src={user.avatar_url || "/images/default_avatar_image.png"}
                alt="AvatarImage"
                className=" rounded-full w-full h-full "
              />
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
              </Tab.List>
              <Tab.Panels className=" py-2 rounded-md mt-2">
                <Tab.Panel className="rounded-md flex flex-col gap-1 w-full">
                  <div className="bg-homeFeed rounded-md">
                    <PostContainer posts={posts} />
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
