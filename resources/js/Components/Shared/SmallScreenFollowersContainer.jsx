import React from "react";
import FollowerCard from "./FollowerCard";
import { SecondaryButton } from "./Buttons";
import { HiMiniXMark } from "react-icons/hi2";

const SmallScreenFollowersContainer = ({
  followers,
  showForm,
  setShowForm,
}) => {
  function close() {
    setShowForm(false);
  }
  return (
    <div
      className={`absolute top-[100px] max-w-[80%] max-h-[60%] left-[75px] pb-2 bg-gray-900/90 border-gray-700 border-solid border-[1px] backdrop-blur-md px-4 py-8 rounded-md shadow-2xl duration-200 overflow-hidden z-[100] ${
        showForm
          ? " opacity-100 visible w-[300px]"
          : " opacity-0 invisible w-[200px] h-[200px]"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="mb-4 -mt-4  text-gray-400 font-bold">My Followers:</h2>
      </div>
      <div className="overflow-scroll h-[400px]">
        <div className="flex flex-col gap-2 mt-2 max-h-[80%] justify-start items-center p-2 overflow-auto rounded-md">
          {followers.length > 0 ? (
            <>
              {followers.map((follower, index) => (
                <FollowerCard data={follower} key={index} />
              ))}
            </>
          ) : (
            <div className="text-gray-600 text-center">
              You Don`t Have Any Followers
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallScreenFollowersContainer;
