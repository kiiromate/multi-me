export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  mainImage: string
  content: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'What Building My Portfolio Taught Me About Systems Thinking',
    slug: 'systems-thinking-portfolio',
    excerpt: 'How a coding project became a masterclass in systems thinking, feedback loops, and connecting the dots.',
    publishedAt: '2025-06-13',
    mainImage: '/images/blog/systems-thinking.jpg',
    content: `# What Building My Portfolio Taught Me About Systems Thinking  

*I thought I was just making a website. Turns out, I was designing my own decision-making blueprint.*  

Building my portfolio started as a "simple" coding project. But between perfecting CSS animations and debating color palettes, I accidentally enrolled in a masterclass on **systems thinking**. Here's what I learned:  

---

### **1. Complexity is just a bunch of simple things stacked together**  
*"Like cleaning a messy room by starting with one sock."*  

My initial checklist was overwhelming: animations, CMS integration, SEO, performance targets. It felt like solving a Rubik's Cube while juggling. Then I remembered: **break chaos into bite-sized systems**.  

I split the project into phases (shoutout to my [PRD roadmap](enhanced-prd.md#development-roadmap)):  
1. **Foundation**: Next.js setup, Sanity.io integration, basic pages.  
2. **Visuals**: GSAP animations, P5.js generative art.  
3. **Content**: Blog templates, data visualizations.  
4. **Optimization**: Performance tweaks, accessibility fixes.  

**Takeaway**: Complexity isn't the enemy—*disorganization* is. Whether coding or planning a wedding, start small. One sock at a time.  

---

### **2. Feedback loops are your friend**  
*"Why did that animation make my laptop sound like a jet engine?"*  

Early on, I built a slick theme-switching animation. It looked *chef's kiss*… until performance metrics tanked. My Lighthouse score plummeted. Lesson learned: **"delightful" and "functional" aren't always friends**.  

I iterated:  
- Added \`prefers-reduced-motion\` fallbacks.  
- Offloaded heavy computations to Web Workers.  
- Ruthlessly optimized CSS.  

**Takeaway**: Systems thinking isn't about perfection—it's about creating processes that let you *learn as you go*.  

---

### **3. Style without purpose is just noise**  
*"That animation isn't just pretty—it's a silent salesperson."*  

Every design choice had a *why*:  
- **Dual light/dark theme**: Demonstrates responsive coding skills.  
- **Magnetic buttons**: Guides attention without arrows.  
- **Generative art backgrounds**: Showcases creativity *and* technical chops.  

**Takeaway**: Form follows function. Whether designing a website or a presentation, ask: *What's this element *doing*?*  

---

### **4. Everything connects**  
*"Turns out, CSS and bee conservation have a lot in common."*  

Building this portfolio wasn't just a tech challenge—it was a puzzle of disciplines:  
- Writing blog content influenced SEO and Sanity.io schemas.  
- Designing animations impacted performance budgets and frontend optimization.  
- Data visualizations required merging design and code.  

**Takeaway**: Skills are transferable. Code, design, storytelling—they're different languages, but they all solve problems holistically.  

---

### **Closing: Systems Thinking is a Life Skill**  
Building this website taught me that systems thinking isn't a buzzword—it's how I naturally operate. It's why I can code a React component *and* write a blog post *and* explain my process over coffee.  

Next time you're overwhelmed by a project, remember: **Trust the process**. Embrace feedback loops. And know that even the smallest detail (like a well-placed CSS transition) can ripple into something bigger.  

After all, life's just one big system of interconnected "socks." And hey—if all else fails, there's always coffee. ☕  

---  
**P.S.** Want to see the final product? Swing by [Portfolio Link] and say hi!`,
    tags: ['systems thinking', 'portfolio', 'process', 'web development'],
  },
] 