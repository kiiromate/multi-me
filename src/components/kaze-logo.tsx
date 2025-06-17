interface KazeLogoProps {
  className?: string
}

export function KazeLogo({ className = "w-8 h-8" }: KazeLogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="KAZE">
      {/* K */}
      <path
        d="M4 4v24M4 16l8-8M4 16l8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* A */}
      <path
        d="M16 28l4-12 4 12M18.5 22h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Z */}
      <path
        d="M26 4h6l-6 12h6M26 16h6l-6 12h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* E */}
      <path
        d="M4 4h8M4 16h6M4 28h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  )
}
