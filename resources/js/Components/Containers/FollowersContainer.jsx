import React from "react";
import FollowerCard from "../Shared/FollowerCard";

const FollowersContainer = ({ chats }) => {
  return (
    <div className="py-4 max-h-barContainerHeight flex h-barHeight">
      {false ? (
        <div className="text-gray-600 text-center">
          You Don`t Have Followers Yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-barHeight h-full overflow-scroll flex-1">
          {followers?.map((follower, index) => (
            <FollowerCard data={follower} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowersContainer;
