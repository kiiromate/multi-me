"use client";
import { useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import p5Types from "p5";

export default function LogoAnimation() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const isBlackOnWhite = theme === "light";

  useEffect(() => {
    // const p5 = require("p5"); // Removed require
    const sketch = (s: p5Types) => {
      s.setup = () => {
        const canvas = s.createCanvas(400, 400);
        if (sketchRef.current) {
          canvas.parent(sketchRef.current);
        }
        s.pixelDensity(s.displayDensity());
        s.textAlign(s.CENTER, s.CENTER);
        s.textSize(48);
        s.textFont("Arial");
        s.strokeWeight(4);
      };

      s.draw = () => {
        const bg = isBlackOnWhite ? 255 : 0;
        const fg = isBlackOnWhite ? 0 : 255;
        s.background(bg);
        s.stroke(fg);
        s.fill(fg);
        const cx = s.width / 2;
        const cy = s.height / 2;
        s.line(cx - 100, cy - 100, cx + 100, cy + 100);
        s.line(cx - 100, cy + 100, cx + 100, cy - 100);
        s.text("K", cx, cy - 120);
        s.text("A", cx + 120, cy);
        s.text("Z", cx, cy + 120);
        s.text("E", cx - 120, cy);
      };

      s.mousePressed = () => {
        if (s.mouseX > 0 && s.mouseX < s.width && s.mouseY > 0 && s.mouseY < s.height) {
          toggleTheme();
        }
      };
    };

    const p5Instance = new p5Types(sketch); // Used p5Types as constructor
    return () => p5Instance.remove();
  }, [isBlackOnWhite, toggleTheme]);

  return <div ref={sketchRef} className="mx-auto cursor-pointer" />;
} 