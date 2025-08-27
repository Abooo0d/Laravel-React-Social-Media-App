import { useEffect, useState } from "react";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router, usePage } from "@inertiajs/react";
import NotificationsBar from "@/Components/Containers/NotificationsBar";
import { IoMenu, IoReloadOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import MenuButton from "@/Components/Shared/MenuButton";
import { IoMdNotifications } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import FollowersBar from "@/Components/Containers/FollowersBar";
import GroupsBar from "@/Components/Containers/GroupsBar";
import { PiChatsCircle } from "react-icons/pi";
import { useGetNotifications } from "@/TanStackQurey/Querys";
import { MdLogout, MdLogin } from "react-icons/md";
import SideBarButton from "@/Components/Shared/SideBarButton";
import { IoHome } from "react-icons/io5";
import { useUserContext } from "@/Contexts/UserContext";
import AuthMenu from "@/Components/Shared/AuthMenu";
export default function Authenticated({ children }) {
  const { auth } = usePage().props;
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const r = useState();
  const { groups, isLoadingGroups } = useUserContext();
  const [showFollowerContainer, setShowFollowerContainer] = useState(false);
  const [showNotificationsForm, setShowNotificationsForm] = useState(false);
  const [showGroupContainer, setShowGroupContainer] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(auth?.user);
  const [followers, setFollowers] = useState(auth?.user?.friends);
  const {
    data: notifications,
    isLoading: LoadingNotifications,
    refetch: refetchNotifications,
  } = useGetNotifications();

  const hideAll = () => {
    setShowFollowerContainer(false);
    setShowGroupContainer(false);
    setShowNotificationsForm(false);
    setShowAuthMenu(false);
    setShowingNavigationDropdown(false);
  };
  useEffect(() => {
    if (showFollowerContainer) {
      setShowOverlay(true);
      setShowGroupContainer(false);
      setShowNotificationsForm(false);
    }
  }, [showFollowerContainer]);
  useEffect(() => {
    if (showGroupContainer) {
      setShowOverlay(true);
      setShowNotificationsForm(false);
      setShowFollowerContainer(false);
    }
  }, [showGroupContainer]);
  useEffect(() => {
    if (showNotificationsForm) {
      setShowOverlay(true);
      setShowFollowerContainer(false);
      setShowGroupContainer(false);
    }
  }, [showNotificationsForm]);
  useEffect(() => {
    setShowOverlay(
      showNotificationsForm ||
        showGroupContainer ||
        showFollowerContainer ||
        showAuthMenu ||
        showingNavigationDropdown
    );
  }, [
    showNotificationsForm,
    showGroupContainer,
    showFollowerContainer,
    showAuthMenu,
    showingNavigationDropdown,
  ]);

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
          <div className="flex justify-between h-16 max-w-[100vw]">
            <div className="flex justify-center items-center">
              <div className="shrink-0 flex ite ms-center">
                <Link
                  href="/"
                  onClick={() => {
                    hideAll();
                  }}
                >
                  <img
                    src="/Logo.png"
                    className="block h-9 w-auto fill-current"
                  />
                  {/* <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" /> */}
                </Link>
              </div>
            </div>
            <div className="flex justify-end items-center flex-1">
              <div className="flex justify-center items-center gap-2 flex-1 md:hidden">
                <MenuButton
                  event={() => {
                    setShowFollowerContainer(!showFollowerContainer);
                  }}
                  show={showFollowerContainer}
                  classes={"flex justify-center items-center"}
                >
                  <FaUserGroup className="text-gray-400 text-lg w-[20px] h-[20px] relative" />
                </MenuButton>
                <MenuButton
                  classes="relative flex justify-center items-center"
                  event={() => {
                    setShowNotificationsForm(!showNotificationsForm);
                  }}
                  show={showNotificationsForm}
                >
                  {notificationsCount > 0 && (
                    <span className="w-4 h-4 bg-red-500/40 border-[1px] border-solid border-red-500 backdrop-blur-sm absolute top-[-5px] right-0 text-[12px] flex justify-center items-center rounded-md dark:text-gray-300 text-gray-700 p-0">
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
                  classes={"flex justify-center items-center"}
                >
                  <MdGroups2 className="text-gray-400 text-lg w-[20px] h-[20px]" />
                </MenuButton>
                <MenuButton
                  event={() => {
                    hideAll();
                    router.get(route("chats"));
                  }}
                  show={false}
                  classes={"flex justify-center items-center"}
                >
                  <PiChatsCircle className="text-gray-400 text-lg w-[20px] h-[20px]" />
                </MenuButton>
                <MenuButton
                  event={() => {
                    hideAll();
                    router.get(route("aiChats"));
                  }}
                  show={false}
                  classes={"flex justify-center items-center"}
                >
                  <BsStars className="text-gray-400 text-lg w-[20px] h-[20px]" />
                </MenuButton>
                <button
                  onClick={() => {
                    hideAll();
                    router.reload();
                  }}
                  className="text-gray-400 flex justify-center items-center"
                >
                  <IoReloadOutline />
                </button>
              </div>
              <div className="hidden sm:flex sm:items-center z-[8]">
                {currentUser ? (
                  <AuthMenu
                    currentUser={currentUser}
                    show={showAuthMenu}
                    setShow={() => {
                      setShowAuthMenu(!showAuthMenu);
                    }}
                  />
                ) : (
                  <Link
                    href={route("login")}
                    className="px-4 py-2  flex justify-center items-center bg-gray-800/70 hover:bg-gray-800 text-gray-200 font-thin duration-200 border-[1px] border-solid border-gray-700 rounded-md "
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className=" flex items-center sm:hidden ">
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
              : " opacity-0 invisible z-[0] "
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
          isLoading={isLoadingGroups}
        />
      )}

      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-between items-start h-full flex-1 max-w-[200px] dark:bg-gray-900 bg-white min-h-barHeight max-md:hidden border-solid border-r-[1px] dark:border-gray-500/50 border-gray-400">
          <div className="flex flex-col justify-start items-start min-w-full h-fit">
            <SideBarButton
              // show={showFollowerContainer}
              event={() => {
                router.get("/");
                hideAll();
              }}
              text="Home"
            >
              <IoHome className="text-gray-400 text-lg w-[20px] h-[20px] mr-2" />
            </SideBarButton>
            <SideBarButton
              show={showFollowerContainer}
              event={() => setShowFollowerContainer(!showFollowerContainer)}
              text="Followers"
            >
              <FaUserGroup className="text-gray-400 text-lg w-[20px] h-[20px] mr-2" />
            </SideBarButton>
            <SideBarButton
              show={showNotificationsForm}
              event={() => setShowNotificationsForm(!showNotificationsForm)}
              text="Notifications"
            >
              {notificationsCount > 0 && (
                <span className="w-4 h-4 bg-red-500/40 border-[1px] border-solid border-red-500 backdrop-blur-sm absolute top-[8px] left-[30px] text-[12px] flex justify-center items-center rounded-md text-gray-300  p-0">
                  {notificationsCount}
                </span>
              )}
              <IoMdNotifications className="text-gray-400 text-lg w-[20px] h-[20px] mr-2" />
            </SideBarButton>
            <SideBarButton
              show={showGroupContainer}
              event={() => setShowGroupContainer(!showGroupContainer)}
              text="Groups"
            >
              <MdGroups2 className="text-gray-400 text-lg w-[20px] h-[20px] mr-2" />
            </SideBarButton>
            <SideBarButton
              event={() => {
                hideAll();
                router.get(route("chats"));
              }}
              text="Chats"
            >
              <PiChatsCircle className="text-gray-400 text-lg w-[20px] h-[20px] mr-2" />
            </SideBarButton>
            <SideBarButton
              event={() => {
                hideAll();
                router.get(route("aiChats"));
              }}
              text="AI Chat"
            >
              <BsStars className="text-gray-400 text-lg w-[20px] h-[20px] mr-2" />
            </SideBarButton>
            <SideBarButton event={() => router.reload()} text="Reload">
              <IoReloadOutline className="text-gray-400 text-lg w-[20px] h-[20px] mr-2" />
            </SideBarButton>
          </div>
          <div className="flex flex-col gap-2 justify-start items-start min-w-full h-fit">
            {currentUser ? (
              <SideBarButton
                event={() => router.post(route("logout"))}
                text="logout"
              >
                <MdLogout className="text-gray-400 text-lg w-[20px] h-[20px] mr-2" />
              </SideBarButton>
            ) : (
              <SideBarButton
                event={() => router.post(route("login"))}
                text="Login"
              >
                <MdLogin className="text-gray-400 text-lg w-[20px] h-[20px] mr-2" />
              </SideBarButton>
            )}
          </div>
        </div>

        <main className="flex-[3]">{children}</main>
        <div
          className={`absolute top-0 left-0 min-h-[100vh] min-w-[100vw] bg-transparent ${
            showOverlay ? "visible z-[7]" : "invisible z-0"
          }`}
          onClick={() => {
            hideAll();
          }}
        />
      </div>
    </div>
  );
}
