import { PropsWithChildren, forwardRef } from "react";
import { CodeLine } from "@/ethlab/types";

interface CodeBlockProps extends PropsWithChildren {
  className?: string;
  lines?: CodeLine[];
}

const CodeBlock = (props: CodeBlockProps, ref: any) => {
  let content = props.children;

  if (props.lines && props.lines.length > 0) {
    content = props.lines.map((l) => {
      let className = "block whitespace-pre";
      if (l.type === "mute") className += " opacity-30";
      if (l.type === "focus") className += " text-emerald-300";
      if (l.type === "error") className += " text-red-300";
      return <code className={className}>{l.content}</code>;
    });
  }

  return (
    <div
      ref={ref}
      className={
        "bg-gray-800 text-white p-4 whitespace-pre border border-gray-200 dark:border-gray-800 rounded-md overflow-scroll " +
        props.className
      }
    >
      <code>{content}</code>
    </div>
  );
};

export default forwardRef(CodeBlock);
