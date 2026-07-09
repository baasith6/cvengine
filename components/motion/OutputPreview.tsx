"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export default function OutputPreview() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  } as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      
      {/* Centered Document Sheet */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hover-card-lift"
        style={{
          maxWidth: 600,
          margin: "0 auto",
          width: "100%",
          border: "1px solid var(--border)",
          borderRadius: 8,
          background: "#ffffff",
          padding: "32px 36px",
          boxShadow: "var(--shadow)",
          color: "#111111",
          fontFamily: "var(--font-geist-sans), 'Inter', sans-serif",
          position: "relative",
          textAlign: "left",
        }}
      >
        {/* Micro-label Badge */}
        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          fontSize: 9,
          fontWeight: 700,
          background: "var(--accent-bg)",
          color: "var(--accent-text)",
          border: "1px solid rgba(225, 29, 72, 0.12)",
          padding: "2px 6px",
          borderRadius: 4,
          textTransform: "uppercase",
          letterSpacing: "0.03em"
        }}>
          Single-column ATS-friendly output
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants} 
            style={{ textAlign: "center", borderBottom: "1.5px solid #222222", paddingBottom: 10, marginBottom: 14 }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111111", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
              CLARA R. BARNETT
            </h3>
            <p style={{ fontSize: 10.5, color: "#555555", margin: 0 }}>
              clara@example.com · Seattle, WA · linkedin.com/in/clara-barnett
            </p>
          </motion.div>

          {/* Summary */}
          <motion.p 
            variants={itemVariants} 
            style={{ fontSize: 11, lineHeight: 1.5, margin: "0 0 14px", color: "#333333" }}
          >
            Results-driven Software Engineer with 5+ years of experience building secure, scalable cloud web applications. Proficient in React, Node.js, and TypeScript.
          </motion.p>

          {/* Experience */}
          <motion.div variants={itemVariants} style={{ marginBottom: 14 }}>
            <h4 style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", borderBottom: "0.5px solid #aaaaaa", paddingBottom: 2, marginBottom: 6, letterSpacing: "0.05em" }}>
              PROFESSIONAL EXPERIENCE
            </h4>
            
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700 }}>
                <span>Software Engineer II · Cloud Solutions Inc.</span>
                <span style={{ fontWeight: "normal", color: "#555555" }}>2022 – Present</span>
              </div>
              <ul style={{ paddingLeft: 14, listStyleType: "disc", fontSize: 10.5, color: "#333333", marginTop: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                <li>Designed and implemented serverless REST API endpoints running on AWS Lambda.</li>
                <li>Migrated legacy web portal to modern React and TypeScript, boosting lighthouse score by 35 points.</li>
              </ul>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700 }}>
                <span>Junior Web Developer · DevCorp LLC</span>
                <span style={{ fontWeight: "normal", color: "#555555" }}>2020 – 2022</span>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <h4 style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", borderBottom: "0.5px solid #aaaaaa", paddingBottom: 2, marginBottom: 6, letterSpacing: "0.05em" }}>
              EDUCATION
            </h4>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700 }}>
              <span>B.S. in Computer Science · University of Washington</span>
              <span style={{ fontWeight: "normal", color: "#555555" }}>Class of 2020</span>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Anchor button */}
      <div style={{ textAlign: "center" }}>
        <Link
          href="/cv"
          className="hover-btn-lift"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-muted)",
            textDecoration: "none",
            background: "var(--surface)",
          }}
        >
          Build your CV in this format →
        </Link>
      </div>

    </div>
  );
}
