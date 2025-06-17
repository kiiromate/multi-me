"use client";
import { useEffect, useRef } from "react";
import p5Types from "p5";

export default function LoaderAnimation() {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use the imported p5Types directly as the constructor
    const sketch = (s: p5Types) => {
      const n = 36; // Changed to const
      let t = 0; // t is reassigned, so it stays let
      s.setup = () => {
        const canvas = s.createCanvas(300, 300);
        if (sketchRef.current) {
          canvas.parent(sketchRef.current);
        }
        s.frameRate(60);
        s.noFill();
        s.stroke(255, 150);
        s.strokeWeight(1.5);
      };
      s.draw = () => {
        s.background(0, 60);
        s.translate(s.width / 2, s.height / 2);
        s.rotate(t * 0.01);
        for (let k = 0; k < n; k++) {
          s.push();
          s.rotate((s.TWO_PI / n) * k);
          for (let i = 0; i < 300; i += 30) {
            s.circle(i / 2 + s.sin(t * 0.05) * 10, 0, i * 0.6);
          }
          s.pop();
        }
        t++;
      };
    };

    const p5Instance = new p5Types(sketch);
    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div ref={sketchRef}></div>
    </div>
  );
} 