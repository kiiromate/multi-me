"use client";
import React, { useRef, useEffect } from "react";
import { useTheme } from "./theme-provider";
import p5Types from "p5";

export default function SpiralBackgroundAnimation() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const p5 = require("p5");
    const sketch = (s: p5Types) => {
      let f = 0;
      s.setup = () => {
        const canvas = s.createCanvas(s.windowWidth, s.windowHeight);
        if (sketchRef.current) {
          canvas.parent(sketchRef.current);
        }
        s.frameRate(30);
      };
      s.draw = () => {
        isDark ? s.fill(0, 20) : s.fill(255, 20);
        s.noStroke();
        s.rect(0, 0, s.width, s.height);
        s.translate(s.width / 2, s.height / 2);
        for (let a = 0; a < s.TWO_PI; a += s.PI / 128) {
          s.push();
          s.rotate(a);
          for (let i = 1; i > 0; i -= 0.005) {
            const x = s.noise(i - f, f / 3, a) * i * s.width;
            const y = s.noise(f / 2, i, a) * i * s.width;
            isDark
              ? s.stroke(255, 180 * (1 - i))
              : s.stroke(0, 180 * i);
            s.point(x, y);
          }
          s.pop();
        }
        f += 0.01;
      };
      s.windowResized = () => s.resizeCanvas(s.windowWidth, s.windowHeight);
    };
    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [isDark]);

  return (
    <div className="fixed inset-0 -z-10">
      <div ref={sketchRef}></div>
    </div>
  );
} 