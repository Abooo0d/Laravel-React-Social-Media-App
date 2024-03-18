import React from "react";
import FollowerCard from "../Shared/FollowerCard";

const FollowersContainer = ({ followers }) => {
  return (
    <div className="py-8">
      {false ? (
        <div className="text-gray-600 text-center">
          You Don`t Have Followers Yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {followers.map((follower, index) => (
            <FollowerCard data={follower} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowersContainer;
