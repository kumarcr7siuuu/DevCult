"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Particles } from "@/components/BlackHole";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useLayoutEffect } from "react";
import * as THREE from "three";

// Bridge component to pass Framer Motion values to Three.js
function Scene({ scrollYProgress }: { scrollYProgress: any }) {
    const groupRef = useRef<THREE.Group>(null);

    // We can't use useTransform directly inside useFrame easily without motion-3d (which isn't installed).
    // So we'll use a mutable ref approach or get() the value.
    const smoothedProgress = useRef(0);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        const target = scrollYProgress.get(); // 0 to 1
        // Smooth step: Lerp current towards target (Heavy fluid feel)
        smoothedProgress.current = THREE.MathUtils.lerp(smoothedProgress.current, target, delta * 2.5);
        const progress = smoothedProgress.current;

        // Position Logic: Right (x=5) -> Center (x=0)
        // Direct linear interpolation based on scroll
        const x = 5 - (progress * 5);

        // Rotation Logic
        // 0.0 -> Tilted [0, 0, PI/4]
        // 1.0 -> Doughnut Face-on [PI/2, 0, 0] represents "Horizontal to screen"
        const startRotX = 0;
        const targetRotX = Math.PI / 2; // Exact 90 degrees for face-on circle

        const startRotZ = Math.PI / 4;
        const targetRotZ = 0;

        // Apply
        groupRef.current.position.x = x;
        groupRef.current.rotation.x = startRotX + (targetRotX - startRotX) * progress;
        groupRef.current.rotation.z = startRotZ + (targetRotZ - startRotZ) * progress;
    });

    return (
        <group ref={groupRef}>
            {/* Pass rotation via props or let the group handle it. 
                 The Particles component has internal rotation logic too (spinning), 
                 so we wrap it in a group that we position/orient. 
             */}
            <Particles />
        </group>
    );
}

export const GlobalBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none bg-theme-black">
            {/* Use a separate div for scroll tracking if needed, but 'fixed' might mess up useScroll target. 
                 Actually, useScroll with no target defaults to window scroll, which is perfect for this.
             */}
            <Canvas
                camera={{ position: [0, 0, 12], fov: 45 }}
                gl={{ antialias: false, alpha: true }}
                dpr={[1, 2]}
                className="w-full h-full"
            >
                <Scene scrollYProgress={scrollYProgress} />
                <fog attach="fog" args={['#050505', 5, 25]} />
            </Canvas>

            {/* Vignette Overlay for cinematic feel */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80 pointer-events-none" />
        </div>
    );
};
