import { describe, expect, it } from 'vitest'
import { isAppData } from './cloud'
import { defaultData } from './data'

describe('cloud data validation', () => {
  it('accepts the current trip structure', () => expect(isAppData(defaultData)).toBe(true))
  it('rejects incomplete and invalid data', () => {
    expect(isAppData(null)).toBe(false)
    expect(isAppData({ settings: {}, expenses: [], days: [] })).toBe(false)
  })
})
