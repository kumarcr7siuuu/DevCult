"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TimerPage() {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isCalculated, setIsCalculated] = useState(false);

    useEffect(() => {
        // Target Date: January 1, 2026 00:00:00
        const targetDate = new Date("2026-01-01T00:00:00");

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                // Redirect if time is up
                router.push("/");
                return null;
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        // Initial calculation
        const initialTime = calculateTimeLeft();
        if (initialTime) {
            setTimeLeft(initialTime);
            setIsCalculated(true);
        }

        // Interval for countdown
        const timer = setInterval(() => {
            const updatedTime = calculateTimeLeft();
            if (updatedTime) {
                setTimeLeft(updatedTime);
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    if (!isCalculated) {
        return null; // Or a loading spinner
    }

    return (
        <div className="relative h-screen w-full overflow-hidden text-white font-sans">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/reveal-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                <h1 className="text-2xl md:text-4xl lg:text-5xl mb-8 tracking-widest font-light text-gray-200">
                    Hold your Imagination for
                </h1>

                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Minutes" />
                    <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
            </div>
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center p-4 min-w-[100px] md:min-w-[140px]">
            <span className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                {value.toString().padStart(2, "0")}
            </span>
            <span className="text-sm md:text-base uppercase tracking-wider text-gray-300 mt-2">
                {label}
            </span>
        </div>
    );
}
