"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type Step = {
  n: string;
  title: string;
  desc: string;
  label: string;
};

const STEPS: Step[] = [
  {
    n: "1",
    label: "Markdown Editor",
    title: "Write in Markdown",
    desc: "Type your CV sections using lightweight plain text. Paste experience text or insert built-in snippets with one click."
  },
  {
    n: "2",
    label: "Live Preview",
    title: "Preview instantly",
    desc: "Review formatting side-by-side in real time. Your document layout is rendered directly in an A4 structure."
  },
  {
    n: "3",
    label: "PDF / Word Export",
    title: "Export clean files",
    desc: "Download a recruiter-friendly Word document or ATS-friendly PDF. Generated on demand and kept private."
  }
];

export default function WorkflowAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate active index on scroll
  useEffect(() => {
    if (shouldReduceMotion) return;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.3) {
        setActiveIndex(0);
      } else if (latest >= 0.3 && latest < 0.7) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, shouldReduceMotion]);

  // Width of connecting progress line
  const lineWidth = useTransform(scrollYProgress, [0, 0.95], ["0%", "100%"]);

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      
      {/* Horizontal Connector Line Animation */}
      <div 
        className="hidden md:flex" 
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          height: 12,
          marginBottom: 16,
        }}
      >
        {/* Background track line */}
        <div style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: "50%",
          transform: "translateY(-50%)",
          height: 2,
          background: "var(--border)",
          zIndex: 1,
        }} />

        {/* Animated progressive line */}
        {!shouldReduceMotion && (
          <motion.div style={{
            position: "absolute",
            left: 48,
            top: "50%",
            transform: "translateY(-50%)",
            height: 2,
            background: "var(--accent)",
            width: lineWidth,
            zIndex: 2,
          }} />
        )}

        {/* Horizontal Label Markers */}
        {STEPS.map((step, idx) => {
          const active = activeIndex === idx || shouldReduceMotion;
          return (
            <div 
              key={step.n}
              style={{
                position: "relative",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <motion.div
                animate={{
                  scale: active ? 1.15 : 1,
                  backgroundColor: active ? "var(--accent)" : "var(--surface)",
                  borderColor: active ? "var(--accent)" : "var(--border)",
                  color: active ? "#ffffff" : "var(--text-faint)",
                }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 99,
                  border: "2px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {step.n}
              </motion.div>
              
              <span style={{
                position: "absolute",
                top: 40,
                fontSize: 11,
                fontWeight: active ? 700 : 500,
                color: active ? "var(--text)" : "var(--text-faint)",
                whiteSpace: "nowrap",
                transition: "color 0.2s"
              }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Responsive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((step, idx) => {
          const active = activeIndex === idx || shouldReduceMotion;
          return (
            <motion.div
              key={step.n}
              animate={{
                borderColor: active ? "var(--border-strong)" : "var(--border)",
                boxShadow: active ? "var(--shadow)" : "none",
                backgroundColor: active ? "var(--surface-raised)" : "var(--surface)",
              }}
              transition={{ duration: 0.25 }}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                textAlign: "left",
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: 5,
                background: active ? "var(--accent)" : "var(--accent-bg)",
                color: active ? "#ffffff" : "var(--accent-text)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 750,
                fontSize: 11.5,
                transition: "all 0.25s",
              }}>
                {step.n}
              </div>
              
              <h4 style={{
                fontSize: 14.5,
                fontWeight: 750,
                color: active ? "var(--text)" : "var(--text-muted)",
                margin: 0,
                transition: "color 0.25s"
              }}>
                {step.title}
              </h4>
              
              <p style={{
                fontSize: 12.5,
                color: "var(--text-muted)",
                lineHeight: 1.45,
                margin: 0
              }}>
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
