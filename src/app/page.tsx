'use client';

import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import InaugurationPage from '@/components/InaugurationPage';

export default function Home() {
  return (
    <>
      <InaugurationPage onComplete={() => {}} />
      <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Navigation />
        <Hero />
        <Features />
        <HowItWorks />
        <Footer />
      </main>
    </>
  );
}
