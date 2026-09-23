import type { AppData, TripEssential } from './types'
import { migrateLegacyItinerary } from './trip-itinerary'

export const initialTripEssentials: TripEssential[] = [
  {id:'flight-outbound',kind:'flight',title:'AirAsia FD636 · DMK → DAD',details:'26 ก.ย. 2026 · ออก 09:50 · ถึง 11:30',bookingRef:'MEJWTW',address:'',phone:'',mapUrl:''},
  {id:'flight-return',kind:'flight',title:'AirAsia FD639 · DAD → DMK',details:'30 ก.ย. 2026 · ออก 18:10 · ถึง 19:55',bookingRef:'MEJWTW',address:'',phone:'',mapUrl:''},
  {id:'stay-menora-chakarin',kind:'stay',title:'Menora Premium Da Nang · ห้อง Family',details:'26–28 ก.ย. 2026 · 2 คืน · CHAKARIN SAISOK · ฿1,804.92 · เวลาเช็กอิน/เช็กเอาต์ยังไม่ได้ระบุ',bookingRef:'1622930406244223',address:'ยังไม่ได้ระบุ',phone:'',mapUrl:'Menora Premium Da Nang Sea Corner Boutique'},
  {id:'stay-menora-nontakarn',kind:'stay',title:'Menora Premium Da Nang · ห้อง Deluxe',details:'26–28 ก.ย. 2026 · 2 คืน · NONTAKARN SAISOK · ฿1,545.87 · เวลาเช็กอิน/เช็กเอาต์ยังไม่ได้ระบุ',bookingRef:'1622930406244227',address:'ยังไม่ได้ระบุ',phone:'',mapUrl:'Menora Premium Da Nang Sea Corner Boutique'},
  {id:'stay-night-3',kind:'stay',title:'ASAMI RIVERSIDE Hotel · Hoi An',details:'28–29 ก.ย. 2026 · 1 คืน · เวลาเช็กอิน/เช็กเอาต์และเลขการจองรอยืนยัน',bookingRef:'',address:'Hoi An, Vietnam',phone:'',mapUrl:'ASAMI RIVERSIDE Hotel Hoi An'},
  {id:'stay-night-4',kind:'stay',title:'โรงแรม Da Nang คืนสุดท้าย · รอยืนยัน',details:'29–30 ก.ย. 2026 · 1 คืน · ยังไม่ได้ระบุโรงแรม',bookingRef:'',address:'Da Nang, Vietnam',phone:'',mapUrl:''}
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
  const normalizedDays = value.days.map((day, index) => ({
    ...day,
    id: day.id || `day-${day.date || index}`,
    places: Array.isArray(day.places) ? day.places.map((place, placeIndex) => ({
      id: place.id || `place-${day.id || index}-${placeIndex}`,
      name: typeof place.name === 'string' ? place.name : '',
      address: typeof place.address === 'string' ? place.address : '',
      mapUrl: typeof place.mapUrl === 'string' ? place.mapUrl : ''
    })) : []
  }))
  const days = migrateLegacyItinerary(normalizedDays)
  const tripEssentials = (Array.isArray(value.tripEssentials) ? value.tripEssentials : initialTripEssentials).map(item => {
    const legacyStay = (item.id === 'stay-night-3' && item.title === 'ที่พักคืนที่ 3 · 28–29 ก.ย.') ||
      (item.id === 'stay-night-4' && item.title === 'ที่พักคืนที่ 4 · 29–30 ก.ย.')
    if (legacyStay) {
      return {...initialTripEssentials.find(essential => essential.id === item.id)!}
    }
    return {...item}
  })
  return {
    ...value,
    days,
    tripEssentials,
    packingItems: Array.isArray(value.packingItems) ? value.packingItems.map(item => ({
      ...item,
      ownerId: typeof item.ownerId === 'string' && item.ownerId ? item.ownerId : 'p1'
    })) : [],
    pinnedNote: typeof value.pinnedNote === 'string' ? value.pinnedNote : '',
    // The simplified budget records paid expenses only; discard legacy forecasts.
    expenses: value.expenses.filter(expense => expense.status === 'paid').map(expense => ({
      ...expense,
      status: 'paid' as const,
      dayId: expense.dayId === undefined
        ? days.find(day => day.date === expense.date)?.id || null
        : expense.dayId
    }))
  }
}
