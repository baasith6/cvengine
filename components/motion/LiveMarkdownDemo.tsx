"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useReducedMotion, motion } from "framer-motion";

const DEMO_LINES = [
  "# Jane Doe",
  "jane.doe@email.com | +1 (555) 019-2834",
  "",
  "## Experience",
  "### Senior Engineer · Tech Corp",
  "- Led Next.js migration reducing load time by 40%",
  "- Optimized ATS scoring layouts for search",
  "",
  "## Skills",
  "React, TypeScript, Node.js, Markdown"
];

export default function LiveMarkdownDemo() {
  const shouldReduceMotion = useReducedMotion();
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Restart loop configuration
  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedLines(DEMO_LINES);
      setIsCompleted(true);
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;
    let currentLineText = "";
    let linesAccumulator: string[] = [];

    const typeCharacter = () => {
      if (lineIdx >= DEMO_LINES.length) {
        setIsCompleted(true);
        // Loop back after 6 seconds
        const resetTimer = setTimeout(() => {
          setTypedLines([]);
          setActiveLineIdx(0);
          setIsCompleted(false);
          lineIdx = 0;
          charIdx = 0;
          currentLineText = "";
          linesAccumulator = [];
          typeCharacter();
        }, 6000);
        return () => clearTimeout(resetTimer);
      }

      const fullLineText = DEMO_LINES[lineIdx];
      setActiveLineIdx(lineIdx);

      if (charIdx < fullLineText.length) {
        currentLineText += fullLineText[charIdx];
        setTypedLines([...linesAccumulator, currentLineText]);
        charIdx++;
        setTimeout(typeCharacter, 25); // typing speed
      } else {
        // Line finished
        linesAccumulator.push(fullLineText);
        setTypedLines([...linesAccumulator]);
        lineIdx++;
        charIdx = 0;
        currentLineText = "";
        setTimeout(typeCharacter, 250); // Pause between lines
      }
    };

    const startTimer = setTimeout(typeCharacter, 800);
    return () => clearTimeout(startTimer);
  }, [shouldReduceMotion]);

  const currentMarkdown = typedLines.join("\n");

  return (
    <div style={{
      border: "1px solid var(--border)",
      borderRadius: 10,
      background: "var(--surface)",
      overflow: "hidden",
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.02)",
      width: "100%",
    }}>
      {/* Mock Browser Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        background: "var(--surface-raised)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: "#ef4444", display: "inline-block" }} />
          <span style={{ width: 8, height: 8, borderRadius: 99, background: "#f59e0b", display: "inline-block" }} />
          <span style={{ width: 8, height: 8, borderRadius: 99, background: "#10b981", display: "inline-block" }} />
        </div>
        <span style={{ fontSize: 10.5, color: "var(--text-faint)", fontFamily: "ui-monospace, monospace" }}>cvengine.space/live-editor</span>
        <div style={{ width: 36 }} />
      </div>
      
      {/* Split Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 280 }}>
        
        {/* Left Panel: Markdown Editor Mock */}
        <div style={{
          borderRight: "1px solid var(--border)",
          background: "var(--surface-raised)",
          padding: 16,
          fontFamily: "ui-monospace, monospace",
          fontSize: 11,
          color: "var(--text-muted)",
          lineHeight: 1.45,
          overflow: "hidden",
          userSelect: "none",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", color: "var(--text-faint)", letterSpacing: "0.05em", marginBottom: 12 }}>
            Markdown Editor
          </div>
          <div style={{ flex: 1 }}>
            {typedLines.map((line, idx) => (
              <div key={idx} style={{ minHeight: 16 }}>
                {line}
                {idx === activeLineIdx && !isCompleted && (
                  <span className="typing-cursor" style={{ marginLeft: 1 }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Live CV Preview */}
        <div style={{
          background: "#ffffff",
          padding: 16,
          fontSize: 10,
          color: "#111111",
          lineHeight: 1.4,
          overflow: "hidden",
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", color: "#888888", letterSpacing: "0.05em", marginBottom: 12 }}>
            ATS Preview
          </div>
          
          <div 
            style={{ flex: 1, padding: "0 8px" }}
            className="[&_h1]:text-base [&_h1]:font-bold [&_h1]:text-center [&_h1]:border-b [&_h1]:pb-1 [&_h1]:mb-2 [&_h2]:text-xs [&_h2]:font-bold [&_h2]:uppercase [&_h2]:border-b [&_h2]:mt-3 [&_h2]:mb-1 [&_h3]:text-2xs [&_h3]:font-bold [&_p]:text-2xs [&_p]:text-gray-700 [&_ul]:pl-4 [&_ul]:list-disc [&_li]:text-2xs [&_li]:text-gray-700 [&_a]:text-[var(--accent)] [&_a]:underline"
          >
            {currentMarkdown ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentMarkdown}</ReactMarkdown>
            ) : (
              <div style={{ color: "#aaa", fontSize: 10, fontStyle: "italic", textAlign: "center", marginTop: 40 }}>
                Awaiting input...
              </div>
            )}
          </div>

          {/* Export Complete CTA overlay */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                right: 12,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow)",
                borderRadius: 6,
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 650, color: "var(--text-muted)" }}>
                CV compiles successfully.
              </span>
              <motion.button
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(225, 29, 72, 0.4)",
                    "0 0 0 6px rgba(225, 29, 72, 0)",
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                style={{
                  background: "var(--accent)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
              >
                Export PDF
              </motion.button>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
