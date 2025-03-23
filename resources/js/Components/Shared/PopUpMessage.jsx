import React from "react";
import PopupCard from "./PopupCard";
import { PrimaryButton, SecondaryButton } from "./Buttons";

const PopUpMessage = (message, approve, reject) => {
  return (
    <PopupCard>
      <h2 className="w-full">{message}</h2>
      <div className="flex w-full justify-end items-center gap-2">
        <PrimaryButton
          event={() => {
            approve;
          }}
        >
          Yes
        </PrimaryButton>
        <SecondaryButton
          event={() => {
            reject();
          }}
        >
          No
        </SecondaryButton>
      </div>
    </PopupCard>
  );
};

export default PopUpMessage;
