"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureSectionProps {
    title: string;      // Category (Small Uppercase)
    headline: string;   // Main Title (Big H2)
    description: string;
    imageUrl?: string;
    align?: "left" | "right";
    id?: string;
}

export const FeatureSection = ({
    title,
    headline,
    description,
    imageUrl,
    align = "left",
    id,
}: FeatureSectionProps) => {

    return (
        <section
            id={id}
            className="min-h-screen py-24 px-6 md:px-20 relative flex items-center justify-center overflow-hidden"
        >
            <div className={cn(
                "max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10",
                align === "right" ? "md:grid-flow-dense" : ""
            )}>
                {/* Text Content */}
                <div className={cn("space-y-8", align === "right" ? "md:col-start-2" : "")}>
                    <motion.div
                        initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <span className="text-sm font-bold tracking-widest text-theme-purple uppercase mb-4 block">
                            {title}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                            {headline}
                        </h2>
                        <p className="text-lg text-white/60 leading-relaxed">
                            {description}
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-2 text-white font-semibold border-b border-white/20 pb-1 hover:border-white transition-colors w-fit"
                    >
                        View Project
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </motion.div>
                </div>

                {/* Visual Content */}
                <div className={cn("relative aspect-square md:aspect-[4/3] group cursor-pointer", align === "right" ? "md:col-start-1" : "")}>
                    <motion.div
                        className={cn(
                            "absolute inset-0 rounded-3xl overflow-hidden flex items-center justify-center",
                            "border border-white/10 shadow-2xl transition-all duration-700 group-hover:shadow-theme-purple/20 group-hover:scale-[1.02]"
                        )}
                    >
                        {imageUrl ? (
                            <>
                                <img
                                    src={imageUrl}
                                    alt={headline}
                                    className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110"
                                />
                                {/* Overlay for text readability (Darkens image slightly) */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                                {/* Noise Texture */}
                                <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                            </>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50" />
                        )}

                        {/* Arrow Reveal */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                                <span className="text-2xl">→</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
