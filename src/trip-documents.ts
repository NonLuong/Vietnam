import { icon } from './icons'
import { tripDocumentCategories, tripDocuments, type TripDocumentCategory, type TripDocument } from './trip-document-data'
import { getStoredDocument, listStoredDocumentIds, removeStoredDocument, storeDocument } from './trip-document-store'

type BindOptions = {render: () => void; back: () => void; toast: (message: string, type?: 'ok' | 'error') => void}
type PendingAction = {kind: 'open' | 'download'; id: string} | {kind: 'download-all'} | null

let selectedCategory: TripDocumentCategory | 'all' = 'all'
let offlineIds: Set<string> | null = null
let viewer: {document: TripDocument; url: string} | null = null
let unlockOpen = false
let pendingAction: PendingAction = null
let busy = false

const esc = (value: string) => value.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character] as string))

function documentCard(document: TripDocument) {
  const offline = offlineIds?.has(document.id) || false
  return `<article class="trip-document-card">
    <button class="trip-document-main" type="button" data-open-trip-document="${document.id}">
      <span class="trip-document-icon">${icon('file')}</span>
      <span><strong>${esc(document.title)}</strong><small>${esc(document.description)}</small>${document.groupName?`<small>${esc(document.groupName)}</small>`:''}</span>
      <span class="document-chevron" aria-hidden="true">›</span>
    </button>
    <div class="trip-document-meta"><span>${document.owners.map(owner=>`<span class="tag">${esc(owner)}</span>`).join('')}</span><span class="offline-badge ${offline?'ready':''}">${offline?icon('check',16):icon('download',16)} ${offline?'พร้อมใช้ออฟไลน์':'ยังไม่ได้เก็บในเครื่อง'}</span></div>
    <div class="trip-document-actions"><button class="btn compact" type="button" data-download-trip-document="${document.id}">${icon('download',18)} ${offline?'อัปเดตไฟล์':'เก็บไว้ออฟไลน์'}</button>${offline?`<button class="btn compact" type="button" data-remove-trip-document="${document.id}">เอาออกจากเครื่อง</button>`:''}</div>
  </article>`
}

function unlockDialog() {
  return `<div class="modal-backdrop document-unlock-backdrop"><form class="modal small-modal document-unlock" id="documentUnlockForm" role="dialog" aria-modal="true" aria-labelledby="documentUnlockTitle"><div class="modal-head"><div><h2 id="documentUnlockTitle">เปิดเอกสารส่วนตัว</h2><p>ใส่ PIN เอกสารครั้งเดียว อุปกรณ์นี้จะจดจำการเข้าถึงไว้</p></div><button class="icon-btn" type="button" data-close-document-unlock aria-label="ปิด">${icon('close')}</button></div><label class="field"><span>PIN เอกสาร</span><input class="input" id="documentPin" type="password" inputmode="numeric" autocomplete="current-password" required autofocus></label><div class="modal-actions"><button class="btn" type="button" data-close-document-unlock>ยกเลิก</button><button class="btn primary" type="submit">ยืนยัน</button></div></form></div>`
}

function viewerDialog() {
  if (!viewer) return ''
  return `<div class="document-viewer-backdrop"><section class="document-viewer" role="dialog" aria-modal="true" aria-labelledby="documentViewerTitle"><header><div><h2 id="documentViewerTitle">${esc(viewer.document.title)}</h2><small>${viewer.document.owners.map(esc).join(' · ')}</small></div><div class="actions"><a class="btn compact" href="${viewer.url}" download="${viewer.document.id}.pdf">${icon('download')} ดาวน์โหลด</a><button class="icon-btn" type="button" data-close-document-viewer aria-label="ปิดเอกสาร">${icon('close')}</button></div></header><iframe src="${viewer.url}#toolbar=1&navpanes=0&view=FitH" title="${esc(viewer.document.title)}"></iframe></section></div>`
}

export function renderTripDocuments() {
  const visible = selectedCategory === 'all' ? tripDocuments : tripDocuments.filter(document => document.category === selectedCategory)
  const ready = offlineIds?.size || 0
  return `<div class="page-head"><div><h1>เอกสารทริป</h1><p>ตั๋ว การจอง และประกันที่จำเป็นระหว่างเดินทาง</p></div><div class="actions"><button class="btn" type="button" data-back-from-documents>กลับ</button><button class="btn primary" type="button" data-download-all-documents ${busy?'disabled':''}>${icon('download')} เก็บทั้งหมดไว้ออฟไลน์</button></div></div>
  <section class="card document-offline-summary"><span class="document-summary-icon">${icon('file')}</span><div><strong>เอกสารพร้อมใช้ในเครื่อง ${ready} / ${tripDocuments.length} ไฟล์</strong><small>ดาวน์โหลดไว้ก่อนเดินทาง เพื่อเปิดดูได้แม้ไม่มีอินเทอร์เน็ต</small></div><div class="document-progress" aria-label="ดาวน์โหลดแล้ว ${ready} จาก ${tripDocuments.length}"><span style="width:${ready/tripDocuments.length*100}%"></span></div></section>
  <nav class="document-categories" aria-label="หมวดเอกสาร"><button type="button" class="${selectedCategory==='all'?'active':''}" data-document-category="all"><strong>ทั้งหมด</strong><small>${tripDocuments.length} ไฟล์</small></button>${tripDocumentCategories.map(category=>`<button type="button" class="${selectedCategory===category.id?'active':''}" data-document-category="${category.id}"><span>${icon(category.icon)}</span><strong>${category.label}</strong><small>${tripDocuments.filter(document=>document.category===category.id).length} ไฟล์</small></button>`).join('')}</nav>
  <section class="document-list" aria-live="polite">${visible.map(documentCard).join('')}</section>${unlockOpen?unlockDialog():''}${viewerDialog()}`
}

async function fetchDocument(document: TripDocument): Promise<Blob> {
  const response = await fetch(`/api/trip-document?id=${encodeURIComponent(document.id)}`, {credentials:'same-origin'})
  if (response.status === 401) throw new Error('DOCUMENT_LOCKED')
  if (response.status === 404) throw new Error('DOCUMENT_MISSING')
  if (!response.ok) throw new Error('DOCUMENT_FAILED')
  const blob = await response.blob()
  if (blob.type && blob.type !== 'application/pdf') throw new Error('DOCUMENT_INVALID')
  return blob
}

async function runAction(action: Exclude<PendingAction, null>, options: BindOptions) {
  const document = 'id' in action ? tripDocuments.find(item=>item.id===action.id) : null
  try {
    busy = true
    options.render()
    if (action.kind === 'download-all') {
      for (const item of tripDocuments) await storeDocument(item.id, item.version, await fetchDocument(item))
      offlineIds = await listStoredDocumentIds()
      options.toast('เก็บเอกสารทั้งหมดไว้ในเครื่องแล้ว')
    } else if (document) {
      const stored = await getStoredDocument(document.id, document.version)
      const blob = action.kind === 'open' && stored ? stored : await fetchDocument(document)
      if (action.kind === 'download') {
        await storeDocument(document.id, document.version, blob)
        offlineIds = await listStoredDocumentIds()
        options.toast('เก็บเอกสารไว้ใช้ออฟไลน์แล้ว')
      } else {
        if (viewer) URL.revokeObjectURL(viewer.url)
        viewer = {document,url:URL.createObjectURL(blob)}
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    if (message === 'DOCUMENT_LOCKED') {
      pendingAction = action
      unlockOpen = true
    } else if (message === 'DOCUMENT_MISSING') options.toast('ยังไม่ได้อัปโหลดไฟล์เอกสารนี้','error')
    else if (!navigator.onLine) options.toast('เอกสารนี้ยังไม่ได้เก็บในเครื่อง และขณะนี้ไม่มีอินเทอร์เน็ต','error')
    else options.toast('เปิดเอกสารไม่สำเร็จ กรุณาลองอีกครั้ง','error')
  } finally {
    busy = false
    options.render()
  }
}

export function bindTripDocuments(options: BindOptions) {
  if (offlineIds === null) void listStoredDocumentIds().then(ids=>{offlineIds=ids;options.render()}).catch(()=>{offlineIds=new Set();options.render()})
  document.querySelector('[data-back-from-documents]')?.addEventListener('click',options.back)
  document.querySelectorAll<HTMLElement>('[data-document-category]').forEach(button=>button.addEventListener('click',()=>{selectedCategory=(button.dataset.documentCategory||'all') as TripDocumentCategory|'all';options.render()}))
  document.querySelectorAll<HTMLElement>('[data-open-trip-document]').forEach(button=>button.addEventListener('click',()=>void runAction({kind:'open',id:button.dataset.openTripDocument||''},options)))
  document.querySelectorAll<HTMLElement>('[data-download-trip-document]').forEach(button=>button.addEventListener('click',()=>void runAction({kind:'download',id:button.dataset.downloadTripDocument||''},options)))
  document.querySelector('[data-download-all-documents]')?.addEventListener('click',()=>void runAction({kind:'download-all'},options))
  document.querySelectorAll<HTMLElement>('[data-remove-trip-document]').forEach(button=>button.addEventListener('click',async()=>{await removeStoredDocument(button.dataset.removeTripDocument||'');offlineIds=await listStoredDocumentIds();options.render();options.toast('เอาเอกสารออกจากเครื่องแล้ว')}))
  document.querySelectorAll('[data-close-document-unlock]').forEach(button=>button.addEventListener('click',()=>{unlockOpen=false;pendingAction=null;options.render()}))
  document.querySelector('[data-close-document-viewer]')?.addEventListener('click',()=>{if(viewer)URL.revokeObjectURL(viewer.url);viewer=null;options.render()})
  document.querySelector<HTMLFormElement>('#documentUnlockForm')?.addEventListener('submit',async event=>{event.preventDefault();const pin=document.querySelector<HTMLInputElement>('#documentPin')?.value||'';busy=true;try{const response=await fetch('/api/document-session',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({pin}),credentials:'same-origin'});if(!response.ok){options.toast(response.status===401?'PIN ไม่ถูกต้อง':'ยังเปิดระบบเอกสารไม่ได้','error');return}const action=pendingAction;pendingAction=null;unlockOpen=false;if(action)await runAction(action,options)}catch{options.toast('เชื่อมต่อระบบเอกสารไม่ได้','error')}finally{busy=false;options.render()}})
}

export function resetTripDocumentViewer() {
  if (viewer) URL.revokeObjectURL(viewer.url)
  viewer = null
  unlockOpen = false
  pendingAction = null
}
