import React from "react";
import SuggestionCard from "../Shared/SuggestionCard";
import { useEffect } from "react";
import { useState } from "react";

const FriendSuggestionsContainer = ({ data, isLoadingSuggestions }) => {
  const [suggestions, setSuggestions] = useState(data?.data?.users);
  useEffect(() => {
    setSuggestions(data?.data?.users);
  }, [data]);

  return (
    <div
      className={`max-w-[700px] min-h-[356px] w-full dark:bg-gray-900 bg-gray-200 rounded-lg pb-4 pt-2 px-4 flex flex-col duration-500 shadow-md overflow-x-hidden`}
    >
      <h2 className="text-gray-300 pb-2 h-[30px]">People You May Know</h2>
      <div className="w-full h-[306px] py-1 flex justify-start items-center gap-2 rounded-md overflow-hidden px-4">
        {suggestions?.map((suggestion, index) => (
          <SuggestionCard suggestion={suggestion} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FriendSuggestionsContainer;
