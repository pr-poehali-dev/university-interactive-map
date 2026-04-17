import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Campus, QRCode, FloorMap } from '@/data/campuses';

interface CampusModalProps {
  campus: Campus;
  onClose: () => void;
  onUpdateQR: (campusId: string, qrId: string, imageUrl: string) => void;
}

function FloorMapTab({ floorMaps }: { floorMaps: FloorMap[] }) {
  const [activeFloor, setActiveFloor] = useState(floorMaps[0]?.floor ?? 1);

  if (floorMaps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-gray-400">
        <Icon name="LayoutGrid" size={40} />
        <span className="font-ibm text-sm">Карта этажей пока не добавлена</span>
      </div>
    );
  }

  const current = floorMaps.find(f => f.floor === activeFloor) ?? floorMaps[0];

  return (
    <div className="space-y-4">
      {floorMaps.length > 1 && (
        <div className="flex gap-2">
          {floorMaps.map(f => (
            <button
              key={f.floor}
              onClick={() => setActiveFloor(f.floor)}
              className={`px-4 py-2 rounded-xl text-xs font-ibm font-semibold transition-all ${
                activeFloor === f.floor
                  ? 'bg-agu-blue text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
        <img
          src={current.imageUrl}
          alt={current.label}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default function CampusModal({ campus, onClose, onUpdateQR }: CampusModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'qr' | 'floor'>('info');
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingQrId, setPendingQrId] = useState<string | null>(null);

  const handleFileSelect = (qrId: string) => {
    setPendingQrId(qrId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pendingQrId) return;

    setUploadingId(pendingQrId);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      onUpdateQR(campus.id, pendingQrId, result);
      setUploadingId(null);
      setPendingQrId(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const tabs = [
    { id: 'info', label: 'Информация', icon: 'Info' },
    { id: 'qr', label: `QR-коды (${campus.qrCodes.length})`, icon: 'QrCode' },
    ...(campus.hasFloorMap ? [{ id: 'floor', label: 'Карта этажей', icon: 'LayoutGrid' }] : []),
  ] as { id: 'info' | 'qr' | 'floor'; label: string; icon: string }[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in flex flex-col">
        {/* Header */}
        <div
          className="px-6 py-5 flex items-center justify-between flex-shrink-0"
          style={{ background: campus.gradient }}
        >
          <div className="flex items-center gap-4">
            {campus.photoUrl ? (
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/30 flex-shrink-0 bg-white/10">
                <img
                  src={campus.photoUrl}
                  alt={campus.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML =
                      `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-family:Montserrat;font-weight:900;font-size:20px">${campus.letter}</div>`;
                  }}
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-white font-montserrat font-black text-xl flex-shrink-0">
                {campus.id === 'CLINIC' ? '🏥' : campus.letter}
              </div>
            )}
            <div>
              <div className="text-white font-montserrat font-black text-xl leading-tight">{campus.name}</div>
              <div className="text-white/70 text-sm font-ibm flex items-center gap-1.5 mt-0.5">
                <Icon name="MapPin" size={12} />
                {campus.address}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 flex-shrink-0 bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 font-ibm font-medium text-sm border-b-2 transition-all -mb-px ${
                activeTab === tab.id
                  ? 'border-agu-blue text-agu-blue'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'info' && (
            <div className="space-y-5">
              <p className="text-gray-600 font-ibm leading-relaxed">{campus.description}</p>

              {campus.institutes.length > 0 && (
                <div>
                  <h3 className="font-montserrat font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Icon name="GraduationCap" size={16} className="text-agu-blue" />
                    Институты и подразделения
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {campus.institutes.map((inst) => (
                      <div
                        key={inst}
                        className="flex items-center gap-2.5 p-3 rounded-xl border font-ibm text-sm"
                        style={{ borderColor: campus.color + '30', background: campus.color + '08' }}
                      >
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: campus.color }} />
                        <span className="text-gray-700 font-medium">{inst}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {campus.extraInfo && campus.extraInfo.length > 0 && (
                <div>
                  <h3 className="font-montserrat font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Icon name="Star" size={16} className="text-agu-orange" />
                    Дополнительно
                  </h3>
                  <div className="space-y-2">
                    {campus.extraInfo.map((info) => (
                      <div key={info} className="flex items-center gap-2.5 p-3 rounded-xl bg-orange-50 border border-orange-100">
                        <Icon name="ChevronRight" size={14} className="text-agu-orange flex-shrink-0" />
                        <span className="text-gray-700 font-ibm text-sm">{info}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={18} className="text-agu-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-montserrat font-semibold text-agu-blue text-sm">Адрес</div>
                    <div className="text-gray-600 font-ibm text-sm mt-0.5">{campus.address}, Барнаул</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <Icon name="Info" size={14} className="text-amber-600 flex-shrink-0" />
                <p className="text-amber-700 text-xs font-ibm">
                  Загрузите PNG-файлы QR-кодов. После загрузки они будут отображаться при нажатии на корпус на карте.
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="grid grid-cols-2 gap-3">
                {campus.qrCodes.map((qr) => (
                  <QRCodeCard
                    key={qr.id}
                    qr={qr}
                    campusColor={campus.color}
                    campusGradient={campus.gradient}
                    isUploading={uploadingId === qr.id}
                    onUpload={() => handleFileSelect(qr.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'floor' && (
            <FloorMapTab floorMaps={campus.floorMaps ?? []} />
          )}
        </div>
      </div>
    </div>
  );
}

interface QRCodeCardProps {
  qr: QRCode;
  campusColor: string;
  campusGradient: string;
  isUploading: boolean;
  onUpload: () => void;
}

function QRCodeCard({ qr, campusColor, campusGradient, isUploading, onUpload }: QRCodeCardProps) {
  return (
    <div className="border rounded-2xl overflow-hidden hover:shadow-md transition-all"
      style={{ borderColor: campusColor + '30' }}>
      {/* QR Image area */}
      <div
        className="aspect-square relative flex items-center justify-center"
        style={{ background: qr.imageUrl ? 'white' : campusColor + '08' }}
      >
        {qr.imageUrl ? (
          <img src={qr.imageUrl} alt={qr.name} className="w-full h-full object-contain p-2" />
        ) : (
          <div className="flex flex-col items-center gap-2 p-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: campusGradient }}>
              <Icon name="QrCode" size={22} className="text-white" />
            </div>
            <span className="text-gray-400 text-xs font-ibm text-center">QR не загружен</span>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: campusColor }} />
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="p-2.5 border-t" style={{ borderColor: campusColor + '20' }}>
        <div className="text-xs font-ibm font-semibold text-gray-700 mb-1.5 truncate">{qr.name}</div>
        <button
          onClick={onUpload}
          disabled={isUploading}
          className="w-full py-1.5 rounded-lg text-xs font-ibm font-semibold text-white transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-1.5"
          style={{ background: campusGradient }}
        >
          <Icon name={qr.imageUrl ? 'RefreshCw' : 'Upload'} size={11} />
          {qr.imageUrl ? 'Заменить' : 'Загрузить'}
        </button>
      </div>
    </div>
  );
}