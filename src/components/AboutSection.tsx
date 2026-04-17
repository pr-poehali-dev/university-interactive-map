import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { UNIVERSITY_INFO } from '@/data/campuses';

const institutes = [
  { name: 'ИНГЕО', full: 'Институт географии', color: '#0A2463' },
  { name: 'ИИМО', full: 'Институт истории и международных отношений', color: '#1A3A8A' },
  { name: 'ИББ', full: 'Институт биологии и биотехнологии', color: '#16A34A' },
  { name: 'ИМИТ', full: 'Институт математики и информационных технологий', color: '#2D5BE3' },
  { name: 'МИЭМИС', full: 'Международный институт экономики, менеджмента и информационных систем', color: '#7C3AED' },
  { name: 'ИГН', full: 'Институт гуманитарных наук', color: '#DB2777' },
  { name: 'ИХиХФТ', full: 'Институт химии и химически-фармацевтических технологий', color: '#D97706' },
  { name: 'ИЦТЭФ', full: 'Институт цифровых технологий, электроники и физики', color: '#0891B2' },
  { name: 'Юридический институт', full: 'Юридический институт', color: '#DC2626' },
];

interface FacilityItem {
  icon: string;
  title: string;
  desc: string;
  color: string;
  address: string;
  qr?: { imageUrl: string | null; label: string };
}

const facilities: FacilityItem[] = [
  {
    icon: 'Dumbbell',
    title: 'СОК',
    desc: 'Спортивно-оздоровительный комплекс университета со спортзалами и фитнес-центром',
    color: '#16A34A',
    address: 'пр. Красноармейский, 90а',
  },
  {
    icon: 'Stethoscope',
    title: 'Студенческая поликлиника',
    desc: 'Медицинское обслуживание студентов и сотрудников университета',
    color: '#DC2626',
    address: 'ул. Юрина, 166а',
  },
  {
    icon: 'Tv2',
    title: 'Медиа.Хаб',
    desc: 'Студенческий медиацентр — пространство для создания контента, видео и публикаций',
    color: '#E87722',
    address: 'ул. Димитрова, 66 (Корпус Д)',
  },
  {
    icon: 'GraduationCap',
    title: 'Колледж АГУ',
    desc: 'Многопрофильное среднее профессиональное учебное заведение в составе АГУ',
    color: '#7C3AED',
    address: 'г. Барнаул',
    qr: { imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/829bc100-c1d0-44c6-9c02-b0c2f8352a0f.jpg', label: 'QR-код Колледжа' },
  },
];

function FacilityCard({ f }: { f: FacilityItem }) {
  const [showQr, setShowQr] = useState(false);

  return (
    <div
      className="rounded-2xl p-5 border"
      style={{ borderColor: f.color + '25', background: f.color + '06' }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: f.color + '15' }}
        >
          <Icon name={f.icon} size={20} style={{ color: f.color }} />
        </div>
        {f.qr && (
          <button
            onClick={() => setShowQr(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-ibm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: f.color }}
          >
            <Icon name="QrCode" size={12} />
            {showQr ? 'Скрыть' : 'QR-код'}
          </button>
        )}
      </div>

      <div className="font-montserrat font-bold text-gray-800 mb-1">{f.title}</div>
      <p className="text-gray-500 text-xs font-ibm leading-relaxed mb-2">{f.desc}</p>
      <div className="flex items-center gap-1.5 text-xs font-ibm text-gray-400">
        <Icon name="MapPin" size={11} />
        {f.address}
      </div>

      {f.qr && showQr && (
        <div className="mt-4 pt-4 border-t border-dashed" style={{ borderColor: f.color + '30' }}>
          {f.qr.imageUrl ? (
            <img
              src={f.qr.imageUrl}
              alt={f.qr.label}
              className="w-40 h-40 object-contain mx-auto rounded-xl"
            />
          ) : (
            <div
              className="w-40 h-40 mx-auto rounded-xl flex flex-col items-center justify-center gap-2 border-2 border-dashed"
              style={{ borderColor: f.color + '40' }}
            >
              <Icon name="QrCode" size={32} style={{ color: f.color + '80' }} />
              <span className="text-xs font-ibm text-gray-400 text-center px-2">
                QR-код будет добавлен
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-20"
      style={{ background: 'linear-gradient(180deg, #f8faff 0%, white 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-agu-orange text-sm font-ibm font-semibold mb-3 bg-orange-50 px-4 py-1.5 rounded-full">
            <Icon name="BookOpen" size={14} />
            Об университете
          </div>
          <h2 className="font-montserrat font-black text-agu-blue text-3xl sm:text-4xl mb-4">
            Алтайский государственный<br />университет
          </h2>
          <p className="text-gray-500 font-ibm max-w-2xl mx-auto leading-relaxed">
            {UNIVERSITY_INFO.description}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {[
            { val: '1973', label: 'Год основания', icon: 'Calendar' },
            { val: '14 000+', label: 'Студентов', icon: 'Users' },
            { val: '9', label: 'Институтов', icon: 'Layers' },
            { val: '6', label: 'Корпусов', icon: 'Building2' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 text-center border border-blue-100"
              style={{ background: 'linear-gradient(135deg, #f0f4ff, #e8effe)' }}
            >
              <Icon name={stat.icon} size={22} className="text-agu-blue mx-auto mb-2" />
              <div className="font-montserrat font-black text-agu-blue text-2xl">{stat.val}</div>
              <div className="text-gray-500 text-xs font-ibm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Institutes */}
        <div className="mb-14">
          <h3 className="font-montserrat font-bold text-agu-blue text-xl mb-6 flex items-center gap-2">
            <Icon name="Layers" size={20} className="text-agu-orange" />
            9 институтов и Колледж
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
            {institutes.map((inst) => (
              <div
                key={inst.name}
                className="flex items-center gap-3 p-3.5 rounded-xl border hover:shadow-sm transition-all"
                style={{ borderColor: inst.color + '25', background: inst.color + '06' }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: inst.color }}
                />
                <div>
                  <span className="font-ibm font-semibold text-sm" style={{ color: inst.color }}>{inst.name}</span>
                  <p className="text-gray-500 text-xs font-ibm">{inst.full}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="flex items-center gap-3 p-3.5 rounded-xl border hover:shadow-sm transition-all"
            style={{ borderColor: '#7C3AED25', background: '#7C3AED06' }}
          >
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#7C3AED' }} />
            <div>
              <span className="font-ibm font-semibold text-sm" style={{ color: '#7C3AED' }}>Колледж АГУ</span>
              <p className="text-gray-500 text-xs font-ibm">Среднее профессиональное образование</p>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div>
          <h3 className="font-montserrat font-bold text-agu-blue text-xl mb-6 flex items-center gap-2">
            <Icon name="Building" size={20} className="text-agu-orange" />
            Инфраструктура и социальные объекты
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {facilities.map((f) => (
              <FacilityCard key={f.title} f={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}