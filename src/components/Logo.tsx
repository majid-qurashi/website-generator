export default function Logo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10"
    >
      {/* Background Circle */}
      <circle cx="20" cy="20" r="20" fill="#2563eb" opacity="0.1" />

      {/* Main Building Shape - School */}
      <path
        d="M20 6L8 14V34H32V14L20 6Z"
        fill="url(#gradient)"
        stroke="#2563eb"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Roof Triangle */}
      <path
        d="M8 14L20 6L32 14"
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Flag on Roof */}
      <circle cx="20" cy="5" r="1.5" fill="#dc2626" />
      <line x1="20" y1="6.5" x2="20" y2="12" stroke="#dc2626" strokeWidth="1.5" />

      {/* Windows - Left Column */}
      <rect x="11" y="18" width="2.5" height="2.5" fill="#60a5fa" rx="0.3" />
      <rect x="11" y="23" width="2.5" height="2.5" fill="#60a5fa" rx="0.3" />
      <rect x="11" y="28" width="2.5" height="2.5" fill="#60a5fa" rx="0.3" />

      {/* Windows - Right Column */}
      <rect x="26.5" y="18" width="2.5" height="2.5" fill="#60a5fa" rx="0.3" />
      <rect x="26.5" y="23" width="2.5" height="2.5" fill="#60a5fa" rx="0.3" />
      <rect x="26.5" y="28" width="2.5" height="2.5" fill="#60a5fa" rx="0.3" />

      {/* Door */}
      <rect x="18.5" y="28" width="3" height="6" fill="#1e40af" rx="0.4" />
      <circle cx="21" cy="31" r="0.4" fill="#fbbf24" />

      {/* Web/Globe elements - Representing Digital */}
      {/* Globe-like circle behind building */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="#2563eb"
        strokeWidth="0.8"
        opacity="0.3"
      />

      {/* Gradient Definition */}
      <defs>
        <linearGradient
          id="gradient"
          x1="8"
          y1="6"
          x2="32"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Decorative Code Brackets at bottom - Removed to prevent hydration mismatch */}
    </svg>
  );
}
