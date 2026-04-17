import { useEffect, useRef, useState, useCallback } from 'react';
import { Campus } from '@/data/campuses';
import CampusPopup from './CampusPopup';
import Icon from '@/components/ui/icon';

interface MapSectionProps {
  onSelectCampus: (campus: Campus) => void;
  campuses: Campus[];
  onUpdateCoords: (campusId: string, lat: number, lng: number) => void;
}

export default function MapSection({ onSelectCampus, campuses, onUpdateCoords }: MapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null);
  const markersRef = useRef<Record<string, import('leaflet').Marker>>({});
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [editMode, setEditMode] = useState(false);
  const editModeRef = useRef(false);
  const onUpdateCoordsRef = useRef(onUpdateCoords);
  onUpdateCoordsRef.current = onUpdateCoords;

  const toggleEditMode = useCallback(() => {
    setEditMode(prev => {
      const next = !prev;
      editModeRef.current = next;
      // toggle draggable on all markers
      Object.values(markersRef.current).forEach(m => {
        if (next) m.dragging?.enable();
        else m.dragging?.disable();
      });
      return next;
    });
  }, []);

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

        const makeIcon = (highlight = false) => L.divIcon({
          html: `
            <div style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
              <div style="position:absolute;inset:0;border-radius:50%;background:${campus.gradient};opacity:0.25;"></div>
              <div style="width:${innerSize}px;height:${innerSize}px;border-radius:50%;background:${campus.gradient};border:${highlight ? '3px solid #F5A623' : '3px solid white'};box-shadow:0 4px 20px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;color:white;font-family:'Montserrat',sans-serif;font-weight:900;font-size:${isSpecial ? '9px' : '16px'};cursor:${highlight ? 'grab' : 'pointer'};position:relative;z-index:2;">
                ${campus.id === 'CLINIC' ? '🏥' : campus.letter}
              </div>
            </div>
          `,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker([campus.lat, campus.lng], {
          icon: makeIcon(false),
          draggable: false,
        }).addTo(map);

        marker.on('click', (e) => {
          if (editModeRef.current) return;
          const point = map.latLngToContainerPoint(e.latlng);
          setPopupPos({ x: point.x, y: point.y });
          setSelectedCampus(campus);
        });

        marker.on('dragend', () => {
          const { lat, lng } = marker.getLatLng();
          onUpdateCoordsRef.current(campus.id, lat, lng);
        });

        markersRef.current[campus.id] = marker;
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = {};
      }
    };
  }, []);

  // sync marker positions when campuses coords change
  useEffect(() => {
    campuses.forEach((campus) => {
      const marker = markersRef.current[campus.id];
      if (marker) {
        const pos = marker.getLatLng();
        if (pos.lat !== campus.lat || pos.lng !== campus.lng) {
          marker.setLatLng([campus.lat, campus.lng]);
        }
      }
    });
  }, [campuses]);

  // update icons when edit mode changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import('leaflet').then((L) => {
      campuses.forEach((campus) => {
        const marker = markersRef.current[campus.id];
        if (!marker) return;
        const isSpecial = campus.id === 'SOK' || campus.id === 'CLINIC';
        const size = isSpecial ? 42 : 52;
        const innerSize = isSpecial ? 36 : 46;
        marker.setIcon(L.divIcon({
          html: `
            <div style="position:relative;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">
              <div style="position:absolute;inset:0;border-radius:50%;background:${campus.gradient};opacity:0.25;"></div>
              <div style="width:${innerSize}px;height:${innerSize}px;border-radius:50%;background:${campus.gradient};border:${editMode ? '3px solid #F5A623' : '3px solid white'};box-shadow:0 4px 20px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;color:white;font-family:'Montserrat',sans-serif;font-weight:900;font-size:${isSpecial ? '9px' : '16px'};cursor:${editMode ? 'grab' : 'pointer'};position:relative;z-index:2;">
                ${campus.id === 'CLINIC' ? '🏥' : campus.letter}
              </div>
            </div>
          `,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        }));
        if (editMode) marker.dragging?.enable();
        else marker.dragging?.disable();
      });
    });
  }, [editMode]);

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
            Нажмите на маркер, чтобы увидеть информацию о корпусе
          </p>
        </div>

        {/* Edit mode toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-ibm font-semibold text-sm transition-all ${
              editMode
                ? 'bg-agu-orange text-white shadow-lg'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-agu-orange hover:text-agu-orange'
            }`}
          >
            <Icon name={editMode ? 'Check' : 'MapPin'} size={15} />
            {editMode ? 'Готово — сохранить позиции' : 'Переставить корпуса на карте'}
          </button>
        </div>

        {editMode && (
          <div className="mb-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm font-ibm text-amber-700">
            <Icon name="Info" size={15} />
            Перетащите маркер на нужное место, затем нажмите «Готово»
          </div>
        )}

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
                    if (!editMode) setSelectedCampus(c);
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
          {!editMode && selectedCampus && (
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
