"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type PreviewProps = {
  markdown: string;
};

export default function Preview({ markdown }: PreviewProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[var(--card-border)] bg-[var(--background)]/50">
        <span className="text-sm font-semibold text-[var(--foreground)]">
          Preview
        </span>
      </div>
      <div className="flex-1 overflow-auto p-5 min-h-[200px] text-[var(--foreground)] [&_h1]:text-xl [&_h1]:font-bold [&_h1]:border-b [&_h1]:border-[var(--card-border)] [&_h1]:pb-2 [&_h1]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1 [&_p]:my-2 [&_ul]:my-2 [&_ul]:pl-5 [&_li]:my-0.5 [&_a]:text-[var(--accent)] [&_a]:underline [&_strong]:font-semibold">
        {markdown ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        ) : (
          <p className="text-[var(--muted)]">Nothing to preview yet.</p>
        )}
      </div>
    </div>
  );
}
