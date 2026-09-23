import type { DayPlan } from './types'

export const legacyItineraryActivities = new Set([
  'AirAsia FD636 · ออก 09:50 · ถึง 11:30 · เช็กอิน Menora Premium',
  'พัก Menora Premium · Hoi An · คาเฟ่ · อาหารเวียดนาม',
  'Golden Bridge · French Village · ที่พักคืนที่ 3 ยังไม่ได้ระบุ',
  'My Khe Beach · Han Market · ที่พักคืนที่ 4 ยังไม่ได้ระบุ',
  'AirAsia FD639 · ออก 18:10 · ถึง 19:55'
])

const legacyItineraryTitles = new Map([
  ['day-2026-09-26', 'บินจากดอนเมืองถึงดานัง'],
  ['day-2026-09-27', 'เมืองเก่าและคาเฟ่'],
  ['day-2026-09-28', 'Ba Na Hills'],
  ['day-2026-09-29', 'ทะเลและช้อปปิ้ง'],
  ['day-2026-09-30', 'เดินทางกลับกรุงเทพฯ']
])

export const tripItineraryDays: DayPlan[] = [
  {
    id: 'day-2026-09-26',
    date: '2026-09-26',
    title: 'ถึงดานัง + วันแรกแบบสบาย ๆ',
    activities: [
      '06:30–07:00 ถึงสนามบินดอนเมือง (DMK)',
      '07:00–08:45 เช็กอิน ผ่าน ตม. และอาหารเช้า',
      '09:50 เครื่องออกจาก DMK · AirAsia FD636',
      '11:30 ถึงสนามบินดานัง Terminal 2',
      '11:30–12:15 ผ่าน ตม. และรับกระเป๋า',
      '12:15–12:35 เตรียม SIM/eSIM เงินสด และเรียก Grab',
      '12:35–13:00 เดินทางไป Menora Premium Da Nang',
      '13:00–14:00 อาหารกลางวันใกล้โรงแรม',
      '14:00–16:00 เช็กอินและพักโรงแรม',
      '16:30–17:45 My Khe Beach และคาเฟ่',
      '17:45–18:15 กลับโรงแรมและพัก',
      '18:15–19:30 อาหารเย็นโซน My Khe',
      '19:30–20:15 Son Tra Night Market หรือเดินริมแม่น้ำ',
      '20:15–21:15 Dragon Bridge · ชม Fire & Water Show เวลา 21:00',
      '21:15–21:40 กลับ Menora และพัก',
      'สรุปวันนี้: เบา · เดินน้อย–ปานกลาง'
    ].join('\n'),
    budgetTHB: 2200,
    places: [
      {id:'dmk-outbound',name:'Don Mueang International Airport',address:'กรุงเทพฯ',mapUrl:'Don Mueang International Airport'},
      {id:'dad-arrival',name:'Da Nang International Airport · Terminal 2',address:'Da Nang, Vietnam',mapUrl:'Da Nang International Airport Terminal 2'},
      {id:'menora-hotel',name:'Menora Premium Da Nang - Sea Corner Boutique',address:'Da Nang, Vietnam',mapUrl:'Menora Premium Da Nang Sea Corner Boutique'},
      {id:'my-khe-day-1',name:'My Khe Beach',address:'Da Nang, Vietnam',mapUrl:'My Khe Beach Da Nang'},
      {id:'son-tra-night-market',name:'Son Tra Night Market',address:'Da Nang, Vietnam',mapUrl:'Son Tra Night Market Da Nang'},
      {id:'dragon-bridge',name:'Dragon Bridge',address:'Da Nang, Vietnam',mapUrl:'Dragon Bridge Da Nang'}
    ]
  },
  {
    id: 'day-2026-09-27',
    date: '2026-09-27',
    title: 'Ba Na Hills แบบเต็มวัน',
    activities: [
      '06:30 ตื่น',
      '07:00–07:30 อาหารเช้า',
      '07:30–07:45 เตรียมเสื้อกันฝนบางและน้ำดื่ม',
      '07:45 ออกจาก Menora',
      '07:45–08:40 เดินทางไป Ba Na Hills',
      '08:40–09:00 เข้าพื้นที่ ซื้อตั๋ว และเข้าห้องน้ำ',
      '09:00–09:30 ขึ้น Cable Car',
      '09:30–10:15 Golden Bridge',
      "10:15–11:00 Le Jardin d'Amour",
      '11:00–11:30 นั่งพักและเครื่องดื่ม',
      '11:30–12:15 French Village',
      '12:15–13:15 อาหารกลางวันและพักเต็ม 1 ชั่วโมง',
      '13:15–14:00 เดิน French Village ต่อแบบสบาย ๆ',
      '14:00–15:00 Fantasy Park · ตัดบางส่วนได้หากเหนื่อย',
      '15:00–15:20 นั่งพักก่อนลงเขา',
      '15:20–16:20 ไป Cable Car ลงเขา และเตรียมกลับ',
      '16:20–17:20 เดินทางกลับ Menora',
      '17:20–19:00 พักโรงแรม',
      '19:00–20:00 อาหารเย็นใกล้โรงแรม',
      '20:00 เป็นต้นไป คาเฟ่หรือเดินเบา ๆ ตามกำลัง',
      'สรุปวันนี้: หนักที่สุดของทริป · เดินมาก'
    ].join('\n'),
    budgetTHB: 7200,
    places: [
      {id:'menora-day-2',name:'Menora Premium Da Nang - Sea Corner Boutique',address:'Da Nang, Vietnam',mapUrl:'Menora Premium Da Nang Sea Corner Boutique'},
      {id:'ba-na-hills',name:'Sun World Ba Na Hills',address:'Da Nang, Vietnam',mapUrl:'Sun World Ba Na Hills'},
      {id:'golden-bridge',name:'Golden Bridge',address:'Ba Na Hills, Da Nang',mapUrl:'Golden Bridge Ba Na Hills'},
      {id:'le-jardin',name:"Le Jardin d'Amour",address:'Ba Na Hills, Da Nang',mapUrl:"Le Jardin d'Amour Ba Na Hills"},
      {id:'french-village',name:'French Village',address:'Ba Na Hills, Da Nang',mapUrl:'French Village Ba Na Hills'},
      {id:'fantasy-park',name:'Fantasy Park',address:'Ba Na Hills, Da Nang',mapUrl:'Fantasy Park Ba Na Hills'}
    ]
  },
  {
    id: 'day-2026-09-28',
    date: '2026-09-28',
    title: 'Marble Mountains + ย้ายไปพักฮอยอัน',
    activities: [
      '07:00 ตื่น',
      '07:30–08:15 อาหารเช้า',
      '08:15–08:45 เก็บกระเป๋าและเช็กห้อง',
      '09:00 เช็กเอาต์ Menora',
      '09:10 รถ 7 ที่นั่งมารับและเก็บกระเป๋าไว้ในรถ',
      '09:10–09:35 เดินทางไป Marble Mountains',
      '09:35–11:05 เที่ยว Marble Mountains · ใช้ Elevator และไม่ขึ้นจุดสูงสุด',
      '11:05–11:50 เดินทางไป Hoi An',
      '11:50–12:50 อาหารกลางวัน',
      '13:00 ถึง ASAMI RIVERSIDE Hotel · ฝากกระเป๋าหรือเช็กอิน',
      '13:30–15:45 พักโรงแรม',
      '16:00–16:15 เดินทางไป Hoi An Ancient Town',
      '16:15–16:45 Japanese Covered Bridge',
      '16:45–17:30 เดินเมืองเก่าแบบจำกัดระยะ',
      '17:30–18:00 คาเฟ่และนั่งพัก',
      '18:00–19:00 อาหารเย็น',
      '19:00–19:45 ไป Hoi An Memories Land และเข้าที่นั่ง',
      '20:00–21:00 Hoi An Memories Show',
      '21:00–21:15 รอคนออกบางส่วน',
      '21:15–21:30 กลับ ASAMI และพัก',
      'สรุปวันนี้: ปานกลาง–หนัก · เดินปานกลาง'
    ].join('\n'),
    budgetTHB: 4800,
    places: [
      {id:'menora-checkout',name:'Menora Premium Da Nang - Sea Corner Boutique',address:'Da Nang, Vietnam',mapUrl:'Menora Premium Da Nang Sea Corner Boutique'},
      {id:'marble-mountains',name:'Marble Mountains',address:'Da Nang, Vietnam',mapUrl:'Marble Mountains Da Nang'},
      {id:'asami-riverside',name:'ASAMI RIVERSIDE Hotel',address:'Hoi An, Vietnam',mapUrl:'ASAMI RIVERSIDE Hotel Hoi An'},
      {id:'hoi-an-ancient-town',name:'Hoi An Ancient Town',address:'Hoi An, Vietnam',mapUrl:'Hoi An Ancient Town'},
      {id:'japanese-covered-bridge',name:'Japanese Covered Bridge',address:'Hoi An, Vietnam',mapUrl:'Japanese Covered Bridge Hoi An'},
      {id:'hoi-an-memories-land',name:'Hoi An Memories Land',address:'Hoi An, Vietnam',mapUrl:'Hoi An Memories Land'}
    ]
  },
  {
    id: 'day-2026-09-29',
    date: '2026-09-29',
    title: 'ฮอยอันช่วงเช้า + กลับดานัง',
    activities: [
      '07:30 ตื่น',
      '08:00–09:00 อาหารเช้า',
      '09:00–10:00 เดิน Hoi An ช่วงเช้าแบบไม่รีบ',
      '10:00–10:45 คาเฟ่และพัก',
      '10:45–11:15 กลับ ASAMI',
      '11:15–11:45 เก็บของ',
      '12:00 เช็กเอาต์',
      '12:00–13:00 อาหารกลางวันที่ Hoi An',
      '13:00–14:00 เดินทางกลับ Da Nang',
      '14:00–14:30 เช็กอินโรงแรม Da Nang คืนสุดท้าย',
      '14:30–16:30 พักโรงแรม',
      '16:30–18:00 เลือกเพียง 1 อย่าง · My Khe Beach + Café หรือ Lady Buddha',
      '18:00–18:30 กลับโรงแรมและพัก',
      '18:30–19:45 อาหารเย็น',
      '20:00–21:00 Spa คาเฟ่ หรือช้อปปิ้งตามกำลัง',
      '21:00 เป็นต้นไป กลับโรงแรมและแพ็กกระเป๋า',
      'สรุปวันนี้: เบา · เดินน้อย'
    ].join('\n'),
    budgetTHB: 3600,
    places: [
      {id:'asami-checkout',name:'ASAMI RIVERSIDE Hotel',address:'Hoi An, Vietnam',mapUrl:'ASAMI RIVERSIDE Hotel Hoi An'},
      {id:'hoi-an-morning',name:'Hoi An Ancient Town',address:'Hoi An, Vietnam',mapUrl:'Hoi An Ancient Town'},
      {id:'my-khe-option',name:'My Khe Beach',address:'Da Nang, Vietnam',mapUrl:'My Khe Beach Da Nang'},
      {id:'lady-buddha-option',name:'Lady Buddha · Linh Ung Pagoda',address:'Son Tra, Da Nang',mapUrl:'Lady Buddha Linh Ung Pagoda Da Nang'}
    ]
  },
  {
    id: 'day-2026-09-30',
    date: '2026-09-30',
    title: 'ซื้อของฝาก + เดินทางกลับไทย',
    activities: [
      '07:30 ตื่น',
      '08:00–09:00 อาหารเช้า',
      '09:00–09:20 เดินทางไป Han Market',
      '09:20–10:30 Han Market และซื้อของฝาก',
      '10:30–11:15 คาเฟ่และพัก',
      '11:15–11:30 กลับโรงแรม',
      '11:30–12:00 เก็บกระเป๋ารอบสุดท้าย',
      '12:00 เช็กเอาต์และฝากกระเป๋า',
      '12:15–13:15 อาหารกลางวันใกล้โรงแรม',
      '13:15–14:15 พักหรือคาเฟ่ใกล้โรงแรม',
      '14:15–14:30 กลับไปรับกระเป๋า',
      '14:45–15:00 ออกจากโรงแรม',
      '15:00–15:30 เดินทางไปสนามบินดานัง Terminal 2',
      '15:30–17:30 เช็กอิน ผ่าน ตม. และไปรอที่ Gate',
      '18:10 เครื่องออกจาก DAD · AirAsia FD639',
      '19:55 ถึงสนามบินดอนเมือง (DMK)',
      'สรุปวันนี้: เบามาก · เดินน้อย'
    ].join('\n'),
    budgetTHB: 1800,
    places: [
      {id:'han-market',name:'Han Market',address:'Da Nang, Vietnam',mapUrl:'Han Market Da Nang'},
      {id:'dad-departure',name:'Da Nang International Airport · Terminal 2',address:'Da Nang, Vietnam',mapUrl:'Da Nang International Airport Terminal 2'},
      {id:'dmk-arrival',name:'Don Mueang International Airport',address:'กรุงเทพฯ',mapUrl:'Don Mueang International Airport'}
    ]
  }
]

export function migrateLegacyItinerary(days: DayPlan[]): DayPlan[] {
  const needsUpdate = days.some(day => legacyItineraryActivities.has(day.activities) || legacyItineraryTitles.get(day.id) === day.title)
  if (!needsUpdate) return days
  return tripItineraryDays.map(day => ({...day, places: day.places.map(place => ({...place}))}))
}
