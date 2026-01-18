"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Branch {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  angle: number;
  length: number;
  maxLength: number;
  growthSpeed: number;
  lifeSpan: number;
  maxLifeSpan: number;
  opacity: number;
  children: Branch[];
  depth: number;
  hasSpawned: boolean;
}

const MAX_DEPTH = 3;
const MAX_BRANCHES = 150; // Reduced from 250
const BRANCH_ANGLES = [30, 45, 60]; // Fixed geometric angles in degrees
const SPAWN_CHANCE = 0.008; // 0.8% chance per frame (reduced from 1.5%)
const GROWTH_SPEED = 1.2; // pixels per frame (reduced from 1.5)
const FADE_SPEED = 0.008; // opacity decrease per frame (reduced from 0.01)
const MOUSE_THROTTLE = 150; // ms between new root branches

export function AntlerMouseEffect() {
  const { theme, resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const branchesRef = useRef<Branch[]>([]);
  const animationFrameRef = useRef<number>();
  const mousePositionRef = useRef<{ x: number; y: number; angle: number } | null>(null);
  const lastMousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const lastBranchTimeRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      
      // Calculate mouse movement angle
      let angle = Math.random() * Math.PI * 2; // Default random angle
      if (lastMousePositionRef.current) {
        const dx = currentX - lastMousePositionRef.current.x;
        const dy = currentY - lastMousePositionRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) { // Only calculate angle if mouse moved significantly
          angle = Math.atan2(dy, dx);
        }
      }
      
      mousePositionRef.current = { x: currentX, y: currentY, angle };
      lastMousePositionRef.current = { x: currentX, y: currentY };

      // Create a new root branch at mouse position (throttled)
      const now = Date.now();
      if (
        branchesRef.current.length < MAX_BRANCHES &&
        now - lastBranchTimeRef.current > MOUSE_THROTTLE
      ) {
        lastBranchTimeRef.current = now;
        const newBranch: Branch = {
          startX: currentX,
          startY: currentY,
          endX: currentX,
          endY: currentY,
          angle,
          length: 0,
          maxLength: 60 + Math.random() * 90, // Random length between 60-150px
          growthSpeed: GROWTH_SPEED + Math.random() * 0.5,
          lifeSpan: 1,
          maxLifeSpan: 3 + Math.random() * 1.5, // 3-4.5 seconds (longer lifespan)
          opacity: 0.7,
          children: [],
          depth: 0,
          hasSpawned: false,
        };
        branchesRef.current.push(newBranch);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeBranches: Branch[] = [];

      // Update and draw all branches
      branchesRef.current.forEach((branch) => {
        // Grow the branch
        if (branch.length < branch.maxLength) {
          branch.length += branch.growthSpeed;
          branch.endX = branch.startX + Math.cos(branch.angle) * branch.length;
          branch.endY = branch.startY + Math.sin(branch.angle) * branch.length;
        }

        // Spawn child branches (recursive branching)
        // Allow multiple children but with throttling based on growth progress
        if (
          branch.depth < MAX_DEPTH &&
          branch.length > branch.maxLength * 0.35 && // Start spawning after 35% growth (reduced frequency)
          Math.random() < SPAWN_CHANCE &&
          branchesRef.current.length < MAX_BRANCHES
        ) {
          // Limit number of children per branch based on depth (reduced)
          const maxChildren = branch.depth === 0 ? 2 : branch.depth === 1 ? 1 : 1;
          if (branch.children.length < maxChildren) {
            // Choose a random fixed angle from BRANCH_ANGLES
            const angleOffset =
              (BRANCH_ANGLES[Math.floor(Math.random() * BRANCH_ANGLES.length)] *
                Math.PI) /
              180;
            const childAngle =
              branch.angle + (Math.random() > 0.5 ? angleOffset : -angleOffset);

            const childBranch: Branch = {
              startX: branch.endX,
              startY: branch.endY,
              endX: branch.endX,
              endY: branch.endY,
              angle: childAngle,
              length: 0,
              maxLength: branch.maxLength * (0.35 + Math.random() * 0.35), // 35-70% of parent
              growthSpeed: branch.growthSpeed * 0.85, // Slightly slower
              lifeSpan: 1,
              maxLifeSpan: branch.maxLifeSpan * 0.85,
              opacity: branch.opacity * 0.75, // Slightly more transparent
              children: [],
              depth: branch.depth + 1,
              hasSpawned: false,
            };

            branch.children.push(childBranch);
            branchesRef.current.push(childBranch);
          }
        }

        // Update lifespan and opacity
        branch.lifeSpan -= 0.016; // ~60fps
        branch.opacity = Math.max(0, branch.opacity - FADE_SPEED);

        // Only keep branches that are still visible
        if (branch.opacity > 0 && branch.lifeSpan > 0) {
          activeBranches.push(branch);

          // Draw the branch
          ctx.save();
          // Use white for dark mode, dark gray for light mode
          const isDark = resolvedTheme === "dark" || 
            (resolvedTheme === undefined && theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);
          const strokeColor = isDark 
            ? `rgba(255, 255, 255, ${branch.opacity * 0.6})` // White with opacity for dark mode
            : `rgba(17, 24, 39, ${branch.opacity})`; // Dark gray with opacity for light mode
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = Math.max(1, 2 - branch.depth * 0.3); // Thinner for deeper branches
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.beginPath();
          ctx.moveTo(branch.startX, branch.startY);
          ctx.lineTo(branch.endX, branch.endY);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Update branches array
      branchesRef.current = activeBranches;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ background: "transparent" }}
    />
  );
}
