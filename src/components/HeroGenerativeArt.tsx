"use client"
import dynamic from "next/dynamic"
import { useTheme } from "./ThemeProvider"
import React from "react"

const Sketch = dynamic(() => import("react-p5").then(mod => mod.default), { ssr: false })

export default function HeroGenerativeArt() {
  const { theme } = useTheme()

  // Spiral animation inspired by user p5.js code
  const setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(p5.windowWidth, 400).parent(canvasParentRef)
    p5.frameRate(30)
    p5.background(theme === "dark" ? 0 : 255)
  }

  let f = 0
  const draw = (p5: any) => {
    if (theme === "dark") {
      p5.fill(0, 20)
    } else {
      p5.fill(255, 20)
    }
    p5.noStroke()
    p5.rect(0, 0, p5.width, p5.height)
    p5.translate(p5.width / 2, p5.height / 2)
    for (let a = 0; a < p5.TWO_PI; a += p5.PI / 128) {
      p5.push()
      p5.rotate(a)
      for (let i = 1; i > 0; i -= 0.005) {
        let x = p5.noise(i - f, f / 3, a) * i * p5.width * 0.5
        let y = p5.noise(f / 2, i, a) * i * p5.width * 0.5
        if (theme === "dark") {
          p5.stroke(255, 180 * (1 - i))
        } else {
          p5.stroke(0, 180 * i)
        }
        p5.point(x, y)
      }
      p5.pop()
    }
    f += 0.01
  }

  const windowResized = (p5: any) => {
    p5.resizeCanvas(p5.windowWidth, 400)
  }

  return (
    <div className="w-full h-[400px] relative z-0 overflow-hidden rounded-xl shadow-lg">
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
    </div>
  )
} 