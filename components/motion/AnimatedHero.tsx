"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import LiveMarkdownDemo from "./LiveMarkdownDemo";
import MagneticButton from "./MagneticButton";
import { trackEvent } from "@/lib/telemetry/track";

type AnimatedHeroProps = {
  enabled: boolean;
};

export default function AnimatedHero({ enabled }: AnimatedHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  if (shouldReduceMotion) {
    return (
      <section style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px 32px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--accent-bg)",
              border: "1px solid rgba(225, 29, 72, 0.15)",
              color: "var(--accent-text)",
              fontSize: 11,
              fontWeight: 650,
              padding: "3px 10px",
              borderRadius: 99,
              marginBottom: 16,
              letterSpacing: "0.02em"
            }}>
              Free · Privacy First · No Account Required
            </div>
            <h1 style={{
              fontSize: "calc(1.8rem + 1vw)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              marginBottom: 14,
            }}>
              Write your CV in Markdown.<br />
              Export an ATS-ready PDF.
            </h1>
            <p style={{
              fontSize: 14,
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: 24,
              maxWidth: 480,
            }}>
              Build a clean, recruiter-friendly CV with live preview, Markdown templates, and private browser-only export. Optimized for clean parsing.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
              <Link
                href="/cv"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 20px",
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#ffffff",
                  background: "var(--accent)",
                  textDecoration: "none",
                }}
              >
                Start building
              </Link>
              <a
                href="#example"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "9px 18px",
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  background: "var(--surface)",
                }}
              >
                View example CV
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <LiveMarkdownDemo />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 1024, margin: "0 auto", padding: "40px 24px 32px", position: "relative" }}>
      {/* Subtle radial spotlight glow behind hero */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(225, 29, 72, 0.02) 0%, rgba(225,29,72,0) 70%)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ position: "relative", zIndex: 1 }}
      >
        
        {/* Left Column: Headline & Action */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Step 1: Badge */}
          <motion.div 
            variants={itemVariants}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--accent-bg)",
              border: "1px solid rgba(225, 29, 72, 0.15)",
              color: "var(--accent-text)",
              fontSize: 11,
              fontWeight: 650,
              padding: "3px 10px",
              borderRadius: 99,
              marginBottom: 16,
              letterSpacing: "0.02em"
            }}
          >
            Free · Privacy First · No Account Required
          </motion.div>
          
          {/* Step 2: Headline line-by-line */}
          <h1 style={{
            fontSize: "calc(1.8rem + 1vw)",
            fontWeight: 800,
            color: "var(--text)",
            letterSpacing: "-0.035em",
            lineHeight: 1.15,
            marginBottom: 14,
            display: "flex",
            flexDirection: "column",
          }}>
            <motion.span variants={itemVariants}>Write your CV in Markdown.</motion.span>
            <motion.span variants={itemVariants} style={{ color: "var(--text)" }}>Export an ATS-ready PDF.</motion.span>
          </h1>
          
          {/* Step 3: Subtitle */}
          <motion.p 
            variants={itemVariants}
            style={{
              fontSize: 14,
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: 24,
              maxWidth: 480,
            }}
          >
            Build a clean, recruiter-friendly CV with live preview, Markdown templates, and private browser-only export. Optimized for clean parsing.
          </motion.p>

          {/* Step 4: Buttons */}
          <motion.div 
            variants={itemVariants}
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}
          >
            <MagneticButton
              onClick={() => {
                trackEvent({ name: "cta:click", path: "/", enabled });
                window.location.href = "/cv";
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 20px",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                color: "#ffffff",
                background: "var(--accent)",
                border: "none"
              }}
            >
              Start building
              <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden className="hover-arrow">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </MagneticButton>
            
            <a
              href="#example"
              className="hover-btn-lift"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "9px 18px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
                background: "var(--surface)",
              }}
            >
              View example CV
            </a>
          </motion.div>
        </div>

        {/* Right Column: Live Product Preview Demo (Step 5) */}
        <motion.div 
          className="lg:col-span-6"
          variants={{
            hidden: { opacity: 0, scale: 0.96, x: 20 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              x: 0,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            }
          }}
        >
          <LiveMarkdownDemo />
        </motion.div>

      </motion.div>
    </section>
  );
}
