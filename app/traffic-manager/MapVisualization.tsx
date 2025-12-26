"use client";

import React, { useEffect, useRef } from "react";
import { TrafficManager, Node, Edge } from "./simulation";

export function MapVisualization() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const managerRef = useRef<TrafficManager | null>(null);

    useEffect(() => {
        if (!typeof window) return;

        // Init Manager
        if (!managerRef.current) {
            managerRef.current = new TrafficManager(30, 80); // 30 Nodes, 80 Agents
        }

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (!canvas || !ctx) return;

        let animationFrameId: number;

        const render = () => {
            if (!containerRef.current) return;

            const { width, height } = containerRef.current.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;

            // Tick Simulation
            managerRef.current?.tick();

            // Clear
            ctx.fillStyle = "#0a0a0a"; // Dark background
            ctx.fillRect(0, 0, width, height);

            // Draw Edges (3-Zone Color)
            managerRef.current?.edges.forEach(edge => {
                const startX = (edge.startNode.x / 100) * width;
                const startY = (edge.startNode.y / 100) * height;
                const endX = (edge.endNode.x / 100) * width;
                const endY = (edge.endNode.y / 100) * height;

                const grad = ctx.createLinearGradient(startX, startY, endX, endY);

                // Color Logic based on Load
                // Green (Low) -> Orange (Med) -> Red (High)
                // We define 3 stops: 0 (Start), 0.5 (Mid), 1 (End)

                const getColor = (load: number) => {
                    if (load > 2) return "rgba(239, 68, 68, 1)"; // Red
                    if (load > 0) return "rgba(234, 179, 8, 0.8)"; // Yellow/Orange
                    return "rgba(34, 197, 94, 0.3)"; // Green (faint)
                };

                grad.addColorStop(0.1, getColor(edge.loadStart));   // Start Zone
                grad.addColorStop(0.5, getColor(edge.loadMiddle));  // Middle Zone
                grad.addColorStop(0.9, getColor(edge.loadEnd));     // End Zone

                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            });

            // Draw Nodes (Optional, maybe small dots)
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            managerRef.current?.nodes.forEach(node => {
                const x = (node.x / 100) * width;
                const y = (node.y / 100) * height;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Agents
            ctx.fillStyle = "#FFFFFF";
            managerRef.current?.users.forEach(user => {
                if (user.currentEdge) {
                    const u = user.currentEdge.startNode;
                    const v = user.currentEdge.endNode;

                    const p = user.progress;
                    const x = ((u.x + (v.x - u.x) * p) / 100) * width;
                    const y = ((u.y + (v.y - u.y) * p) / 100) * height;

                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2); // Small white dot
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[400px] relative rounded-lg overflow-hidden border border-white/10 bg-black/50 shadow-2xl">
            <canvas ref={canvasRef} className="absolute inset-0 block" />

            {/* Overlay UI for context */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/50">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Free Flow
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/50">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Moderate
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/50">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Congestion (Values boosted)
                </div>
            </div>
        </div>
    );
}
