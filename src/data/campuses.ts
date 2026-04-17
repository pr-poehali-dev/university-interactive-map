export interface QRCode {
  id: string;
  name: string;
  imageUrl: string | null;
}

export interface FloorMap {
  floor: number;
  label: string;
  imageUrl: string;
}

export interface Campus {
  id: string;
  letter: string;
  name: string;
  fullName: string;
  address: string;
  lat: number;
  lng: number;
  color: string;
  gradient: string;
  institutes: string[];
  description: string;
  qrCodes: QRCode[];
  photoUrl?: string;
  hasFloorMap?: boolean;
  floorMaps?: FloorMap[];
  extraInfo?: string[];
}

export const CAMPUSES: Campus[] = [
  {
    id: 'M',
    letter: 'М',
    name: 'Главный корпус М',
    fullName: 'Главный корпус М',
    address: 'пр. Ленина, 61',
    lat: 53.34676,
    lng: 83.77611,
    color: '#0A2463',
    gradient: 'linear-gradient(135deg, #0A2463 0%, #2D5BE3 100%)',
    institutes: ['ИНГЕО', 'ИИМО'],
    description: 'Главный учебный корпус университета, расположенный в центре Барнаула',
    qrCodes: [
      { id: 'ingeo', name: 'ИНГЕО', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/547796f2-469c-414e-ac6c-c3906fc9eb1f.jpg' },
      { id: 'iimo', name: 'ИИМО', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/6728eb9d-4b80-4c1e-997f-e10572e573b0.jpg' },
    ],
    photoUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/85f5e6c8-95e2-4b45-b4aa-00631a00265a.jpeg',
  },
  {
    id: 'L',
    letter: 'Л',
    name: 'Корпус Л',
    fullName: 'Корпус Л',
    address: 'пр. Ленина, 61',
    lat: 53.34720,
    lng: 83.77540,
    color: '#1A3A8A',
    gradient: 'linear-gradient(135deg, #1A3A8A 0%, #4A7ADB 100%)',
    institutes: ['ИББ', 'ИМИТ', 'Библиотека'],
    description: 'Учебный корпус с институтами биологии, математики и информационных технологий',
    qrCodes: [
      { id: 'ibb', name: 'ИББ', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/80fd0711-1305-4301-ba93-afeb8f3b0c1a.jpg' },
      { id: 'imit', name: 'ИМИТ', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/29ed344b-16f1-4186-871f-186da7baccec.jpg' },
      { id: 'library', name: 'Библиотека', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/94814fa5-1650-4f0b-ae1a-6bd4d43ae4c5.jpg' },
    ],
    photoUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/93c3eaf1-8678-46be-aae0-80b6a12e1d9c.jpg',
  },
  {
    id: 'S',
    letter: 'С',
    name: 'Корпус С',
    fullName: 'Корпус С',
    address: 'пр. Социалистический, 68',
    lat: 53.34380,
    lng: 83.78110,
    color: '#E87722',
    gradient: 'linear-gradient(135deg, #E87722 0%, #F5A623 100%)',
    institutes: ['МИЭМИС', 'Юридический институт', 'Деканат очная форма', 'Деканат заочная форма', 'Центр Творчества', 'Точка кипения', 'Лига студентов', 'Центр тьюторов'],
    description: 'Многофункциональный корпус с деканатами, студенческими организациями и творческими пространствами',
    qrCodes: [
      { id: 'miemis', name: 'МИЭМИС', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/d37d2021-cf3d-482f-ad00-e0db5f32cb3a.jpg' },
      { id: 'law', name: 'Юридический институт', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/6a86c4ad-bc57-4735-92c2-a4bc67a6724c.jpg' },
      { id: 'dean_full', name: 'Деканат очная форма', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/5cb41bef-72f1-4a69-be77-2c85fa7640de.jpg' },
      { id: 'dean_part', name: 'Деканат заочная форма', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/42f97db3-f293-49c6-9482-f2c96db4791b.jpg' },
      { id: 'creative', name: 'Центр Творчества', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/adceea3a-bb90-4f8b-ba60-48cd0f48f9a8.jpg' },
      { id: 'boiling', name: 'Точка кипения', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/1622e1f4-899a-4545-aa05-fe5fb79e5329.jpg' },
      { id: 'league', name: 'Лига студентов', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/dbe79b6e-9e55-44af-a0b4-f4a0849718dd.jpg' },
      { id: 'tutors', name: 'Центр тьюторов', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/c4dd607c-b392-48d3-819d-d0c5b602a690.jpg' },
    ],
    photoUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/7d31a00c-59b4-4972-a314-d63a297ff17a.jpg',
    hasFloorMap: true,
    floorMaps: [
      { floor: 1, label: '1 этаж', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/b29ca90e-c6b8-4fbd-acb4-ea2211f8f4a8.png' },
      { floor: 2, label: '2 этаж', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/50c83a67-fd59-41f0-9b2c-4fd2382e6765.png' },
      { floor: 3, label: '3 этаж', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/2d2ca60d-695e-45bd-ba70-b6e7ec680940.png' },
      { floor: 4, label: '4 этаж', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/d097d2b8-01ee-4f8a-9e13-81de164889ba.png' },
    ],
    extraInfo: ['Пристройка имени Калашникова'],
  },
  {
    id: 'D',
    letter: 'Д',
    name: 'Корпус Д',
    fullName: 'Корпус Д',
    address: 'ул. Димитрова, 66',
    lat: 53.33850,
    lng: 83.79540,
    color: '#2D5BE3',
    gradient: 'linear-gradient(135deg, #2D5BE3 0%, #6B8FFF 100%)',
    institutes: ['ИГН', 'Медиа.Хаб'],
    description: 'Корпус гуманитарных наук и медиапространства',
    qrCodes: [
      { id: 'ign', name: 'ИГН', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/a3bfa837-ab8f-4cf7-b5e5-e2a9be88f7dd.jpg' },
      { id: 'mediahub', name: 'Медиа.Хаб', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/7595801e-1c7c-46f8-882a-a195b530f670.jpg' },
    ],
    photoUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/b0484b10-ccf8-4886-b88e-d7114ad94ce8.jpg',
  },
  {
    id: 'K',
    letter: 'К',
    name: 'Корпус К',
    fullName: 'Корпус К',
    address: 'пр. Красноармейский, 90',
    lat: 53.32740,
    lng: 83.77920,
    color: '#0A2463',
    gradient: 'linear-gradient(135deg, #0A2463 0%, #3D70D6 100%)',
    institutes: ['ИХиХФТ', 'ИЦТЭФ'],
    description: 'Корпус химических и физико-технических наук',
    qrCodes: [
      { id: 'ihihft', name: 'ИХиХФТ', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/5ce61bab-7f32-4d34-9c54-ed0194344a3b.jpg' },
      { id: 'ictef', name: 'ИЦТЭФ', imageUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/d82b12e8-33f4-4d54-af20-e8c8fe129ec7.jpg' },
    ],
    photoUrl: 'https://cdn.poehali.dev/projects/5538d5de-e2ec-4216-939d-ef41f58aa087/bucket/a0ddd18c-6d26-4dd9-b024-4ed44cf872b8.jpg',
  },
  {
    id: 'SOK',
    letter: 'СОК',
    name: 'СОК',
    fullName: 'Спортивно-оздоровительный комплекс',
    address: 'пр. Красноармейский, 90а',
    lat: 53.32690,
    lng: 83.77860,
    color: '#16A34A',
    gradient: 'linear-gradient(135deg, #16A34A 0%, #4ADE80 100%)',
    institutes: [],
    description: 'Спортивно-оздоровительный комплекс университета со спортзалами и фитнес-центром',
    qrCodes: [],

  },
  {
    id: 'CLINIC',
    letter: '🏥',
    name: 'Студенческая поликлиника',
    fullName: 'Студенческая поликлиника',
    address: 'ул. Юрина, 166а',
    lat: 53.31960,
    lng: 83.74850,
    color: '#DC2626',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #F87171 100%)',
    institutes: [],
    description: 'Студенческая поликлиника для обслуживания студентов и сотрудников АГУ',
    qrCodes: [
      { id: 'clinic_main', name: 'Поликлиника', imageUrl: null },
    ],
  },
];

export const UNIVERSITY_INFO = {
  name: 'Алтайский государственный университет',
  shortName: 'АГУ',
  founded: 1973,
  students: '14 000+',
  institutes: 9,
  description: 'Алтайский государственный университет — ведущий классический университет Сибири, один из опорных университетов России.',
  hasCollege: true,
  collegeDescription: 'В состав университета входит Колледж АГУ — многопрофильное среднее профессиональное учебное заведение.',
};