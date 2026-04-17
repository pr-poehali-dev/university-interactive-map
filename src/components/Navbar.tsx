import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'map', label: 'Карта', icon: 'Map' },
  { id: 'campuses', label: 'Корпусы', icon: 'Building2' },
  { id: 'about', label: 'Об университете', icon: 'GraduationCap' },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-agu-blue/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-montserrat font-black text-lg shadow-lg transition-transform group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #0A2463, #2D5BE3)' }}>
              А
            </div>
            <div className="hidden sm:block">
              <div className="font-montserrat font-bold text-agu-blue text-base leading-none">АГУ</div>
              <div className="text-xs text-gray-500 font-ibm leading-tight">Алтайский госуниверситет</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-ibm font-medium text-sm transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-agu-blue text-white shadow-md'
                    : 'text-gray-600 hover:text-agu-blue hover:bg-blue-50'
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg text-agu-blue"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-gray-100 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-ibm font-medium text-sm transition-all ${
                  activeSection === item.id
                    ? 'bg-agu-blue text-white'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
