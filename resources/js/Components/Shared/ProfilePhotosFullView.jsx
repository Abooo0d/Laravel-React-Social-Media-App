import React, { useEffect, useState } from "react";
import { GoDownload } from "react-icons/go";
import { RiArrowGoBackFill } from "react-icons/ri";
import { SecondaryButton } from "./Buttons";
import { FaAngleRight, FaAngleLeft, FaFile } from "react-icons/fa";
import { isImage } from "@/Functions";
const ProfilePhotosFullView = ({
  showImage,
  photos,
  imageIndex,
  setShowImage,
  setImageIndex,
}) => {
  const [attachmentId, setAttachmentId] = useState(0);
  useEffect(() => {
    setAttachmentId(photos[imageIndex]);
  }, [showImage]);

  const next = (index) => {
    if (index < photos.length - 1) {
      setImageIndex(index + 1);
      setAttachmentId(photos[index + 1]);
    } else {
      setImageIndex(0);
      setAttachmentId(photos[0]);
    }
  };
  const back = (index) => {
    if (index > 0) {
      setImageIndex(index - 1);
      setAttachmentId(photos[index - 1]);
    } else {
      setImageIndex(photos.length - 1);
      setAttachmentId(photos[photos.length - 1]);
    }
  };
  return (
    <div
      className={`fixed inset-0 z-[800] w-screen overflow-y-auto flex min-h-full items-center justify-center p-4 bg-gray-950/60 backdrop-blur-sm duration-200 ${
        showImage ? `visible opacity-100` : `invisible opacity-0 scale-[95%]`
      }`}
    >
      <div className="animate-scaleUp h-full  w-full rounded-lg relative flex justify-between items-center bg-gray-900/60 border-solid border-[1px] border-gray-700 backdrop-blur-md p-4">
        <div className="absolute top-[30px] right-[12px] h-20 flex justify-center items-center gap-2 flex-col">
          <SecondaryButton
            classes="py-1.5 px-3 right-0"
            event={() => setShowImage(false)}
          >
            <RiArrowGoBackFill className="w-5 h-5 text-gray-200" />
          </SecondaryButton>

          {attachmentId !== 0 && (
            <a
              href={route("post.download", attachmentId ?? 0)}
              className="no-underline"
            >
              <SecondaryButton classes="relative py-1.5 px-3" event={() => {}}>
                <GoDownload className="w-5 h-5 text-gray-200" />
              </SecondaryButton>
            </a>
          )}

          <SecondaryButton
            classes=" py-1.5 px-3 right-0 w-[46px] cursor-default"
            event={() => {}}
          >
            {imageIndex ? imageIndex + 1 : 1}
          </SecondaryButton>
        </div>
        <SecondaryButton
          event={() => back(imageIndex)}
          classes="h-[100px] w-[35px]"
        >
          <FaAngleLeft className="w-6 h-6 flex justify-center items-center" />
        </SecondaryButton>
        {showImage && (
          <div className="relative w-full h-full flex ">
            {photos?.map((photo, index) => (
              <React.Fragment key={index}>
                {isImage(photo) ? (
                  <img
                    src={photo.url}
                    alt="Post Image"
                    key={index}
                    className={`max-w-[90%] max-h-[90%] object-contain rounded-[10px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-200 ${
                      index === imageIndex
                        ? `visible opacity-100`
                        : `invisible opacity-0 scale-75`
                    }`}
                  />
                ) : (
                  <div
                    className={`max-w-[90%] max-h-[90%] w-[400px] h-[400px] rounded-lg cursor-default bg-gray-800 flex justify-center items-center flex-col gap-4  absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] duration-200 ${
                      index === imageIndex
                        ? `visible opacity-100`
                        : `invisible opacity-0 scale-75`
                    }`}
                  >
                    <FaFile className="w-20 h-20 text-gray-500" />
                    <h3 className="text-gray-500 font-bold text-xl max-w-[80%] break-words text-center">
                      {photo?.name}
                    </h3>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        <SecondaryButton
          event={() => {
            next(imageIndex);
          }}
          classes="h-[100px] w-[35px]"
        >
          <FaAngleRight className="w-6 h-6" />
        </SecondaryButton>
      </div>
    </div>
  );
};

export default ProfilePhotosFullView;
