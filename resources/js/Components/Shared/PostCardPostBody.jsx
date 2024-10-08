import { Disclosure } from "@headlessui/react";
import DOMPurify from "dompurify";
import React from "react";

const PostCardPostBody = ({ post }) => {
  return (
    <>
      {post.body && (
        <Disclosure>
          {({ open }) => (
            <div className="post-content">
              {post.body.length > 150 ? (
                <>
                  {!open ? (
                    <>
                      <div
                        className="ch-content-output dark:text-gray-300 text-gray-700 lg:text-xl text-lg"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            post.body.substring(0, 150) + ".."
                          ),
                        }}
                      ></div>
                    </>
                  ) : (
                    <Disclosure.Panel>
                      <div
                        className="ch-content-output dark:text-gray-300 text-gray-700 lg:text-xl text-lg"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(post.body),
                        }}
                      ></div>
                    </Disclosure.Panel>
                  )}
                  <Disclosure.Button className="text-indigo-600 text-lg w-full flex justify-end mt-2">
                    {open ? "Read Less" : "Read more"}
                  </Disclosure.Button>
                </>
              ) : (
                <div
                  className="dark:text-gray-300 text-gray-700 lg:text-xl text-lg"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.body),
                  }}
                >
                  {/* {post.body} */}
                </div>
              )}
            </div>
          )}
        </Disclosure>
      )}
    </>
  );
};

export default PostCardPostBody;
