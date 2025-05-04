import { Disclosure } from "@headlessui/react";
import DOMPurify from "dompurify";
import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";

const PostCardPostBody = ({ post }) => {
  return (
    <>
      {post.body && (
        <Disclosure>
          {({ open }) => (
            <div className="post-content text-gray-400">
              {post.body.length > 150 ? (
                <>
                  {!open ? (
                    <>
                      {/* <div
                        className="ch-content-output dark:text-gray-400 text-gray-700 lg:text-xl md:text-lg"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            post.body.substring(0, 150) + ".."
                          ),
                        }}
                      ></div>
                       */}
                      <MarkdownRenderer content={post.body}>
                        {post.body}
                      </MarkdownRenderer>
                    </>
                  ) : (
                    // <Disclosure.Panel>
                    //   <div
                    //     className="ch-content-output dark:text-gray-400 text-gray-700 lg:text-xl md:text-lg"
                    //     dangerouslySetInnerHTML={{
                    //       __html: DOMPurify.sanitize(post.body),
                    //     }}
                    //   ></div>
                    // </Disclosure.Panel>
                    <MarkdownRenderer content={post.body}>
                      {post.body}
                    </MarkdownRenderer>
                  )}
                  <Disclosure.Button className="text-gray-500 w-full flex justify-end mt-2 underline max-md:text-[14px]">
                    {open ? "Read Less" : "Read more"}
                  </Disclosure.Button>
                </>
              ) : (
                // <div
                //   className="dark:text-gray-400 text-gray-700 lg:text-xl md:text-lg"
                //   dangerouslySetInnerHTML={{
                //     __html: DOMPurify.sanitize(post.body),
                //   }}
                // ></div>
                <MarkdownRenderer content={post.body}>
                  {post.body}
                </MarkdownRenderer>
              )}
            </div>
          )}
        </Disclosure>
      )}
    </>
  );
};

export default PostCardPostBody;
