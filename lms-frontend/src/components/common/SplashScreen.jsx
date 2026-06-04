import React from "react";
import { motion } from "framer-motion";

const SplashScreen = () => {
  // Animation variants for drawing the paths
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      // Much faster, tighter drawing sequence
      const delay = 0.3 + i * 0.2; 
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.2, bounce: 0 },
          opacity: { delay, duration: 0.1 },
        },
      };
    },
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden">
      
      {/* Background Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute w-[40vw] h-[40vw] bg-primary/40 rounded-full blur-[100px] pointer-events-none"
      />

      <motion.div
        initial={{ rotateX: 45, rotateY: -15, scale: 0.8, opacity: 0 }}
        animate={{ rotateX: 0, rotateY: 0, scale: 1, opacity: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: "easeOut",
          delay: 0.1 
        }}
        className="relative flex flex-col items-center gap-6 perspective-1000"
      >
        {/* Animated SVG Logo */}
        <motion.svg
          width="160"
          height="160"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_15px_rgba(79,142,255,0.4)]"
        >
          {/* Vertical Stem */}
          <motion.path
            d="M13 6 L13 42"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="text-foreground"
            variants={draw}
            custom={0}
            initial="hidden"
            animate="visible"
          />
          
          {/* Bottom Diagonal */}
          <motion.path
            d="M13 24 L33 42"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="text-foreground"
            opacity=".28"
            variants={draw}
            custom={1}
            initial="hidden"
            animate="visible"
          />

          {/* Top Diagonal (Blue Arrow Shaft) */}
          <motion.path
            d="M13 24 L31 7"
            stroke="#4F8EFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            variants={draw}
            custom={2}
            initial="hidden"
            animate="visible"
          />

          {/* Arrow Head (Blue) */}
          <motion.path
            d="M24 6 L31 7 L30 15"
            stroke="#4F8EFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            variants={draw}
            custom={3}
            initial="hidden"
            animate="visible"
          />
        </motion.svg>

        {/* Brand Name Text fading in - Sped up! */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h1 className="text-4xl font-bold tracking-widest text-foreground flex items-center gap-2">
            kriya
          </h1>
        </motion.div>
        
        {/* Loading progress indicator */}
        <motion.div 
          initial={{ opacity: 0, width: "0%" }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 2, delay: 0.4 }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-[2px] w-48 bg-border overflow-hidden rounded-full"
        >
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="w-1/2 h-full bg-primary/50"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
