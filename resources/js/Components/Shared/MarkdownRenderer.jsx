import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  atomDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        // Inline code (`code`)
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={atomDark}
              language={match?.[1] || "text"}
              PreTag="div"
              className="rounded-lg text-sm"
              showLineNumbers={true}
              wrapLines={true}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className=" px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          );
        },

        // Optional: Preformatted blocks (``` ```)
        pre({ node, className, children, ...props }) {
          return (
            <pre
              className="bg-transparent rounded-md overflow-x-scroll"
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
