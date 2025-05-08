import React, { useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import FollowerCard from "../Shared/FollowerCard";
import { PrimaryButton } from "../Shared/Buttons";
import SearchForFriendsForm from "../Shared/SearchForFriendsForm";
const FollowersBar = ({
  followers,
  showFollowerContainer,
  setShowFollowerContainer,
}) => {
  const [followersData, setFollowersData] = useState(followers);
  const [showFriendsForm, setShowFriendsForm] = useState(false);
  return (
    <>
      <div className="relative z-[200]">
        <div
          className={`flex flex-col max-h-[500px] absolute md:top-[0px] top-[-10px] w-[400px] max-w-[90%] right-[50%] translate-x-[50%] md:left-[0px] z-[100] overflow-hidden rounded-xl md:rounded-l-none md:rounded-t-none bg-gray-900/60 border-[1px] border-solid border-gray-500/50 backdrop-blur-md duration-200 ${
            showFollowerContainer
              ? "visible opacity-100"
              : "invisible opacity-0 scale-90 "
          } `}
        >
          <div className="flex justify-between items-center bg-gray-800 px-4">
            <h2 className="text-gray-400 bg-gray-800 py-3 lg:text-xl font-bold cursor-default">
              Followers:
            </h2>
            <PrimaryButton
              classes="text-[15px] w-fit py-1 px-2 "
              event={() => {
                setShowFriendsForm(true);
              }}
            >
              Search
            </PrimaryButton>
          </div>
          <div
            className={`flex flex-col gap-4 max-h-[500px] h-fit overflow-auto px-4 py-2`}
          >
            {followersData.length > 0 ? (
              <>
                {followersData.map((follower, index) => (
                  <FollowerCard
                    data={follower}
                    key={index}
                    setShowFollowerContainer={setShowFollowerContainer}
                  />
                ))}
              </>
            ) : (
              <div className="text-gray-600 text-center py-4">
                You Don`t Have Any Friends.
              </div>
            )}
          </div>
        </div>
      </div>
      <SearchForFriendsForm
        showForm={showFriendsForm}
        setShowForm={setShowFriendsForm}
      />
    </>
  );
};

export default FollowersBar;
