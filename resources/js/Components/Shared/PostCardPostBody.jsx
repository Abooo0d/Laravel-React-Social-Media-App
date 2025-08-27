import { Disclosure } from "@headlessui/react";
import DOMPurify from "dompurify";
import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";

const PostCardPostBody = ({ post }) => {
  return (
    <>
      {post.body && (
        <div className="post-content dark:text-gray-400 text-gray-600">
          <MarkdownRenderer content={post.body}>{post.body}</MarkdownRenderer>
        </div>
        // <Disclosure>
        //   {({ open }) => (
        //     <div className="post-content text-gray-400">
        //       {post.body.length > 150 ? (
        //         <>
        //           {!open ? (
        //             <>
        //             </>
        //           ) : (
        //             <MarkdownRenderer content={post.body}>
        //               {post.body}
        //             </MarkdownRenderer>
        //           )}
        //           <Disclosure.Button className="text-gray-500 w-full flex justify-end mt-2 underline max-md:text-[14px]">
        //             {open ? "Read Less" : "Read more"}
        //           </Disclosure.Button>
        //         </>
        //       ) : (
        //         <MarkdownRenderer content={post.body}>
        //           {post.body}
        //         </MarkdownRenderer>
        //       )}
        //     </div>
        //   )}
        // </Disclosure>
      )}
    </>
  );
};

export default PostCardPostBody;
