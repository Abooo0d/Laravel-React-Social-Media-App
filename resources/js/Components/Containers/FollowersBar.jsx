import React, { useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import FollowerCard from "../Shared/FollowerCard";
import { PrimaryButton } from "../Shared/Buttons";
import SearchForFriendsForm from "../Shared/SearchForFriendsForm";
const FollowersBar = ({ followers, showFollowerContainer }) => {
  const [followersData, setFollowersData] = useState(followers);
  const [showFriendsForm, setShowFriendsForm] = useState(false);
  return (
    <>
      <div className="relative bg-red-500">
        <div
          className={`flex flex-col h-[500px] absolute top-[-10px] w-[400px] max-w-[90%] right-[50%] translate-x-[50%] md:right-[406px] z-[100] overflow-hidden rounded-xl bg-gray-900/80 border-[2px] border-solid border-gray-700 backdrop-blur-2xl duration-200 ${
            showFollowerContainer
              ? "visible opacity-100"
              : "invisible opacity-0 scale-90 "
          } `}
        >
          <div className="flex justify-between items-center bg-gray-800 px-4">
            <h2 className="text-gray-400 bg-gray-800 py-3  text-xl font-bold cursor-default">
              Followers:
            </h2>
            <PrimaryButton
              classes="text-[15px] w-fit py-1.5 px-3"
              event={() => {
                setShowFriendsForm(true);
              }}
            >
              Add Friends
            </PrimaryButton>
          </div>
          <div
            className={`flex flex-col gap-4 max-h-[500px] h-fit overflow-auto px-4 py-2`}
          >
            {followersData.length > 0 ? (
              <>
                {followersData.map((follower, index) => (
                  <FollowerCard data={follower} key={index} />
                ))}
              </>
            ) : (
              <div className="text-gray-600 text-center">
                You Don`t Have Any Followers.
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
