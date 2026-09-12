import type { Expense, Status } from './types'

export type ExpenseSort = 'date-desc'|'date-asc'|'amount-desc'|'amount-asc'|'category'|'status'

export type ExpenseFilters = {
  query: string
  category: string
  status: Status|'all'
  payerId: string
  sort: ExpenseSort
}

export function selectExpenses(
  expenses: Expense[],
  filters: ExpenseFilters,
  toTHB: (expense: Expense) => number,
  payerName: (payerId: string) => string,
) {
  const needle=filters.query.trim().toLocaleLowerCase('th')
  return expenses.filter(expense=>{
    const matchesText=!needle||`${expense.item} ${expense.note} ${payerName(expense.payerId)}`.toLocaleLowerCase('th').includes(needle)
    return matchesText
      && (filters.category==='all'||expense.category===filters.category)
      && (filters.status==='all'||expense.status===filters.status)
      && (filters.payerId==='all'||expense.payerId===filters.payerId)
  }).sort((a,b)=>{
    if(filters.sort==='date-asc')return a.date.localeCompare(b.date)
    if(filters.sort==='date-desc')return b.date.localeCompare(a.date)
    if(filters.sort==='amount-asc')return toTHB(a)-toTHB(b)
    if(filters.sort==='amount-desc')return toTHB(b)-toTHB(a)
    if(filters.sort==='category')return a.category.localeCompare(b.category)
    return a.status.localeCompare(b.status)
  })
}
