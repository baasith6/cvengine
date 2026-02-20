"use client";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function Editor({ value, onChange }: EditorProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") onChange(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--card-border)] bg-[var(--background)]/50">
        <span className="text-sm font-semibold text-[var(--foreground)]">
          Markdown
        </span>
        <label className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload .md
          <input
            type="file"
            accept=".md,text/markdown,text/plain"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <textarea
        className="flex-1 w-full p-4 font-[family-name:var(--font-geist-mono)] text-sm leading-relaxed border-0 focus:ring-0 focus:outline-none resize-none bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste or type your CV in Markdown..."
        spellCheck={false}
      />
    </div>
  );
}
