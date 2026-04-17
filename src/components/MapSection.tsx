import { useEffect, useRef, useState } from 'react';
import { Campus } from '@/data/campuses';
import CampusPopup from './CampusPopup';

interface MapSectionProps {
  onSelectCampus: (campus: Campus) => void;
  campuses: Campus[];
  onUpdateCoords?: (campusId: string, lat: number, lng: number) => void;
}

export default function MapSection({ onSelectCampus, campuses }: MapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [53.3393, 83.7786],
        zoom: 13,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      campuses.forEach((campus) => {
        const isSpecial = campus.id === 'SOK' || campus.id === 'CLINIC';
        const size = isSpecial ? 42 : 52;
        const innerSize = isSpecial ? 36 : 46;

        const icon = L.divIcon({
          html: `
            <div style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
              <div style="position:absolute;inset:0;border-radius:50%;background:${campus.gradient};opacity:0.25;"></div>
              <div style="width:${innerSize}px;height:${innerSize}px;border-radius:50%;background:${campus.gradient};border:3px solid white;box-shadow:0 4px 20px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;color:white;font-family:'Montserrat',sans-serif;font-weight:900;font-size:${isSpecial ? '9px' : '16px'};cursor:pointer;position:relative;z-index:2;">
                ${campus.id === 'CLINIC' ? '🏥' : campus.letter}
              </div>
            </div>
          `,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker([campus.lat, campus.lng], { icon }).addTo(map);

        marker.on('click', (e) => {
          const point = map.latLngToContainerPoint(e.latlng);
          setPopupPos({ x: point.x, y: point.y });
          setSelectedCampus(campus);
        });
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="map" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-agu-orange text-sm font-ibm font-semibold mb-3 bg-orange-50 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-agu-orange" />
            Интерактивная карта
          </div>
          <h2 className="font-montserrat font-black text-agu-blue text-3xl sm:text-4xl mb-3">
            Карта корпусов АГУ
          </h2>
          <p className="text-gray-500 font-ibm max-w-xl mx-auto">
            Нажмите на любой маркер, чтобы увидеть информацию о корпусе, QR-коды и фотографии
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
          style={{ height: '65vh', minHeight: '400px' }}>
          <div ref={mapRef} className="w-full h-full" />

          {/* Legend */}
          <div className="absolute top-4 left-4 glass rounded-2xl p-4 shadow-lg z-10 max-w-xs">
            <div className="font-montserrat font-bold text-agu-blue text-sm mb-3">Корпусы АГУ</div>
            <div className="space-y-2">
              {campuses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCampus(c);
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([c.lat, c.lng], 16, { animate: true });
                    }
                  }}
                  className="flex items-center gap-2.5 w-full text-left hover:bg-blue-50 rounded-lg p-1 transition-colors"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white font-montserrat font-black text-xs flex-shrink-0"
                    style={{ background: c.gradient }}
                  >
                    {c.id === 'CLINIC' ? '🏥' : c.letter}
                  </div>
                  <div>
                    <div className="text-xs font-ibm font-semibold text-gray-800 leading-tight">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.address}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Popup */}
          {selectedCampus && (
            <div
              className="absolute z-20 animate-scale-in"
              style={{
                left: Math.min(popupPos.x + 16, 400),
                top: Math.max(popupPos.y - 180, 10),
                maxWidth: '300px',
              }}
            >
              <CampusPopup
                campus={selectedCampus}
                onClose={() => setSelectedCampus(null)}
                onDetails={() => onSelectCampus(selectedCampus)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
