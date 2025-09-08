import { useEffect } from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

const MarkdownRenderer = ({ content }) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    // Initial check
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    // Listen for changes
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return (
    <ReactMarkdown
      components={{
        // Inline code (`code`)
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              // style={oneLight}
              style={isDark ? atomDark : oneLight}
              language={match?.[1] || "text"}
              PreTag="div"
              className="rounded-lg text-sm"
              showLineNumbers={true}
              wrapLines={true}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className=" px-1.5 py-0.5 rounded text-sm font-mono dark:bg-gray-800 bg-gray-200 text-gray-200">
              {children}
            </code>
          );
        },

        // Optional: Preformatted blocks (``` ```)
        pre({ node, className, children, ...props }) {
          return (
            <pre
              className="bg-transparent rounded-md overflow-x-scroll min-h-fit text-gray-300"
              {...props}
            >
              {children}
            </pre>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
export default MarkdownRenderer;
