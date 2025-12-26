"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export const ParallaxTransition = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Increased distinct parallax range
    const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // SVG Filter for organic "Torn Paper" edge
    // We render an SVG with turbulence and use it as a mask

    return (
        <div className="relative w-full h-[80vh] flex items-center justify-center my-20 overflow-hidden">

            {/* The SVG Filter Definition (Hidden) */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="torn-paper-filter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
                    </filter>

                    {/* Define a mask using the filter */}
                    <mask id="torn-edge-mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white" filter="url(#torn-paper-filter)" />
                    </mask>
                </defs>
            </svg>

            {/* Container using the Mask */}
            <motion.div
                ref={containerRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    // Using standard CSS mask property with an SVG resource
                    // NOTE: This can be tricky in some browsers, so we'll fallback to a simpler "Rough Path" SVG separation if filters fail.
                    // Actually, a simpler robust way for "Torn Paper" in React/CSS is a textured image mask.
                    // Given the user wants "Professional", let's use a high-quality SVG Path for the mask instead of a filter which might look like "glitch".

                    // Let's use `mask-image` with a radial gradient to soften edges + a custom clip-path that is less "sawtooth" and more "paper".
                    maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)"
                }}
            >
                {/* 
                    "Natural" Torn Edge Overlay 
                    This SVG sits on top to visually cut the image with a rough path.
                 */}
                <div className="absolute top-0 left-0 w-full h-16 z-20 bg-theme-black"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 20' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 L0 0 L100 0 L100 20 C90 15 80 25 70 18 C60 12 50 22 40 15 C30 10 20 20 10 15 Z' fill='black'/%3E%3C/svg%3E\")" }}>
                </div>

                <motion.div
                    style={{ y, scale, opacity }}
                    className="absolute inset-0 z-0 bg-theme-black"
                >
                    <Image
                        src="/nebula.jpg"
                        alt="Nebula Transition"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    {/* Top and Bottom Rough Edges (SVG Images acting as borders) */}
                    {/* We place an SVG that looks like a torn black paper ON TOP of the image at top/bottom */}

                    {/* Top Tear */}
                    <div className="absolute top-0 left-0 right-0 h-24 z-10 -mt-1 scale-y-[-1]">
                        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full text-theme-black fill-current">
                            <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                    </div>

                    {/* Bottom Tear */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 z-10 -mb-1">
                        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full text-theme-black fill-current">
                            <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-theme-black/80 via-transparent to-theme-black/80 mix-blend-multiply" />
                </motion.div>
            </motion.div>

            <div className="relative z-10 text-center pointer-events-none">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-white/90 tracking-[0.2em] text-xl md:text-2xl uppercase font-light drop-shadow-lg leading-relaxed"
                >
                    welcome to your, <br />
                    <span className="font-serif italic text-white text-4xl md:text-6xl capitalize tracking-normal block mt-2">Imagination</span>
                </motion.p>
            </div>
        </div>
    );
};
