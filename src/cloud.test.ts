import { describe, expect, it } from 'vitest'
import { isAppData, normalizeAppData } from './cloud'
import { defaultData } from './data'

describe('cloud data validation', () => {
  it('accepts the current trip structure', () => expect(isAppData(defaultData)).toBe(true))
  it('rejects incomplete and invalid data', () => {
    expect(isAppData(null)).toBe(false)
    expect(isAppData({ settings: {}, expenses: [], days: [] })).toBe(false)
  })
  it('migrates old days and links expenses by date', () => {
    const legacy = structuredClone(defaultData)
    delete (legacy.days[0] as { id?: string }).id
    delete legacy.expenses[0].dayId
    const normalized = normalizeAppData(legacy)
    expect(normalized.days[0].id).toBe('day-2026-09-26')
    expect(normalized.expenses[0].dayId).toBe('day-2026-09-26')
  })
})
