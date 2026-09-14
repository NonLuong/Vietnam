import type { AppData } from './types'
import { initialTripEssentials } from './app-data'

export const defaultData: AppData = {
  settings: {
    tripName: 'Da Nang Trip 2026', startDate: '2026-09-26', endDate: '2026-09-30', budgetTHB: 60000, exchangeRate: 760,
    travelers: [{id:'p1',name:'นนท์'},{id:'p2',name:'มะเหมี่ยว'},{id:'p3',name:'พ่อ'},{id:'p4',name:'แม่'}]
  },
  expenses: [
    {id:'e-sim',date:'2026-09-26',dayId:'day-2026-09-26',item:'ค่า SIM',category:'Other',amount:423.05,currency:'THB',payerId:'p1',status:'paid',note:'Viettel'},
    {id:'e-flight',date:'2026-09-26',dayId:'day-2026-09-26',item:'ตั๋วเครื่องบิน',category:'Flights',amount:20011.28,currency:'THB',payerId:'p1',status:'paid',note:'ไป–กลับ + ที่นั่ง + ประกัน · Booking MEJWTW'},
    {id:'e-hotel-menora',date:'2026-09-26',dayId:'day-2026-09-26',item:'ที่พักดานัง 26–28 ก.ย.',category:'Accommodation',amount:3350.79,currency:'THB',payerId:'p1',status:'paid',note:'Menora Premium Da Nang · 2 ห้อง · 2 คืน'},
    {id:'e-parking',date:'2026-09-26',dayId:'day-2026-09-26',item:'ที่จอดรถดอนเมือง',category:'Transportation',amount:750,currency:'THB',payerId:'p1',status:'planned',note:'150 บาท / วัน'},
    {id:'e-golden-bridge',date:'2026-09-28',dayId:'day-2026-09-28',item:'สะพานทอง',category:'Activities',amount:5600,currency:'THB',payerId:'p1',status:'planned',note:'ประมาณการ'}
  ],
  days: [
    {id:'day-2026-09-26',date:'2026-09-26',title:'บินจากดอนเมืองถึงดานัง',activities:'AirAsia FD636 · ออก 09:50 · ถึง 11:30 · เช็กอิน Menora Premium',budgetTHB:2200,places:[{id:'dmk-outbound',name:'Don Mueang International Airport',address:'กรุงเทพฯ',mapUrl:'Don Mueang International Airport'},{id:'dad-arrival',name:'Da Nang International Airport',address:'Da Nang, Vietnam',mapUrl:'Da Nang International Airport'},{id:'menora-hotel',name:'Menora Premium Da Nang - Sea Corner Boutique',address:'ยังไม่ได้ระบุ',mapUrl:'Menora Premium Da Nang Sea Corner Boutique'}]},
    {id:'day-2026-09-27',date:'2026-09-27',title:'เมืองเก่าและคาเฟ่',activities:'พัก Menora Premium · Hoi An · คาเฟ่ · อาหารเวียดนาม',budgetTHB:4500,places:[{id:'menora-day-2',name:'Menora Premium Da Nang - Sea Corner Boutique',address:'ยังไม่ได้ระบุ',mapUrl:'Menora Premium Da Nang Sea Corner Boutique'},{id:'hoi-an',name:'Hoi An Ancient Town',address:'Hoi An, Vietnam',mapUrl:'Hoi An Ancient Town'}]},
    {id:'day-2026-09-28',date:'2026-09-28',title:'Ba Na Hills',activities:'Golden Bridge · French Village · ที่พักคืนที่ 3 ยังไม่ได้ระบุ',budgetTHB:7200,places:[{id:'ba-na-hills',name:'Ba Na Hills',address:'Da Nang, Vietnam',mapUrl:'Ba Na Hills'},{id:'golden-bridge',name:'Golden Bridge',address:'Ba Na Hills, Da Nang',mapUrl:'Golden Bridge Ba Na Hills'},{id:'french-village',name:'French Village',address:'Ba Na Hills, Da Nang',mapUrl:'French Village Ba Na Hills'}]},
    {id:'day-2026-09-29',date:'2026-09-29',title:'ทะเลและช้อปปิ้ง',activities:'My Khe Beach · Han Market · ที่พักคืนที่ 4 ยังไม่ได้ระบุ',budgetTHB:4800,places:[{id:'my-khe-beach',name:'My Khe Beach',address:'Da Nang, Vietnam',mapUrl:'My Khe Beach Da Nang'},{id:'han-market',name:'Han Market',address:'Da Nang, Vietnam',mapUrl:'Han Market Da Nang'}]},
    {id:'day-2026-09-30',date:'2026-09-30',title:'เดินทางกลับกรุงเทพฯ',activities:'AirAsia FD639 · ออก 18:10 · ถึง 19:55',budgetTHB:1800,places:[{id:'dad-departure',name:'Da Nang International Airport',address:'Da Nang, Vietnam',mapUrl:'Da Nang International Airport'},{id:'dmk-arrival',name:'Don Mueang International Airport',address:'กรุงเทพฯ',mapUrl:'Don Mueang International Airport'}]}
  ],
  tripEssentials: initialTripEssentials.map(item => ({...item})),
  packingItems: [
    {id:'packing-flight-booking',category:'documents',name:'เอกสารยืนยันเที่ยวบิน AirAsia · MEJWTW',packed:false},
    {id:'packing-hotel-chakarin',category:'documents',name:'เอกสารจอง Menora · 1622930406244223',packed:false},
    {id:'packing-hotel-nontakarn',category:'documents',name:'เอกสารจอง Menora · 1622930406244227',packed:false}
  ],
  pinnedNote: ''
}

export const transportOptions = [
  {name:'Grab',cost:'2,500–4,500 บาท',best:'ทริปในเมือง / ไม่ขับรถ',pros:'เรียกง่าย จ่ายตามเที่ยว ไม่ต้องหาที่จอด',cons:'รอนานได้ช่วงฝนตกหรือชั่วโมงเร่งด่วน'},
  {name:'รถเช่าขับเอง',cost:'5,000–8,000 บาท',best:'เที่ยวหลายจุดนอกเมือง',pros:'ยืดหยุ่น แวะได้ตามใจ',cons:'ต้องมีใบขับขี่ที่ใช้ได้และรับผิดชอบการขับ'},
  {name:'รถพร้อมคนขับ',cost:'7,000–12,000 บาท',best:'4 คน / เดย์ทริประยะไกล',pros:'สะดวก แบ่งต่อคนคุ้ม ไม่ต้องนำทาง',cons:'ควรตกลงเวลา เส้นทาง และค่าล่วงเวลา'}
]
