export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                {/* Background Circle */}
                <circle cx="20" cy="20" r="20" fill="#2563eb" opacity="0.1" />

                {/* Main Building Shape - School */}
                <path
                  d="M20 6L8 14V34H32V14L20 6Z"
                  fill="url(#gradientFooter)"
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
                    id="gradientFooter"
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
              </svg>
              <span className="text-lg font-bold text-white">School Website Builder</span>
            </div>
            <p className="text-sm text-gray-400">
              Creating professional websites for schools around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Support</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="/about" className="hover:text-white transition">About Dev</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            <p>&copy; 2024 School Website Builder. All rights reserved.</p>
          </div>
          <div>
            <p>
              Developed by{' '}
              <a
                href="https://qurashi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition font-semibold"
              >
                Majid Qurashi
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
