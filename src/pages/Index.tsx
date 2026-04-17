import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MapSection from '@/components/MapSection';
import CampusesSection from '@/components/CampusesSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { Campus, CAMPUSES } from '@/data/campuses';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [campuses, setCampuses] = useState<Campus[]>(CAMPUSES);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);

  const scrollToSection = useCallback((section: string) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSelectCampus = useCallback((campus: Campus | null) => {
    setSelectedCampus(campus);
    if (campus) {
      setTimeout(() => {
        const el = document.getElementById('campuses');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const handleUpdateQR = useCallback((campusId: string, qrId: string, imageUrl: string) => {
    setCampuses(prev => prev.map(c => {
      if (c.id !== campusId) return c;
      return {
        ...c,
        qrCodes: c.qrCodes.map(qr => qr.id === qrId ? { ...qr, imageUrl } : qr),
      };
    }));
    setSelectedCampus(prev => {
      if (!prev || prev.id !== campusId) return prev;
      return {
        ...prev,
        qrCodes: prev.qrCodes.map(qr => qr.id === qrId ? { ...qr, imageUrl } : qr),
      };
    });
  }, []);

  const handleMapSelect = useCallback((campus: Campus) => {
    setSelectedCampus(campus);
    setTimeout(() => {
      const el = document.getElementById('campuses');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
      <HeroSection onNavigate={scrollToSection} />
      <MapSection
        campuses={campuses}
        onSelectCampus={handleMapSelect}
      />
      <CampusesSection
        campuses={campuses}
        selectedCampus={selectedCampus}
        onSelectCampus={handleSelectCampus}
        onUpdateQR={handleUpdateQR}
      />
      <AboutSection />
      <Footer />
    </div>
  );
}