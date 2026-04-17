import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MapSection from '@/components/MapSection';
import CampusesSection from '@/components/CampusesSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { Campus, CAMPUSES } from '@/data/campuses';

const COORDS_KEY = 'agu_campus_coords';

function loadSavedCoords(): Record<string, { lat: number; lng: number }> {
  try {
    const raw = localStorage.getItem(COORDS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function initCampuses(): Campus[] {
  const saved = loadSavedCoords();
  return CAMPUSES.map(c => saved[c.id] ? { ...c, ...saved[c.id] } : c);
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [campuses, setCampuses] = useState<Campus[]>(initCampuses);
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

  const handleUpdateCoords = useCallback((campusId: string, lat: number, lng: number) => {
    setCampuses(prev => {
      const updated = prev.map(c => c.id === campusId ? { ...c, lat, lng } : c);
      // persist all coords to localStorage
      const saved = loadSavedCoords();
      saved[campusId] = { lat, lng };
      localStorage.setItem(COORDS_KEY, JSON.stringify(saved));
      return updated;
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
      <HeroSection onNavigate={scrollToSection} />
      <MapSection
        campuses={campuses}
        onSelectCampus={handleMapSelect}
        onUpdateCoords={handleUpdateCoords}
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