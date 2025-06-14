export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  mainImage: string
  technologies: string[]
  liveUrl?: string
  repoUrl?: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Data Storytelling Dashboard',
    slug: 'data-storytelling-dashboard',
    summary: 'A dashboard for visualizing complex datasets with interactive charts and narrative explanations.',
    mainImage: '/images/projects/data-storytelling-dashboard.jpg',
    technologies: ['Next.js', 'TypeScript', 'Recharts', 'Tailwind CSS'],
    liveUrl: 'https://datastorytelling.example.com',
    repoUrl: 'https://github.com/yourusername/data-storytelling-dashboard',
  },
  {
    id: '2',
    title: 'Sustainable Design Portfolio',
    slug: 'sustainable-design-portfolio',
    summary: 'A portfolio site highlighting sustainable design projects and eco-friendly web practices.',
    mainImage: '/images/projects/sustainable-design-portfolio.jpg',
    technologies: ['Next.js', 'GSAP', 'Sanity.io'],
    liveUrl: 'https://sustainabledesign.example.com',
    repoUrl: 'https://github.com/yourusername/sustainable-design-portfolio',
  },
  {
    id: '3',
    title: '3D Node Map Explorer',
    slug: '3d-node-map-explorer',
    summary: 'An interactive 3D visualization of network data using @react-three/fiber and D3.',
    mainImage: '/images/projects/3d-node-map-explorer.jpg',
    technologies: ['React Three Fiber', 'D3.js', 'TypeScript'],
    liveUrl: 'https://nodemap.example.com',
    repoUrl: 'https://github.com/yourusername/3d-node-map-explorer',
  },
] 