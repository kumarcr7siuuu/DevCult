"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-black selection:bg-gray-200 relative">
            <Navbar />

            <div className="container mx-auto px-6 md:px-12 py-24 grid md:grid-cols-2 gap-16 min-h-screen items-start">
                {/* Left Column - Quote & Large "about" */}
                <div className="flex flex-col justify-between md:min-h-[70vh]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <p className="text-2xl md:text-3xl font-light text-gray-600 leading-relaxed">
                            " Minimal design, enhanced by details and materials "
                        </p>
                        <p className="text-sm text-gray-400 uppercase tracking-widest">
                            MOTTO
                        </p>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[12rem] md:text-[16rem] font-bold tracking-tighter leading-none text-gray-900 mt-auto"
                    >
                        about
                    </motion.h1>
                </div>

                {/* Right Column - Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-12 pt-12 md:pt-0"
                >
                    {/* Description */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-medium leading-tight">
                            Product and industrial designer based in Florence, focused on creating complete product experiences.
                        </h2>

                        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                            I believe in the minimal and essential approach, expressed through the search for a balance between form, function and meaning. Through the enhancement of details and the research of materials, I create products characterized by their own formal and aesthetic identity, expressed through the complexity of the form and the correlation of the concept, placing the user experience and communication at the center of development.
                        </p>
                    </div>

                    {/* Profile Image */}
                    <div className="w-full max-w-sm mx-auto md:mx-0">
                        <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden border border-gray-200">
                            {/* Placeholder for profile image */}
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                Profile Image
                            </div>
                        </div>
                    </div>

                    {/* Work Experience */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold">Work Experience</h3>

                        <div className="space-y-6">
                            {/* Experience 1 */}
                            <div className="space-y-2 border-l-2 border-gray-200 pl-4">
                                <h4 className="text-lg font-medium">DevCult</h4>
                                <p className="text-sm text-gray-500">May 2023 - Present</p>
                                <p className="text-gray-600 leading-relaxed">
                                    Freelance Product Designer focused on developing complete product experiences through research, development of concepts, ideas and projects, creation of 3D models, product rendering and presentation.
                                </p>
                            </div>

                            {/* Experience 2 */}
                            <div className="space-y-2 border-l-2 border-gray-200 pl-4">
                                <h4 className="text-lg font-medium">Tech Studio</h4>
                                <p className="text-sm text-gray-500">Jan 2022 - Present</p>
                                <p className="text-gray-600 leading-relaxed">
                                    Collaboration with design studio, participating in every phase of the project development, starting from the research and development phase of the concept, passing through the creation of the 3D model, rendering and presentation of the product.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6 pt-8">
                        <Link href="https://linkedin.com" className="text-gray-400 hover:text-gray-900 transition-colors text-sm uppercase tracking-wider">
                            LinkedIn
                        </Link>
                        <Link href="https://behance.net" className="text-gray-400 hover:text-gray-900 transition-colors text-sm uppercase tracking-wider">
                            Behance
                        </Link>
                        <Link href="https://instagram.com" className="text-gray-400 hover:text-gray-900 transition-colors text-sm uppercase tracking-wider">
                            Instagram
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Additional routes in top right if needed */}
            <div className="fixed top-6 right-6 z-50 flex gap-6 text-xs uppercase tracking-widest text-gray-400">
                <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                <Link href="/about" className="hover:text-gray-900 transition-colors font-medium text-gray-900">About</Link>
                <Link href="#contact" className="hover:text-gray-900 transition-colors">Contact</Link>
                <Link href="#works" className="hover:text-gray-900 transition-colors">Works</Link>
            </div>
        </main>
    );
}
