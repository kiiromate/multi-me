"use client";
import React, { ReactNode } from "react";
import LiquidGlass from "liquid-glass-react";

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  displacementScale?: number;
  blurAmount?: number;
  cornerRadius?: number;
  padding?: string;
}

export default function GlassContainer({
  children,
  className = "",
  displacementScale = 64,
  blurAmount = 0.15,
  cornerRadius = 24,
  padding = "2rem",
}: GlassContainerProps) {
  return (
    <LiquidGlass
      displacementScale={displacementScale}
      blurAmount={blurAmount}
      saturation={130}
      aberrationIntensity={2}
      elasticity={0.35}
      cornerRadius={cornerRadius}
      padding={padding}
      className={className}
    >
      {children}
    </LiquidGlass>
  );
} 