import Icon from '@/components/ui/icon';
import { UNIVERSITY_INFO } from '@/data/campuses';

const institutes = [
  { name: 'ИНГЕО', full: 'Институт географии', color: '#0A2463' },
  { name: 'ИИМО', full: 'Институт истории и международных отношений', color: '#1A3A8A' },
  { name: 'ИББ', full: 'Институт биологии и биотехнологии', color: '#16A34A' },
  { name: 'ИМИТ', full: 'Институт математики и информационных технологий', color: '#2D5BE3' },
  { name: 'МИЭМИС', full: 'Институт экономики и менеджмента', color: '#7C3AED' },
  { name: 'ИГН', full: 'Институт гуманитарных наук', color: '#DB2777' },
  { name: 'ИХиХФТ', full: 'Институт химии и химической технологии', color: '#D97706' },
  { name: 'ИЦТЭФ', full: 'Институт цифровых технологий', color: '#0891B2' },
  { name: 'Юридический', full: 'Юридический институт', color: '#DC2626' },
  { name: 'ИИМО', full: 'Институт истории и международных отношений', color: '#0A2463' },
  { name: 'Медиа.Хаб', full: 'Центр медиакоммуникаций', color: '#E87722' },
];

const facilities = [
  {
    icon: 'Dumbbell',
    title: 'СОК',
    desc: 'Спортивно-оздоровительный комплекс с бассейном, спортзалами и фитнес-центром',
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
    icon: 'GraduationCap',
    title: 'Колледж АГУ',
    desc: 'Многопрофильное среднее профессиональное учебное заведение в составе АГУ',
    color: '#7C3AED',
    address: 'г. Барнаул',
  },
];

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
            { val: '11', label: 'Институтов', icon: 'Layers' },
            { val: '1+', label: 'Колледж', icon: 'School' },
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
            11 институтов и Колледж
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {institutes.map((inst, i) => (
              <div
                key={i}
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
        </div>

        {/* Facilities */}
        <div>
          <h3 className="font-montserrat font-bold text-agu-blue text-xl mb-6 flex items-center gap-2">
            <Icon name="Building" size={20} className="text-agu-orange" />
            Инфраструктура и социальные объекты
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {facilities.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-5 border"
                style={{ borderColor: f.color + '25', background: f.color + '06' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: f.color + '15' }}
                >
                  <Icon name={f.icon} size={20} style={{ color: f.color }} />
                </div>
                <div className="font-montserrat font-bold text-gray-800 mb-1">{f.title}</div>
                <p className="text-gray-500 text-xs font-ibm leading-relaxed mb-2">{f.desc}</p>
                <div className="flex items-center gap-1.5 text-xs font-ibm text-gray-400">
                  <Icon name="MapPin" size={11} />
                  {f.address}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
