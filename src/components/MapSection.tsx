import { useEffect, useRef, useState, useCallback } from 'react';
import { CAMPUSES, Campus } from '@/data/campuses';
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
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const editModeRef = useRef(false);

  const buildIcon = useCallback((campus: Campus, L: typeof import('leaflet'), isDraggable: boolean) => {
    const isSpecial = campus.id === 'SOK' || campus.id === 'CLINIC';
    const size = isSpecial ? 42 : 52;
    const innerSize = isSpecial ? 36 : 46;
    const fontSize = isSpecial ? '9px' : '16px';

    return L.divIcon({
      html: `
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            position: absolute; inset: 0; border-radius: 50%;
            background: ${campus.gradient}; opacity: 0.25;
          "></div>
          <div style="
            width: ${innerSize}px; height: ${innerSize}px;
            border-radius: 50%;
            background: ${campus.gradient};
            border: ${isDraggable ? '3px dashed white' : '3px solid white'};
            box-shadow: 0 4px 20px rgba(0,0,0,0.25);
            display: flex; align-items: center; justify-content: center;
            color: white;
            font-family: 'Montserrat', sans-serif;
            font-weight: 900;
            font-size: ${fontSize};
            cursor: ${isDraggable ? 'grab' : 'pointer'};
            position: relative; z-index: 2;
            ${isDraggable ? 'box-shadow: 0 4px 20px rgba(0,0,0,0.4), 0 0 0 3px rgba(255,200,0,0.6);' : ''}
          ">
            ${campus.id === 'CLINIC' ? '🏥' : campus.letter}
          </div>
        </div>
      `,
      className: '',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
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
        const marker = L.marker([campus.lat, campus.lng], {
          icon: buildIcon(campus, L, false),
          draggable: false,
        }).addTo(map);

        marker.on('click', (e) => {
          if (editModeRef.current) return;
          const point = map.latLngToContainerPoint(e.latlng);
          setPopupPos({ x: point.x, y: point.y });
          setSelectedCampus(campus);
        });

        marker.on('dragend', () => {
          const latlng = marker.getLatLng();
          onUpdateCoords(campus.id, latlng.lat, latlng.lng);
          setDraggedId(campus.id);
          setTimeout(() => setDraggedId(null), 2000);
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

  const toggleEditMode = useCallback(() => {
    import('leaflet').then((L) => {
      const next = !editModeRef.current;
      editModeRef.current = next;
      setEditMode(next);
      setSelectedCampus(null);

      campuses.forEach((campus) => {
        const marker = markersRef.current[campus.id];
        if (!marker) return;
        marker.setIcon(buildIcon(campus, L, next));
        if (next) {
          marker.dragging?.enable();
        } else {
          marker.dragging?.disable();
        }
      });
    });
  }, [campuses, buildIcon]);

  return (
    <section id="map" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Map container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
          style={{ height: '65vh', minHeight: '400px' }}>
          <div ref={mapRef} className="w-full h-full" />

          {/* Edit mode banner */}
          {editMode && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-amber-400 text-amber-900 px-5 py-2.5 rounded-2xl shadow-lg font-ibm font-semibold text-sm flex items-center gap-2 animate-scale-in">
              <Icon name="Move" size={16} />
              Перетащите маркеры на нужные места
            </div>
          )}

          {/* Drag success */}
          {draggedId && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 bg-green-500 text-white px-5 py-2.5 rounded-2xl shadow-lg font-ibm font-semibold text-sm flex items-center gap-2 animate-scale-in">
              <Icon name="Check" size={16} />
              Позиция сохранена
            </div>
          )}

          {/* Legend */}
          <div className="absolute top-4 left-4 glass rounded-2xl p-4 shadow-lg z-10 max-w-xs">
            <div className="font-montserrat font-bold text-agu-blue text-sm mb-3 flex items-center justify-between">
              <span>Корпусы АГУ</span>
              <button
                onClick={toggleEditMode}
                title={editMode ? 'Выключить редактирование' : 'Редактировать позиции маркеров'}
                className={`ml-3 flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-ibm font-semibold transition-all ${
                  editMode
                    ? 'bg-amber-400 text-amber-900 hover:bg-amber-300'
                    : 'bg-blue-50 text-agu-blue hover:bg-blue-100'
                }`}
              >
                <Icon name={editMode ? 'Check' : 'Pencil'} size={11} />
                {editMode ? 'Готово' : 'Изменить'}
              </button>
            </div>
            <div className="space-y-2">
              {campuses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    if (editMode) return;
                    setSelectedCampus(c);
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([c.lat, c.lng], 16, { animate: true });
                    }
                  }}
                  className={`flex items-center gap-2.5 w-full text-left rounded-lg p-1 transition-colors ${editMode ? 'opacity-50 cursor-default' : 'hover:bg-blue-50'}`}
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
          {selectedCampus && !editMode && (
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

        {editMode && (
          <p className="text-center text-amber-600 font-ibm text-sm mt-4 flex items-center justify-center gap-2">
            <Icon name="Info" size={14} />
            Режим редактирования активен. Перетащите маркер на нужное место, затем нажмите «Готово».
          </p>
        )}
      </div>
    </section>
  );
}
