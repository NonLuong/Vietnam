import type { AppData } from './types'

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
    id: day.id || `day-${day.date || index}`
  }))
  return {
    ...value,
    days,
    expenses: value.expenses.map(expense => ({
      ...expense,
      dayId: expense.dayId === undefined
        ? days.find(day => day.date === expense.date)?.id || null
        : expense.dayId
    }))
  }
}
