import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import UserMemberCardMenu from "./UserMemberCardMenu";

const UserMemberCard = ({ member, isAdmin, group }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div>
      <div className="group relative dark:bg-gray-700/30 bg-gray-200 backdrop-blur-sm rounded-[8px] border-[1px] border-solid border-gray-500/50  flex flex-col justify-between items-center cursor-pointer duration-200 dark:hover:bg-gray-600/50 hover:bg-gray-300 dark:hover:border-gray-500 hover:border-gray-400 overflow-hidden drop-shadow-2xl">
        {group.owner !== member.user.id && isAdmin && (
          <UserMemberCardMenu
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            member={member}
            group={group}
          />
        )}
        <img
          src={member.user.avatar_url || "/images/default_avatar_image.png"}
          alt=""
          className="absolute top-[10%] left-[10%] w-[90px] h-[90px] rounded-full border-[1px] border-solid border-gray-500/50 object-cover"
        />
        <img
          src={member.user.cover_url || "/images/default_cover_image.png"}
          alt=""
          className="w-full  min-h-[120px] max-h-[120px] h-[120px] object-cover"
        />
        <div className="flex justify-between items-center w-full pr-4">
          <Link
            className="flex flex-col justify-start items-start w-full"
            href={route("profile.view", member.user.id)}
          >
            <h3 className="dark:text-gray-300 text-gray-600 font-bold mt-1 w-full text-left px-4">
              {member.user.name}
            </h3>
            <h3 className="dark:text-gray-400  text-gray-700 mb-2 w-full text-left px-4 text-[13px] -mt-1">
              {member.user.email}
            </h3>
          </Link>
        </div>
        {group.owner == member.user.id ? (
          <span className="absolute bottom-[15px] right-[10px] backdrop-blur-md border-[1px] border-solid pl-[6px] px-[5px] py-[2px] rounded-sm text-gray-300 text-[10px] opacity-100 duration-200 bg-indigo-800/30 border-indigo-800">
            Owner
          </span>
        ) : member.role == "admin" ? (
          <span className="absolute bottom-[15px] right-[10px] backdrop-blur-md border-[1px] border-solid pl-[6px] px-[5px] py-[2px] rounded-sm text-gray-300 text-[10px] opacity-100 duration-200 bg-emerald-600/30 border-emerald-500">
            Admin
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserMemberCard;
