'use client';

import { useState } from 'react';
import Logo from './Logo';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
              <Logo />
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">
                School Website Builder
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">
              How It Works
            </a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition">
              Developer
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <a href="/" className="block py-2 text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600">
              Features
            </a>
            <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-blue-600">
              How It Works
            </a>
            <a href="#pricing" className="block py-2 text-gray-700 hover:text-blue-600">
              Pricing
            </a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
