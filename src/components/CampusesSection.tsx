import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Campus, CAMPUSES } from '@/data/campuses';
import CampusModal from './CampusModal';

interface CampusesSectionProps {
  campuses: Campus[];
  selectedCampus: Campus | null;
  onSelectCampus: (campus: Campus | null) => void;
  onUpdateQR: (campusId: string, qrId: string, imageUrl: string) => void;
}

export default function CampusesSection({ campuses, selectedCampus, onSelectCampus, onUpdateQR }: CampusesSectionProps) {
  const mainCampuses = campuses.filter(c => !['SOK', 'CLINIC'].includes(c.id));
  const specialCampuses = campuses.filter(c => ['SOK', 'CLINIC'].includes(c.id));

  return (
    <section id="campuses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-agu-blue text-sm font-ibm font-semibold mb-3 bg-blue-50 px-4 py-1.5 rounded-full">
            <Icon name="Building2" size={14} />
            Учебные корпусы
          </div>
          <h2 className="font-montserrat font-black text-agu-blue text-3xl sm:text-4xl mb-3">
            Корпусы университета
          </h2>
          <p className="text-gray-500 font-ibm max-w-xl mx-auto">
            Нажмите на карточку, чтобы получить подробную информацию, QR-коды и загрузить схему этажей
          </p>
        </div>

        {/* Main campuses grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mainCampuses.map((campus, idx) => (
            <CampusCard
              key={campus.id}
              campus={campus}
              index={idx}
              onClick={() => onSelectCampus(campus)}
            />
          ))}
        </div>

        {/* Special facilities */}
        <div className="mb-8">
          <h3 className="font-montserrat font-bold text-gray-500 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
            <div className="w-8 h-px bg-gray-200" />
            Инфраструктура
            <div className="flex-1 h-px bg-gray-200" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialCampuses.map((campus, idx) => (
              <CampusCard
                key={campus.id}
                campus={campus}
                index={idx}
                onClick={() => onSelectCampus(campus)}
                compact
              />
            ))}

            {/* College card */}
            <div className="border border-dashed border-gray-200 rounded-2xl p-5 flex items-start gap-4 bg-gray-50">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl bg-white shadow-sm border border-gray-100">
                🎓
              </div>
              <div>
                <div className="font-montserrat font-bold text-gray-700 text-sm">Колледж АГУ</div>
                <p className="text-gray-400 text-xs font-ibm mt-1 leading-relaxed">
                  Многопрофильное среднее профессиональное учебное заведение в составе АГУ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCampus && (
        <CampusModal
          campus={selectedCampus}
          onClose={() => onSelectCampus(null)}
          onUpdateQR={onUpdateQR}
        />
      )}
    </section>
  );
}

interface CampusCardProps {
  campus: Campus;
  index: number;
  onClick: () => void;
  compact?: boolean;
}

function CampusCard({ campus, index, onClick, compact }: CampusCardProps) {
  const [imgError, setImgError] = useState(false);

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="border rounded-2xl p-5 flex items-start gap-4 text-left hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 bg-white group"
        style={{ borderColor: campus.color + '30' }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-montserrat font-black text-base shadow-sm group-hover:scale-110 transition-transform"
          style={{ background: campus.gradient }}
        >
          {campus.id === 'CLINIC' ? '🏥' : campus.letter}
        </div>
        <div>
          <div className="font-montserrat font-bold text-gray-800 text-sm">{campus.name}</div>
          <div className="text-gray-400 text-xs font-ibm flex items-center gap-1 mt-0.5">
            <Icon name="MapPin" size={10} />
            {campus.address}
          </div>
          <p className="text-gray-400 text-xs font-ibm mt-1.5 line-clamp-2 leading-relaxed">
            {campus.description}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left group bg-white animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both', opacity: 0 }}
    >
      {/* Photo/gradient header */}
      <div
        className="h-36 relative overflow-hidden"
        style={!campus.photoUrl || imgError ? { background: campus.gradient } : {}}
      >
        {campus.photoUrl && !imgError ? (
          <img
            src={campus.photoUrl}
            alt={campus.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : null}

        {/* Overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
        />

        {/* Letter badge */}
        <div className="absolute top-3 left-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-montserrat font-black text-lg shadow-lg border-2 border-white/30"
            style={{ background: campus.gradient }}
          >
            {campus.letter}
          </div>
        </div>

        {/* QR badge */}
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2.5 py-1 flex items-center gap-1">
          <Icon name="QrCode" size={11} className="text-gray-600" />
          <span className="text-xs font-ibm text-gray-600 font-medium">{campus.qrCodes.length}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="font-montserrat font-bold text-gray-800 text-base mb-0.5">{campus.name}</div>
        <div className="text-gray-400 text-xs font-ibm flex items-center gap-1 mb-2">
          <Icon name="MapPin" size={11} />
          {campus.address}
        </div>
        <p className="text-gray-500 text-xs font-ibm leading-relaxed mb-3 line-clamp-2">{campus.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {campus.institutes.slice(0, 3).map((inst) => (
            <span
              key={inst}
              className="text-xs px-2 py-0.5 rounded-full font-ibm"
              style={{ background: campus.color + '12', color: campus.color }}
            >
              {inst}
            </span>
          ))}
          {campus.institutes.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 font-ibm">
              +{campus.institutes.length - 3}
            </span>
          )}
        </div>

        <div
          className="mt-3 w-full py-2 rounded-xl text-center text-xs font-montserrat font-semibold text-white transition-all group-hover:shadow-md"
          style={{ background: campus.gradient }}
        >
          Подробнее и QR-коды
        </div>
      </div>
    </button>
  );
}
