"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";

type MotionCardProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function MotionCard({
  children,
  delay = 0,
  className = "",
  style = {},
}: MotionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Motion values for 3D tilt effect
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [4, -4]);
  const rotateY = useTransform(x, [0, 1], [-4, 4]);

  const springConfig = { damping: 25, stiffness: 200 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (shouldReduceMotion || !cardRef.current) return;
    if (window.innerWidth < 1024) return; // Disable tilt on mobile/tablet

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      style={{
        ...style,
        perspective: 1000,
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      className={`hover-card-lift ${className}`}
    >
      {children}
    </motion.div>
  );
}
