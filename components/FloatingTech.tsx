"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Database, 
  Server, 
  Cpu, 
  Cloud, 
  Layers,
  Terminal,
  Braces
} from "lucide-react";

const techIcons = [
  { Icon: Code, position: { x: "10%", y: "20%" }, delay: 0, color: "#8B5CF6" },
  { Icon: Database, position: { x: "85%", y: "15%" }, delay: 0.2, color: "#06B6D4" },
  { Icon: Server, position: { x: "15%", y: "70%" }, delay: 0.4, color: "#10B981" },
  { Icon: Cpu, position: { x: "90%", y: "65%" }, delay: 0.6, color: "#F59E0B" },
  { Icon: Cloud, position: { x: "50%", y: "10%" }, delay: 0.8, color: "#EF4444" },
  { Icon: Layers, position: { x: "20%", y: "45%" }, delay: 1, color: "#8B5CF6" },
  { Icon: Terminal, position: { x: "80%", y: "40%" }, delay: 1.2, color: "#06B6D4" },
  { Icon: Braces, position: { x: "60%", y: "80%" }, delay: 1.4, color: "#10B981" },
];

export default function FloatingTech() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {techIcons.map(({ Icon, position, delay, color }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: position.x,
            top: position.y,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="relative"
            style={{
              filter: `drop-shadow(0 0 10px ${color})`,
            }}
          >
            <Icon
              size={40}
              color={color}
              strokeWidth={1.5}
            />
          </div>
        </motion.div>
      ))}
      
      {/* Animated connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <motion.line
          x1="10%"
          y1="20%"
          x2="85%"
          y2="15%"
          stroke="url(#lineGradient1)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="15%"
          y1="70%"
          x2="90%"
          y2="65%"
          stroke="url(#lineGradient1)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}