import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import PostOwnerInfo from "./PostOwnerInfo";
import { router } from "@inertiajs/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
export default function UpdatePostForm({ post }) {
  let [isOpen, setIsOpen] = useState(false);
  const [postData, setPostData] = useState({
    body: post.body,
    id: post.id,
  });
  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }
  const handelSubmit = () => {
    router.put(route("post.update", postData), postData, {
      onSuccess: () => {
        close();
      },
    });
  };
  return (
    <>
      <button
        onClick={open}
        className="bg-gray-800 duration-300 hover:bg-gray-700 py-2 px-4 pr-16 text-sm font-medium text-white focus:outline-none text-left"
      >
        Edit Post
      </button>{" "}
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 bg-gray-900/30 backdrop-blur-sm">
            <DialogPanel
              transition
              className="relative max-w-[80%] w-[600px] rounded-xl bg-gray-900/80 border-[1px] border-solid border-gray-700 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <button
                className="bg-gray-900 absolute top-[20px] right-[20px] w-6 h-6 rounded-md flex justify-center items-center "
                onClick={close}
              >
                <HiMiniXMark className="w-5 h-5 text-gray-200" />
              </button>
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white mb-4"
              >
                Edit Post
              </DialogTitle>
              <PostOwnerInfo post={post} />
              <CKEditor
                editor={ClassicEditor}
                data={post.body}
                onChange={(event, editor) => {
                  setPostData({ ...postData, body: editor.getData() });
                }}
              />
              <div className="mt-4 gap-2 flex justify-end items-center">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700/50 hover:bg-gray-700 duration-200 py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-none"
                  onClick={() => {
                    handelSubmit();
                  }}
                >
                  Submit
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-800/50 hover:bg-gray-800 duration-200 py-1.5 px-3 border-[1px] border-gray-600 border-solid text-sm/6 font-semibold text-white  focus:outline-none "
                  onClick={() => {
                    close();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
