"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Intro", href: "#intro" },
        { name: "Sidekick", href: "#sidekick" },
        { name: "Finance", href: "#finance" },
        { name: "B2B", href: "#b2b" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-6 flex items-start justify-start",
                "bg-transparent pointer-events-none"
            )}
        >
            {/* Logo Area - Pointer events enabled for clicking home */}
            <Link href="/" className="pointer-events-auto relative block">
                {/* DevCult Text Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
                        DEVCULT
                    </span>
                </div>
            </Link>

            {/* Top Right Navigation - Very Light Gray */}
            <div className="ml-auto pointer-events-auto flex gap-6 text-xs uppercase tracking-widest font-light">

            </div>
        </motion.nav>
    );
};
