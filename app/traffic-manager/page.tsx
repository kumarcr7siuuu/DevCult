"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { GlobalBackground } from "@/components/GlobalBackground";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Network, Shield, Zap } from "lucide-react";
import React from "react";
import { MapVisualization } from "./MapVisualization";

export default function TrafficManagerPage() {
    return (
        <main className="min-h-screen bg-theme-black text-white selection:bg-theme-purple/30 relative">
            <GlobalBackground />

            <div className="relative z-10 font-sans">
                <Navbar />

                {/* Back Button */}
                <div className="fixed top-24 left-8 z-50">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs"
                    >
                        <ArrowLeft size={16} /> Back
                    </Link>
                </div>

                {/* HERO SECTION */}
                <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 lg:px-20 pt-32 lg:pt-0 gap-12">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 space-y-8"
                    >
                        <div className="flex gap-8 text-white/40 font-mono text-sm uppercase tracking-wider">
                            <span>Algorithm</span>
                            <span>Simulation</span>
                            <span>2025</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
                            ANONYMOUS <br />
                            <span className="italic font-light">FLOW</span>
                        </h1>

                        <p className="text-xl text-white/60 max-w-lg leading-relaxed">
                            Decentralized traffic optimization using a 3-Zone edge model.
                            Reducing congestion without compromising identity.
                        </p>

                        <div className="flex gap-4">
                            <Link
                                href="#"
                                target="_blank"
                                className="px-8 py-4 bg-white text-black rounded-full font-bold tracking-wide hover:scale-105 transition-transform flex items-center gap-2"
                            >
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                View Source
                            </Link>
                            <Link
                                href="#"
                                target="_blank"
                                className="px-8 py-4 border border-white/30 text-white rounded-full font-bold tracking-wide hover:bg-white/10 transition-colors flex items-center gap-2"
                            >
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current"><title>Figma</title><path d="M8.4 0C5.968 0 4 1.968 4 4.4v2.4c0 2.432 1.968 4.4 4.4 4.4H12c0 2.432-1.968 4.4-4.4 4.4-2.432 0-4.4-1.968-4.4-4.4 0-1.536.832-2.928 2.08-3.744.48-.32.64-1.12.16-1.6-.48-.48-1.28-.48-1.76 0C1.84 6.848 0 9.216 0 12c0 4.416 3.584 8 8 8 4.416 0 8-3.584 8-8v-3.2l2.352-2.352c1.056-1.056 1.056-2.768 0-3.824-1.056-1.056-2.768-1.056-3.824 0l-2.528 2.528V4.4C12 1.968 10.432 0 8.4 0zm3.6 15.2v5.6c0 1.768-1.432 3.2-3.2 3.2-1.768 0-3.2-1.432-3.2-3.2 0-1.768 1.432-3.2 3.2-3.2h3.2z" /></svg>
                                Figma
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Live Visualization (Replaces Phone Mockup) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 relative w-full h-[500px] flex justify-center items-center"
                    >
                        <MapVisualization />
                    </motion.div>
                </section>



                {/* FEATURE SHOWCASE */}
                <section className="py-32 px-4 min-h-[120vh] flex flex-col items-center justify-center">
                    <div className="max-w-7xl mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-24 text-center md:text-left"
                        >
                            <h2 className="text-5xl md:text-7xl font-sans font-bold mb-6">
                                SMART <br />
                                <span className="text-white/30">ROUTING</span>
                            </h2>
                            <p className="text-white/60 max-w-xl text-lg md:mx-0 mx-auto">
                                Autonomous agents make decisions based on real-time, decentralized feedback.
                            </p>
                        </motion.div>

                        <InteractiveShowcase />
                    </div>
                </section>
            </div>
        </main>
    );
}

function InteractiveShowcase() {
    const [activeIndex, setActiveIndex] = React.useState<number>(1);

    const features = [
        {
            title: "3-Zone Model",
            description: "Splits roads into Merge, Cruise, and Conflict zones for realistic penalty calculation.",
            icon: <Network size={48} className="text-blue-400" />,
            tag: "Physics",
            id: 0
        },
        {
            title: "Anonymous",
            description: "No persistent tracking. Agents are anonymous entities optimizing only for time.",
            icon: <Shield size={48} className="text-emerald-400" />,
            tag: "Privacy",
            id: 1,
            highlight: true
        },
        {
            title: "Bidirectional A*",
            description: "Converging search frontiers for massively faster pathfinding on large graphs.",
            icon: <Zap size={48} className="text-amber-400" />,
            tag: "Speed",
            id: 2
        }
    ];

    // "Cover Flow" / "Antenna" Hybrid Logic
    const getVariants = (index: number) => {
        const offset = index - activeIndex;
        const isActive = offset === 0;

        const xSpacing = 220; // Wider for cards
        const scaleStep = 0.15;
        const zBase = 50;

        const x = offset * xSpacing;
        const scale = 1 - (Math.abs(offset) * scaleStep);
        const zIndex = zBase - Math.abs(offset);
        const opacity = isActive ? 1 : 0.6;
        const blur = isActive ? 0 : 4;

        return {
            x,
            scale,
            zIndex,
            opacity,
            filter: `blur(${blur}px)`,
            cursor: isActive ? "grab" : "pointer",
        };
    };

    return (
        <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000 overflow-hidden text-left">
            {features.map((feature, index) => (
                <motion.div
                    key={feature.id}
                    layout
                    variants={{
                        animate: (i: number) => getVariants(i)
                    }}
                    custom={index}
                    initial="animate"
                    animate="animate"
                    whileTap={{ cursor: "grabbing" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipeThreshold = 50;
                        if (offset.x > swipeThreshold) {
                            // Swipe Right -> Previous (decrement index)
                            setActiveIndex((prev) => Math.max(0, prev - 1));
                        } else if (offset.x < -swipeThreshold) {
                            // Swipe Left -> Next (increment index)
                            setActiveIndex((prev) => Math.min(features.length - 1, prev + 1));
                        }
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute w-[300px] h-[400px] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between cursor-pointer origin-center touch-pan-y"
                    onClick={() => setActiveIndex(index)}
                >
                    <div>
                        <div className="mb-6">{feature.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-white/60">{feature.description}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/30">{feature.tag}</span>
                        {feature.highlight && (
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        )}
                    </div>
                </motion.div>
            ))}

            {/* Top Fade Gradient */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-theme-black to-transparent z-40 pointer-events-none" />

            {/* Bottom Fade Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-theme-black to-transparent z-40 pointer-events-none" />
        </div>
    );
}

