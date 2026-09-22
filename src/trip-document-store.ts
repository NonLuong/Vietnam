const DB_NAME = 'da-nang-trip-documents'
const STORE_NAME = 'pdf-files'
const DB_VERSION = 1

type StoredDocument = {id: string; version: number; blob: Blob; savedAt: number}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(STORE_NAME)) database.createObjectStore(STORE_NAME, {keyPath:'id'})
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error || new Error('เปิดพื้นที่เก็บเอกสารไม่ได้'))
  })
}

async function transaction<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const tx = database.transaction(STORE_NAME, mode)
    const request = run(tx.objectStore(STORE_NAME))
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error || new Error('จัดการเอกสารออฟไลน์ไม่สำเร็จ'))
    tx.oncomplete = () => database.close()
    tx.onerror = () => reject(tx.error || new Error('จัดการเอกสารออฟไลน์ไม่สำเร็จ'))
  })
}

export async function getStoredDocument(id: string, version: number): Promise<Blob | null> {
  const record = await transaction<StoredDocument | undefined>('readonly', store => store.get(id))
  return record?.version === version ? record.blob : null
}

export async function storeDocument(id: string, version: number, blob: Blob): Promise<void> {
  await transaction<IDBValidKey>('readwrite', store => store.put({id, version, blob, savedAt:Date.now()} satisfies StoredDocument))
}

export async function removeStoredDocument(id: string): Promise<void> {
  await transaction<undefined>('readwrite', store => store.delete(id))
}

export async function listStoredDocumentIds(): Promise<Set<string>> {
  const records = await transaction<StoredDocument[]>('readonly', store => store.getAll())
  return new Set(records.map(record => record.id))
}
