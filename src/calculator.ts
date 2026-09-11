import { icon } from './icons'

type HistoryItem = { id: string; expression: string; result: number; createdAt: string }
const HISTORY_KEY = 'da-nang-calculator-history-v1'
let expression = ''
let display = '0'
let justCalculated = false

function loadHistory(): HistoryItem[] {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') as HistoryItem[] }
  catch { return [] }
}

function saveHistory(items: HistoryItem[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 50)))
}

function formatResult(value: number) {
  return new Intl.NumberFormat('th-TH', { maximumFractionDigits: 8 }).format(value)
}

function safeCalculate(value: string) {
  const normalized = value.replaceAll('×', '*').replaceAll('÷', '/')
  if (!normalized || !/^[0-9+\-*/().\s]+$/.test(normalized)) throw new Error('invalid')
  const result = Function(`"use strict"; return (${normalized})`)() as unknown
  if (typeof result !== 'number' || !Number.isFinite(result)) throw new Error('invalid')
  return result
}

function button(label: string, value: string, className = '') {
  return `<button class="calc-key ${className}" data-calc-value="${value}" aria-label="${label}">${label}</button>`
}

function historyHtml(history: HistoryItem[]) {
  if (!history.length) return `<div class="empty">${icon('calculator',34)}<strong>ยังไม่มีประวัติ</strong><span>ผลลัพธ์ที่กดเครื่องหมายเท่ากับจะปรากฏที่นี่</span></div>`
  return history.map(item => `<button class="history-item" data-history-id="${item.id}"><span><strong>${item.expression}</strong><small>${new Intl.DateTimeFormat('th-TH',{dateStyle:'medium',timeStyle:'short'}).format(new Date(item.createdAt))}</small></span><b>${formatResult(item.result)}</b></button>`).join('')
}

export function calculator() {
  const history = loadHistory()
  return `<div class="page-head"><div><h1>เครื่องคิดเลข</h1><p>คำนวณค่าใช้จ่ายระหว่างวางแผน พร้อมบันทึกประวัติอัตโนมัติ</p></div></div>
  <section class="calculator-layout">
    <article class="card calculator-card">
      <div class="calc-screen" aria-live="polite"><div class="calc-expression">${expression || 'พร้อมคำนวณ'}</div><output class="calc-result" id="calcResult">${display}</output></div>
      <div class="calc-grid" role="group" aria-label="แป้นเครื่องคิดเลข">
        ${button('ล้าง','clear','utility')}${button('ลบ','backspace','utility')}${button('%','%','utility')}${button('÷','÷','operator')}
        ${button('7','7')}${button('8','8')}${button('9','9')}${button('×','×','operator')}
        ${button('4','4')}${button('5','5')}${button('6','6')}${button('−','-','operator')}
        ${button('1','1')}${button('2','2')}${button('3','3')}${button('+','+','operator')}
        ${button('0','0','zero')}${button('.','.')}${button('=','equals','equals')}
      </div>
      <button class="btn copy-result" id="copyCalcResult">คัดลอกผลลัพธ์</button>
      <p class="calc-hint">ใช้แป้นพิมพ์ตัวเลข เครื่องหมายคำนวณ และ Enter ได้</p>
    </article>
    <article class="card history-card">
      <div class="section-head"><div><h2>ประวัติการคำนวณ</h2><small>เก็บสูงสุด 50 รายการในอุปกรณ์นี้</small></div>${history.length?'<button class="btn danger" id="clearCalcHistory">ล้างประวัติ</button>':''}</div>
      <div id="calcHistory">${historyHtml(history)}</div>
    </article>
  </section>`
}

function updateView() {
  const screen = document.querySelector<HTMLOutputElement>('#calcResult')
  const formula = document.querySelector<HTMLElement>('.calc-expression')
  if (screen) screen.textContent = display
  if (formula) formula.textContent = expression || 'พร้อมคำนวณ'
}

function refreshHistory() {
  const history = document.querySelector('#calcHistory')
  if (history) history.innerHTML = historyHtml(loadHistory())
}

function calculate() {
  try {
    const original = expression
    const result = safeCalculate(expression)
    const history = loadHistory()
    history.unshift({ id: crypto.randomUUID(), expression: `${original} =`, result, createdAt: new Date().toISOString() })
    saveHistory(history)
    display = formatResult(result)
    expression = String(result)
    justCalculated = true
    refreshHistory()
    updateView()
  } catch {
    display = 'คำนวณไม่ได้'
    justCalculated = true
    updateView()
  }
}

function inputValue(value: string) {
  if (value === 'clear') { expression = ''; display = '0'; justCalculated = false }
  else if (value === 'backspace') { expression = expression.slice(0, -1); display = expression || '0'; justCalculated = false }
  else if (value === 'equals') { calculate(); return }
  else if (value === '%') { if (expression) { expression = `(${expression})/100`; calculate(); return } }
  else {
    if (justCalculated && /[0-9.]/.test(value)) expression = ''
    expression += value
    display = expression
    justCalculated = false
  }
  updateView()
}

export function registerCalculatorEvents() {
  document.addEventListener('click', event => {
    const target = event.target as HTMLElement
    const key = target.closest<HTMLElement>('[data-calc-value]')
    if (key) inputValue(key.dataset.calcValue || '')
    const historyButton = target.closest<HTMLElement>('[data-history-id]')
    if (historyButton) {
      const item = loadHistory().find(x => x.id === historyButton.dataset.historyId)
      if (item) { expression = String(item.result); display = formatResult(item.result); justCalculated = true; updateView() }
    }
    if (target.closest('#clearCalcHistory') && confirm('ล้างประวัติการคำนวณทั้งหมดหรือไม่?')) { saveHistory([]); refreshHistory() }
    if (target.closest('#copyCalcResult')) navigator.clipboard.writeText(display).catch(() => undefined)
  })
  document.addEventListener('keydown', event => {
    if (!document.querySelector('.calculator-card') || (event.target as HTMLElement).matches('input,textarea,select')) return
    if (/^[0-9.+\-*/()]$/.test(event.key)) { event.preventDefault(); inputValue(event.key.replace('*','×').replace('/','÷')) }
    else if (event.key === 'Enter' || event.key === '=') { event.preventDefault(); inputValue('equals') }
    else if (event.key === 'Backspace') { event.preventDefault(); inputValue('backspace') }
    else if (event.key === 'Escape') { event.preventDefault(); inputValue('clear') }
  })
}
