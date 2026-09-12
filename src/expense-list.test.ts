import { describe, expect, it } from 'vitest'
import { selectExpenses, type ExpenseFilters } from './expense-list'
import type { Expense } from './types'

const expenses:Expense[]=[
  {id:'1',date:'2026-09-28',item:'Dinner',category:'Food',amount:500000,currency:'VND',payerId:'mom',status:'paid',note:'Hoi An'},
  {id:'2',date:'2026-09-27',item:'Grab airport',category:'Transportation',amount:700,currency:'THB',payerId:'me',status:'planned',note:''},
]
const base:ExpenseFilters={query:'',category:'all',status:'all',payerId:'all',sort:'date-desc'}
const select=(filters:Partial<ExpenseFilters>)=>selectExpenses(expenses,{...base,...filters},expense=>expense.currency==='THB'?expense.amount:expense.amount/500,id=>id==='mom'?'แม่':'ฉัน')

describe('selectExpenses',()=>{
  it('searches item, note, and payer name',()=>expect(select({query:'แม่'}).map(item=>item.id)).toEqual(['1']))
  it('combines category, status, and payer filters',()=>expect(select({category:'Transportation',status:'planned',payerId:'me'}).map(item=>item.id)).toEqual(['2']))
  it('sorts mixed currencies by their THB value',()=>expect(select({sort:'amount-desc'}).map(item=>item.id)).toEqual(['1','2']))
})
