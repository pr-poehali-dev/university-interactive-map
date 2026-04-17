import Icon from '@/components/ui/icon';
import { UNIVERSITY_INFO } from '@/data/campuses';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const stats = [
  { value: '1973', label: 'Год основания', icon: 'Calendar' },
  { value: '14 000+', label: 'Студентов', icon: 'Users' },
  { value: '9', label: 'Институтов', icon: 'Building2' },
  { value: '6', label: 'Корпусов', icon: 'MapPin' },
];

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A2463 0%, #1A3A8A 40%, #2D5BE3 75%, #4A7AE8 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #E87722, transparent)' }} />
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F5A623, transparent)' }} />
        <div className="absolute -bottom-16 right-1/4 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, white, transparent)' }} />

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-agu-gold animate-pulse" />
            <span className="text-white/90 text-sm font-ibm">Барнаул, Алтайский край</span>
          </div>

          {/* Title */}
          <h1 className="font-montserrat font-black text-white leading-none mb-4 animate-fade-in-up delay-100"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Алтайский<br />
            <span className="text-agu-gold">государственный</span><br />
            университет
          </h1>

          {/* Subtitle */}
          <p className="text-white/75 text-lg font-ibm mb-8 max-w-xl leading-relaxed animate-fade-in-up delay-200">
            {UNIVERSITY_INFO.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
            <button
              onClick={() => onNavigate('map')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-montserrat font-semibold text-agu-blue text-sm transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95"
              style={{ background: 'linear-gradient(135deg, #F5A623, #E87722)' }}
            >
              <Icon name="Map" size={18} />
              Открыть карту
            </button>
            <button
              onClick={() => onNavigate('campuses')}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-montserrat font-semibold text-white text-sm bg-white/10 border border-white/20 transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95"
            >
              <Icon name="Building2" size={18} />
              Все корпусы
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 animate-fade-in-up delay-400">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 border border-white/15 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/15 transition-all duration-200"
            >
              <Icon name={stat.icon} size={20} className="text-agu-gold mb-2" />
              <div className="font-montserrat font-black text-white text-2xl">{stat.value}</div>
              <div className="text-white/60 text-xs font-ibm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
        <span className="text-white/50 text-xs font-ibm">Прокрутите вниз</span>
        <Icon name="ChevronDown" size={20} className="text-white/50" />
      </div>
    </section>
  );
}