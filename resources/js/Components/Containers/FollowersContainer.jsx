import React from "react";
import FollowerCard from "../Shared/FollowerCard";

const FollowersContainer = ({ followers }) => {
  return (
    <div className="pt-4 pb-9 max-h-full flex h-[400px]">
      {false ? (
        <div className="text-gray-600 text-center">
          You Don`t Have Followers Yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-full h-[400px] overflow-scroll flex-1">
          {followers.map((follower, index) => (
            <FollowerCard data={follower} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowersContainer;
