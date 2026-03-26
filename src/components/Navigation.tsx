'use client';

import { useState } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
              <Logo />
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
                School Website Builder
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Home
            </a>
            <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              How It Works
            </a>
            <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Developer
            </a>
            <a href="/templates" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Templates
            </a>
            <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              Contact
            </a>
            {/* Theme Toggle Button - Desktop */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center gap-3">
            {/* Theme Toggle Button - Mobile */}
            <ThemeToggle />

            {/* Mobile Menu Button (Hamburger) */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-9 h-9 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700">
            <a href="/" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>
              Home
            </a>
            <a href="#features" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>
              Features
            </a>
            <a href="#how-it-works" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>
              How It Works
            </a>
            <a href="/about" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>
              Developer
            </a>
            <a href="/templates" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>
              Templates
            </a>
            <a href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
