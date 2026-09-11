import type { AppData } from './types'

export const defaultData: AppData = {
  settings: {
    tripName: 'Da Nang Trip 2026', startDate: '2026-09-26', endDate: '2026-09-30', budgetTHB: 60000, exchangeRate: 760,
    travelers: [{id:'p1',name:'นนท์'},{id:'p2',name:'ผู้เดินทาง 2'},{id:'p3',name:'ผู้เดินทาง 3'},{id:'p4',name:'ผู้เดินทาง 4'}]
  },
  expenses: [
    {id:'e1',date:'2026-09-26',item:'ตั๋วเครื่องบินไป–กลับ',category:'Flights',amount:20648,currency:'THB',payerId:'p1',status:'paid',note:'รวมที่นั่งและประกัน จากแผนเดิม'},
    {id:'e2',date:'2026-09-26',item:'Everland Hotel',category:'Accommodation',amount:8673.24,currency:'THB',payerId:'p2',status:'paid',note:'4 คืน จากแผนเดิม'},
    {id:'e3',date:'2026-09-26',item:'ที่จอดรถสนามบิน',category:'Transportation',amount:750,currency:'THB',payerId:'p1',status:'planned',note:'150 บาทต่อวัน'},
    {id:'e4',date:'2026-09-26',item:'Grab สนามบิน–โรงแรม',category:'Transportation',amount:350000,currency:'VND',payerId:'p3',status:'planned',note:'ตัวเลขประมาณการ'},
    {id:'e5',date:'2026-09-27',item:'อาหารและกาแฟวันแรก',category:'Food',amount:2400000,currency:'VND',payerId:'p4',status:'planned',note:'ประมาณการสำหรับ 4 คน'},
    {id:'e6',date:'2026-09-28',item:'Ba Na Hills',category:'Activities',amount:5600000,currency:'VND',payerId:'p1',status:'planned',note:'งบกิจกรรมโดยประมาณ'},
    {id:'e7',date:'2026-09-29',item:'ของฝาก',category:'Shopping',amount:3000,currency:'THB',payerId:'p2',status:'planned',note:'วงเงินตั้งต้น'}
  ],
  days: [
    {date:'2026-09-26',title:'เดินทางถึงดานัง',activities:'เช็กอิน · เดินเล่นริมแม่น้ำฮัน · สะพานมังกร',budgetTHB:2200},
    {date:'2026-09-27',title:'เมืองเก่าและคาเฟ่',activities:'Hoi An · คาเฟ่ · อาหารเวียดนาม',budgetTHB:4500},
    {date:'2026-09-28',title:'Ba Na Hills',activities:'Golden Bridge · French Village',budgetTHB:7200},
    {date:'2026-09-29',title:'ทะเลและช้อปปิ้ง',activities:'My Khe Beach · Han Market',budgetTHB:4800},
    {date:'2026-09-30',title:'เช็กเอาต์และเดินทางกลับ',activities:'อาหารเช้า · สนามบิน',budgetTHB:1800}
  ]
}

export const transportOptions = [
  {name:'Grab',cost:'2,500–4,500 บาท',best:'ทริปในเมือง / ไม่ขับรถ',pros:'เรียกง่าย จ่ายตามเที่ยว ไม่ต้องหาที่จอด',cons:'รอนานได้ช่วงฝนตกหรือชั่วโมงเร่งด่วน'},
  {name:'รถเช่าขับเอง',cost:'5,000–8,000 บาท',best:'เที่ยวหลายจุดนอกเมือง',pros:'ยืดหยุ่น แวะได้ตามใจ',cons:'ต้องมีใบขับขี่ที่ใช้ได้และรับผิดชอบการขับ'},
  {name:'รถพร้อมคนขับ',cost:'7,000–12,000 บาท',best:'4 คน / เดย์ทริประยะไกล',pros:'สะดวก แบ่งต่อคนคุ้ม ไม่ต้องนำทาง',cons:'ควรตกลงเวลา เส้นทาง และค่าล่วงเวลา'}
]
