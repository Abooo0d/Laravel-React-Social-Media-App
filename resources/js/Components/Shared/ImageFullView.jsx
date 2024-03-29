import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { ImDownload3 } from "react-icons/im";
import { GoDownload } from "react-icons/go";
const ImageFullView = ({ image, show, setShowImage }) => {
  return (
    <div className={`overlay items-center ${show ? `flex` : `hidden`}`}>
      <div className="animate-scaleUp max-h-[700px] rounded-lg overflow-hidden max-w-full relative">
        <TiArrowBack
          className="back-button"
          onClick={() => setShowImage(false)}
        />
        <GoDownload
          className="download-button"
          onClick={() => setShowImage(false)}
        />
        <img
          src={image}
          alt="Post Image"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ImageFullView;
