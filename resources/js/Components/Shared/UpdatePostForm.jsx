import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import PostOwnerInfo from "./PostOwnerInfo";
import { router } from "@inertiajs/react";
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
    console.log(postData);
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
                className="text-base/7 font-medium text-white"
              >
                Edit Post
              </DialogTitle>
              {/* <FullPostCard post={post} show={true} /> */}
              <PostOwnerInfo post={post} />
              {/* <input
                type="text"
                className="w-full text-gray-800 bg-gray-800 duration-300 dark:text-gray-500 lg:text-xl text-lg py-2 px-8 border-[1px] border-solid dark:border-gray-800 border-gray-300 rounded-lg cursor-pointer"
                placeholder=" Click here To Create post"
                value={post.body}
                // onChange={(e) => setPost({ ...post, body: e.target.value })}
              /> */}
              <textarea
                className="mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-lg text-white
                  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 "
                rows={10}
                value={postData.body}
                onChange={(e) =>
                  setPostData({ ...postData, body: e.target.value })
                }
              ></textarea>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => {
                    handelSubmit();
                  }}
                >
                  Submit
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
