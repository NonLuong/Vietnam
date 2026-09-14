import type { AppData, TripEssential } from './types'

export const initialTripEssentials: TripEssential[] = [
  {id:'flight-outbound',kind:'flight',title:'เที่ยวบินขาไป DMK → DAD',details:'26 กันยายน 2026',bookingRef:'',address:'',phone:'',mapUrl:''},
  {id:'flight-return',kind:'flight',title:'เที่ยวบินขากลับ DAD → DMK',details:'30 กันยายน 2026',bookingRef:'',address:'',phone:'',mapUrl:''},
  {id:'stay-everland',kind:'stay',title:'Everland Hotel',details:'เช็กอิน 26 ก.ย. · เช็กเอาต์ 30 ก.ย.',bookingRef:'',address:'',phone:'',mapUrl:''},
  {id:'emergency-family',kind:'emergency',title:'เบอร์ติดต่อฉุกเฉิน',details:'เพิ่มชื่อและข้อมูลที่ต้องใช้ระหว่างทริป',bookingRef:'',address:'',phone:'',mapUrl:''}
]

export function isAppData(value: unknown): value is AppData {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<AppData>
  return Boolean(
    item.settings &&
    typeof item.settings.tripName === 'string' &&
    Number.isFinite(item.settings.budgetTHB) &&
    Number.isFinite(item.settings.exchangeRate) &&
    Array.isArray(item.settings.travelers) &&
    Array.isArray(item.expenses) &&
    Array.isArray(item.days)
  )
}

export function normalizeAppData(value: AppData): AppData {
  const days = value.days.map((day, index) => ({
    ...day,
    id: day.id || `day-${day.date || index}`,
    places: Array.isArray(day.places) ? day.places.map((place, placeIndex) => ({
      id: place.id || `place-${day.id || index}-${placeIndex}`,
      name: typeof place.name === 'string' ? place.name : '',
      address: typeof place.address === 'string' ? place.address : '',
      mapUrl: typeof place.mapUrl === 'string' ? place.mapUrl : ''
    })) : []
  }))
  return {
    ...value,
    days,
    tripEssentials: Array.isArray(value.tripEssentials) ? value.tripEssentials : initialTripEssentials.map(item => ({...item})),
    packingItems: Array.isArray(value.packingItems) ? value.packingItems : [],
    pinnedNote: typeof value.pinnedNote === 'string' ? value.pinnedNote : '',
    expenses: value.expenses.map(expense => ({
      ...expense,
      dayId: expense.dayId === undefined
        ? days.find(day => day.date === expense.date)?.id || null
        : expense.dayId
    }))
  }
}
