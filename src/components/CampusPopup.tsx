import Icon from '@/components/ui/icon';
import { Campus } from '@/data/campuses';

interface CampusPopupProps {
  campus: Campus;
  onClose: () => void;
  onDetails: () => void;
}

export default function CampusPopup({ campus, onClose, onDetails }: CampusPopupProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-72">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ background: campus.gradient }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-montserrat font-black text-base">
            {campus.id === 'CLINIC' ? '🏥' : campus.letter}
          </div>
          <div>
            <div className="text-white font-montserrat font-bold text-sm leading-tight">{campus.name}</div>
            <div className="text-white/70 text-xs font-ibm">{campus.address}</div>
          </div>
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
          <Icon name="X" size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-500 text-xs font-ibm mb-3 leading-relaxed">{campus.description}</p>

        {campus.institutes.length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-montserrat font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Институты и службы
            </div>
            <div className="flex flex-wrap gap-1.5">
              {campus.institutes.map((inst) => (
                <span
                  key={inst}
                  className="text-xs px-2.5 py-1 rounded-full font-ibm font-medium border"
                  style={{
                    background: campus.color + '10',
                    borderColor: campus.color + '30',
                    color: campus.color,
                  }}
                >
                  {inst}
                </span>
              ))}
            </div>
          </div>
        )}

        {campus.extraInfo && campus.extraInfo.length > 0 && (
          <div className="mb-3 flex flex-col gap-1">
            {campus.extraInfo.map((info) => (
              <div key={info} className="flex items-center gap-2 text-xs font-ibm text-gray-500">
                <Icon name="Star" size={12} className="text-agu-orange flex-shrink-0" />
                {info}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onDetails}
          className="w-full py-2.5 rounded-xl text-white text-sm font-montserrat font-semibold transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
          style={{ background: campus.gradient }}
        >
          Подробнее и QR-коды →
        </button>
      </div>
    </div>
  );
}
