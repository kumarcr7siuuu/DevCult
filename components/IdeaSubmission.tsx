"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, ArrowUp, Mic, X, FileText, Image as ImageIcon } from "lucide-react";
import { useState, useRef, ChangeEvent } from "react";
import { cn } from "@/lib/utils";

export const IdeaSubmission = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState<{ url: string | null; type: "image" | "file"; name: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file);
            setPreview({ url, type: "image", name: file.name });
        } else {
            setPreview({ url: null, type: "file", name: file.name });
        }
    };

    const clearPreview = () => {
        if (preview?.url) URL.revokeObjectURL(preview.url);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async () => {
        if (!message.trim() || !email.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    email,
                    files: preview ? [preview.name] : [],
                }),
            });

            if (response.ok) {
                setMessage("");
                clearPreview();
                alert("Thank you! Your idea has been submitted.");
            } else {
                alert("Failed to submit. Please try again.");
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-4 bg-theme-black">
            {/* Background Gradient */}
            <div
                className={cn(
                    "absolute inset-0 transition-opacity duration-1000 bg-theme-black",
                    isFocused ? "opacity-100" : "opacity-60"
                )}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-pink-600/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-radial-gradient from-theme-purple/5 to-transparent blur-3xl pointer-events-none" />
            </div>

            <div className="relative z-10 w-full max-w-2xl mx-auto space-y-8 text-center">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-light italic text-white/80 tracking-wide font-outfit"
                >
                    "You think, we hold the brush."
                </motion.h2>

                {/* Prompt Box Container */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    animate={{
                        boxShadow: isFocused ? "0 0 40px rgba(189, 0, 255, 0.15)" : "0 0 0 rgba(0,0,0,0)",
                        borderColor: isFocused ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"
                    }}
                    className={cn(
                        "w-full bg-[#1A1A1A] rounded-3xl p-4 text-left transition-colors duration-300",
                        "border border-white/10"
                    )}
                >
                    {/* Preview Section */}
                    <AnimatePresence>
                        {preview && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                className="mb-4 overflow-hidden"
                            >
                                <div className="relative inline-block group">
                                    {preview.type === "image" && preview.url ? (
                                        <img
                                            src={preview.url}
                                            alt="Preview"
                                            className="h-20 w-auto rounded-lg border border-white/10 object-cover"
                                        />
                                    ) : (
                                        <div className="h-20 w-20 rounded-lg border border-white/10 bg-white/5 flex flex-col items-center justify-center text-white/50">
                                            <FileText size={24} />
                                            <span className="text-[10px] mt-1 max-w-full px-1 truncate">{preview.name.slice(0, 8)}...</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={clearPreview}
                                        className="absolute -top-2 -right-2 bg-neutral-800 text-white rounded-full p-1 border border-white/20 shadow-lg hover:bg-neutral-700 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Input Area */}
                    <div className="relative mb-2">
                        <textarea
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask DevCult to create a landing page for..."
                            className="w-full bg-transparent text-lg text-white placeholder:text-gray-500 resize-none outline-none min-h-[60px]"
                        />
                    </div>

                    <div className="relative mb-4 px-1">
                        <input
                            type="email"
                            value={email}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email for updates..."
                            className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 outline-none border-t border-white/5 pt-3"
                        />
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*, .pdf, .doc, .docx"
                            />

                            <button
                                onClick={handleAttachClick}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                            >
                                <Paperclip size={16} />
                                <span>Attach</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsRecording(!isRecording)}
                                className={cn(
                                    "p-2 rounded-full transition-all duration-300",
                                    isRecording ? "bg-red-500/20 text-red-500 animate-pulse" : "hover:bg-white/10 text-gray-400 hover:text-white"
                                )}
                            >
                                <Mic size={20} />
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !message.trim() || !email.trim()}
                                className={cn(
                                    "p-2 rounded-full transition-all duration-300",
                                    (isFocused && message.trim() && email.trim()) ? "bg-white text-black hover:scale-110" : "bg-white/20 text-white/50 cursor-not-allowed"
                                )}
                            >
                                <ArrowUp size={20} className="stroke-[3]" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
