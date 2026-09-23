import type { AppData } from './types'
import { initialTripEssentials } from './app-data'
import { tripItineraryDays } from './trip-itinerary'

export const defaultData: AppData = {
  settings: {
    tripName: 'Da Nang Trip 2026', startDate: '2026-09-26', endDate: '2026-09-30', budgetTHB: 60000, exchangeRate: 760,
    travelers: [{id:'p1',name:'นนท์'},{id:'p2',name:'มะเหมี่ยว'},{id:'p3',name:'พ่อ'},{id:'p4',name:'แม่'}]
  },
  expenses: [
    {id:'e-sim',date:'2026-09-26',dayId:'day-2026-09-26',item:'ค่า SIM',category:'Other',amount:423.05,currency:'THB',payerId:'p1',status:'paid',note:'Viettel'},
    {id:'e-flight',date:'2026-09-26',dayId:'day-2026-09-26',item:'ตั๋วเครื่องบิน',category:'Flights',amount:20011.28,currency:'THB',payerId:'p1',status:'paid',note:'ไป–กลับ + ที่นั่ง + ประกัน · Booking MEJWTW'},
    {id:'e-hotel-menora',date:'2026-09-26',dayId:'day-2026-09-26',item:'ที่พักดานัง 26–28 ก.ย.',category:'Accommodation',amount:3350.79,currency:'THB',payerId:'p1',status:'paid',note:'Menora Premium Da Nang · 2 ห้อง · 2 คืน'},
  ],
  days: tripItineraryDays.map(day => ({...day, places: day.places.map(place => ({...place}))})),
  tripEssentials: initialTripEssentials.map(item => ({...item})),
  packingItems: [
    {id:'packing-flight-booking',ownerId:'p1',category:'documents',name:'เอกสารยืนยันเที่ยวบิน AirAsia · MEJWTW',packed:false},
    {id:'packing-hotel-chakarin',ownerId:'p1',category:'documents',name:'เอกสารจอง Menora · 1622930406244223',packed:false},
    {id:'packing-hotel-nontakarn',ownerId:'p1',category:'documents',name:'เอกสารจอง Menora · 1622930406244227',packed:false}
  ],
  pinnedNote: ''
}

export const transportOptions = [
  {name:'Grab',cost:'2,500–4,500 บาท',best:'ทริปในเมือง / ไม่ขับรถ',pros:'เรียกง่าย จ่ายตามเที่ยว ไม่ต้องหาที่จอด',cons:'รอนานได้ช่วงฝนตกหรือชั่วโมงเร่งด่วน'},
  {name:'รถเช่าขับเอง',cost:'5,000–8,000 บาท',best:'เที่ยวหลายจุดนอกเมือง',pros:'ยืดหยุ่น แวะได้ตามใจ',cons:'ต้องมีใบขับขี่ที่ใช้ได้และรับผิดชอบการขับ'},
  {name:'รถพร้อมคนขับ',cost:'7,000–12,000 บาท',best:'4 คน / เดย์ทริประยะไกล',pros:'สะดวก แบ่งต่อคนคุ้ม ไม่ต้องนำทาง',cons:'ควรตกลงเวลา เส้นทาง และค่าล่วงเวลา'}
]
