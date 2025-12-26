"use client";

import { motion } from "framer-motion";
import { BlackHole } from "@/components/BlackHole";

export const Hero = () => {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* 3D Background */}
            {/* 3D Background - Now Global */}
            {/* <BlackHole /> removed, handled by GlobalBackground */}

            {/* Fallback/Overlay Gradient for legibility */}
            <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent via-theme-black/20 to-theme-black pointer-events-none" />

            <div className="relative z-10 text-center px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm md:text-base font-medium tracking-[0.2em] text-white/60 mb-4 uppercase"
                >
                    DevCult
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-outfit font-medium tracking-tight text-white mb-6 text-glow"
                >
                    The Digital<br />Canvas
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-xl md:text-2xl font-light text-white/80 max-w-2xl mx-auto"
                >
                    Your vision, masterfully framed.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
        </section>
    );
};
