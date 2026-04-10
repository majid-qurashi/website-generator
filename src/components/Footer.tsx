export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="https://i.ibb.co/vxTb6KHJ/Chat-GPT-Image-Mar-26-2026-10-36-35-AM.png"
                alt="School Website Builder Logo"
                className="w-8 h-8 object-contain rounded-md"
              />
              <span className="text-lg font-bold text-white">School Website Builder</span>
            </div>
            <p className="text-sm text-gray-400">
              Creating professional websites for schools around the world.
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            <p>&copy; 2026 School Website Builder. All rights reserved.</p>
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
