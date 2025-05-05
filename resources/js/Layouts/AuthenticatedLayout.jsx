import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router, usePage } from "@inertiajs/react";
import NotificationsBar from "@/Components/Containers/NotificationsBar";
import { IoMenu, IoReloadOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import MenuButton from "@/Components/Shared/MenuButton";
import { IoMdNotifications } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import FollowersBar from "@/Components/Containers/FollowersBar";
import GroupsBar from "@/Components/Containers/GroupsBar";
import { PiChatsCircle } from "react-icons/pi";
import { useMainContext } from "@/Contexts/MainContext";
import { useGetGroups, useGetNotifications } from "@/TanStackQurey/Querys";
export default function Authenticated({ children }) {
  const { auth } = usePage().props;
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const [showFollowerContainer, setShowFollowerContainer] = useState(false);
  const [showNotificationsForm, setShowNotificationsForm] = useState(false);
  const [showGroupContainer, setShowGroupContainer] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(auth?.user);
  const [followers, setFollowers] = useState(auth?.user.friends);
  const {
    data: notifications,
    isLoading: LoadingNotifications,
    refetch: refetchNotifications,
  } = useGetNotifications();
  const { data: groups, isLoading: loadingGroups } = useGetGroups();
  const hideAll = () => {
    setShowFollowerContainer(false);
    setShowGroupContainer(false);
    setShowNotificationsForm(false);
  };
  useEffect(() => {
    if (showFollowerContainer) {
      setShowGroupContainer(false);
      setShowNotificationsForm(false);
    }
  }, [showFollowerContainer]);
  useEffect(() => {
    if (showGroupContainer) {
      setShowNotificationsForm(false);
      setShowFollowerContainer(false);
    }
  }, [showGroupContainer]);
  useEffect(() => {
    if (showNotificationsForm) {
      setShowFollowerContainer(false);
      setShowGroupContainer(false);
    }
  }, [showNotificationsForm]);
  useEffect(() => {
    if (!LoadingNotifications) {
      if (notifications?.notifications?.length > 0) {
        let count = 0;
        notifications?.notifications?.map((notification) => {
          if (!!notification.read_at) return;
          count++;
        });
        setNotificationsCount(count);
      }
    }
  }, [notifications, LoadingNotifications]);

  return (
    <div className="min-h-screen bg-gray-300/80 dark:bg-homeFeed">
      <nav className="relative bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link
                  href="/"
                  onClick={() => {
                    hideAll();
                  }}
                >
                  <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                </Link>
              </div>
            </div>
            <div className="flex justify-end items-center flex-1">
              <div className="flex justify-center items-center md:justify-end gap-2 flex-1">
                <MenuButton
                  event={() => {
                    setShowFollowerContainer(!showFollowerContainer);
                  }}
                  show={showFollowerContainer}
                >
                  <FaUserGroup className="text-gray-400 text-lg w-[20px] h-[20px] relative" />
                </MenuButton>
                <MenuButton
                  classes="relative"
                  event={() => {
                    setShowNotificationsForm(!showNotificationsForm);
                  }}
                  show={showNotificationsForm}
                >
                  {notificationsCount > 0 && (
                    <span className="w-4 h-4 bg-red-500/40 border-[1px] border-solid border-red-500 backdrop-blur-sm absolute top-[-5px] right-0 text-[12px] flex justify-center items-center rounded-md text-gray-300  p-0">
                      {notificationsCount}
                    </span>
                  )}
                  <IoMdNotifications className="text-gray-400 text-lg w-[20px] h-[20px]" />
                </MenuButton>
                <MenuButton
                  event={() => {
                    setShowGroupContainer(!showGroupContainer);
                  }}
                  show={showGroupContainer}
                >
                  <MdGroups2 className="text-gray-400 text-lg w-[20px] h-[20px]" />
                </MenuButton>
                <MenuButton
                  event={() => {
                    router.get(route("chats"));
                  }}
                  show={false}
                >
                  <PiChatsCircle className="text-gray-400 text-lg w-[20px] h-[20px]" />
                </MenuButton>
                <button
                  onClick={() => {
                    router.reload();
                  }}
                  className="text-gray-400"
                >
                  <IoReloadOutline />
                </button>
              </div>
              <div className="hidden sm:flex sm:items-center">
                <div className="relative">
                  {currentUser ? (
                    <Dropdown>
                      <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                          >
                            {currentUser?.name}
                            <svg
                              className="ms-2 -me-0.5 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      </Dropdown.Trigger>
                      <Dropdown.Content>
                        <Dropdown.Link href={route("profile.myProfile")}>
                          Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                          href={route("logout")}
                          method="post"
                          as="button"
                        >
                          Log Out
                        </Dropdown.Link>
                      </Dropdown.Content>
                    </Dropdown>
                  ) : (
                    <Link
                      href={route("login")}
                      className="px-4 py-2  flex justify-center items-center bg-gray-800/70 hover:bg-gray-800 text-gray-200 font-thin duration-200 border-[1px] border-solid border-gray-700 rounded-md "
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
              <div className="-me-2 flex items-center sm:hidden">
                <button
                  onClick={() =>
                    setShowingNavigationDropdown(
                      (previousState) => !previousState
                    )
                  }
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                >
                  <IoMenu className="w-[25px] h-[25px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute top-[100%] left-[0px] bg-gray-900/80 w-full backdrop-blur-md duration-200 border-b-[1px] border-solid border-gray-700 ${
            showingNavigationDropdown
              ? " opacity-100 visible z-[200] "
              : " opacity-0 invisible z-[0]"
          }`}
        >
          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                {currentUser?.name}
              </div>
              <div className="font-medium text-sm text-gray-500">
                {currentUser?.email}
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route("profile.myProfile")}>
                Profile
              </ResponsiveNavLink>
              <ResponsiveNavLink
                method="post"
                href={route("logout")}
                as="button"
              >
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>
      {followers && (
        <FollowersBar
          followers={followers}
          showFollowerContainer={showFollowerContainer}
          setShowFollowerContainer={setShowFollowerContainer}
        />
      )}
      {notifications && (
        <NotificationsBar
          notifications={notifications.notifications}
          showNotificationsForm={showNotificationsForm}
          setShowNotificationsForm={setShowNotificationsForm}
          isLoading={LoadingNotifications}
          refetch={refetchNotifications}
        />
      )}
      {groups && (
        <GroupsBar
          groups={groups.groups}
          showGroupContainer={showGroupContainer}
          setShowGroupContainer={setShowGroupContainer}
          isLoading={loadingGroups}
        />
      )}

      <main>{children}</main>
    </div>
  );
}
