"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export function Particles(props: any) {
    const ref = useRef<THREE.Points>(null);

    // Generate particles in a black hole / swirling formation
    const [positions, outputColor] = useMemo(() => {
        const count = 5000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            // Radius: More particles near the center (event horizon), fewer further out
            const r = Math.pow(Math.random(), 3) * 10 + 2;
            // Angle: random around the circle
            const theta = Math.random() * 2 * Math.PI;

            // ... (rest of coord logic same) ...

            // Convert to Cartesian
            let x = r * Math.cos(theta);
            let y = (Math.random() - 0.5) * (r * 0.2); // Flattened disk
            let z = r * Math.sin(theta);

            // Add some random noise
            x += (Math.random() - 0.5) * 0.2;
            y += (Math.random() - 0.5) * 0.1;
            z += (Math.random() - 0.5) * 0.2;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Color gradient: Inner Bright Blue -> Outer Deep Blue/Purple
            const colorScale = Math.max(0, 1 - (r / 12)); // 1 at center, 0 at edge

            let mixedColor;
            if (r < 4) {
                // Hot inner ring (Cyan/Bright Blue)
                mixedColor = color.setHSL(0.55, 1, 0.8);
            } else if (r < 7) {
                // Middle ring (Deep Blue)
                mixedColor = color.setHSL(0.6, 1, 0.5);
            } else {
                // Outer ring (Dark Blue/Indigp)
                mixedColor = color.setHSL(0.65, 1, 0.1 * colorScale);
            }

            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }
        return [positions, colors];
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            // Rotate the entire system - SLOWER Speed
            ref.current.rotation.y -= delta * 0.05;
            // Pulse effect (breathing)
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} colors={outputColor} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.035}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export function BlackHole() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            <Canvas
                camera={{ position: [0, 3, 10], fov: 45 }}
                gl={{ antialias: false, alpha: true }}
                dpr={[1, 2]} // Optimize for pixel density
            >
                <Particles />
                <fog attach="fog" args={['#000000', 5, 20]} />
            </Canvas>
        </div>
    );
}
