"use client";
import { useEffect, useRef } from "react";
import p5Types from "p5";

export default function LoaderAnimation() {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p5 = require("p5");
    const sketch = (s: p5Types) => {
      let n = 36, t = 0;
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
    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div ref={sketchRef}></div>
    </div>
  );
} 