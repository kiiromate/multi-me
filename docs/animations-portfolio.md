Here's a`.md` file with all React + TailwindCSS + p5.js animation components, clearly labeled for my portfolio use case. This includes the **loader**, **hero/home animation**, **background animation**, and the **refactored logo component** — all ready for full-screen integration with **LiquidGlass** layering.

---

````md
# ✨ Portfolio Animation Snippets (React + Tailwind + p5.js)

This document contains **modular, reusable animations** tailored for your Next.js + TailwindCSS portfolio. Each animation is designed to run **full screen** with your content overlaid using `liquid-glass-react`.

---

## 1️⃣ LoaderAnimation.jsx (Full-Screen Loader)

🟢 Use: At initial load or between route changes.

```jsx
"use client";
import { useEffect, useRef } from "react";

export default function LoaderAnimation() {
  const sketchRef = useRef();

  useEffect(() => {
    const p5 = require("p5");
    const sketch = (s) => {
      let n = 36, t = 0;
      s.setup = () => {
        s.createCanvas(300, 300).parent(sketchRef.current);
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
````

---

## 2️⃣ HeroAnimation.jsx (Home/About Pages)

🟢 Use: As full-screen animated background for hero section.

```jsx
"use client";
import { useEffect, useRef } from "react";

export default function HeroAnimation() {
  const sketchRef = useRef();

  useEffect(() => {
    const p5 = require("p5");
    const sketch = (s) => {
      let n = 50, t = 400;
      s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight).parent(sketchRef.current);
        s.frameRate(60);
        s.noFill();
      };
      s.draw = () => {
        s.background(0);
        s.stroke(255, 99);
        s.translate(s.width / 2, s.height / 2);
        for (let k = 0; k < n; k++) {
          s.rotate(s.TWO_PI / n);
          for (let i = 0; i < 800; i += 50) {
            s.circle(i / 2 + t, 0, i);
          }
        }
        t -= 1;
      };
      s.windowResized = () => s.resizeCanvas(s.windowWidth, s.windowHeight);
    };
    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div ref={sketchRef}></div>
    </div>
  );
}
```

---

## 3️⃣ SpiralBackgroundAnimation.jsx (Other Pages)

🟢 Use: Full background animation on all remaining pages.  
🌓 Syncs with system light/dark mode.

```jsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function SpiralBackgroundAnimation() {
  const sketchRef = useRef();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateTheme = () => setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    updateTheme();
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", updateTheme);
    return () => mql.removeEventListener("change", updateTheme);
  }, []);

  useEffect(() => {
    const p5 = require("p5");
    const sketch = (s) => {
      let f = 0;
      s.setup = () => {
        s.createCanvas(s.windowWidth, s.windowHeight).parent(sketchRef.current);
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
```

---

## 4️⃣ LogoAnimation.jsx (Interactive Logo Component)

🟢 Use: In branding sections or as clickable site logo.

```jsx
"use client";
import { useRef, useEffect, useState } from "react";

export default function LogoAnimation() {
  const sketchRef = useRef();
  const [isBlackOnWhite, setIsBlackOnWhite] = useState(true);

  useEffect(() => {
    const p5 = require("p5");
    const sketch = (s) => {
      s.setup = () => {
        s.createCanvas(400, 400).parent(sketchRef.current);
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

      s.mousePressed = () => setIsBlackOnWhite((prev) => !prev);
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [isBlackOnWhite]);

  return <div ref={sketchRef} className="mx-auto" />;
}
```

---

## 💧 LiquidGlass Integration Example

Wrap content in animated sections using:

```jsx
import LiquidGlass from "liquid-glass-react";

<LiquidGlass
  displacementScale={64}
  blurAmount={0.15}
  saturation={130}
  aberrationIntensity={2}
  elasticity={0.35}
  cornerRadius={24}
  padding="2rem"
>
  <div className="text-white space-y-4">
    <h1 className="text-3xl font-bold">Welcome to SukuSuku</h1>
    <p>Tech-enabled laundry for Kigali households</p>
  </div>
</LiquidGlass>
```

---

## 🧠 General Notes

- All animations are full-screen via `fixed inset-0 -z-10`
    
- Overlay content with Tailwind utilities and `<LiquidGlass />`
    
- Theme auto-sync enabled for background animation
    
