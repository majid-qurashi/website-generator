import Navigation from '@/components/Navigation';
import DeveloperProfile from '@/components/DeveloperProfile';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <DeveloperProfile />
      <Footer />
    </main>
  );
}
