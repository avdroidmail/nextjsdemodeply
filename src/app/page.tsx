import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureLab from '@/components/FeatureLab';
import ArchitectureCards from '@/components/ArchitectureCards';
import Terminal from '@/components/Terminal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <FeatureLab />
        <ArchitectureCards />
        <Terminal />
      </main>
      <Footer />
    </div>
  );
}
