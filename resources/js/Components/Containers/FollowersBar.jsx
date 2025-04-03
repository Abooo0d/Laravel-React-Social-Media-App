import React, { useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import FollowerCard from "../Shared/FollowerCard";
const FollowersBar = ({ followers, showFollowerContainer }) => {
  const [followersData, setFollowersData] = useState(followers);
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
          <h2 className="text-gray-400 bg-gray-800 w-full py-3 px-4 text-xl font-bold cursor-default">
            Followers:
          </h2>
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
    </>
  );
};

export default FollowersBar;
