import { describe, expect, it } from 'vitest'
import { calculateExpression } from './calculator'

describe('safe calculator',()=>{
  it('applies operator precedence',()=>expect(calculateExpression('2 + 3 × 4')).toBe(14))
  it('supports parentheses and decimals',()=>expect(calculateExpression('(10.5 - .5) / 2')).toBe(5))
  it('rejects code and division by zero',()=>{
    expect(()=>calculateExpression('alert(1)')).toThrow()
    expect(()=>calculateExpression('1/0')).toThrow()
  })
})
