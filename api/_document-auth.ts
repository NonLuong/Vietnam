import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

const COOKIE_NAME = 'trip_document_session'
const SESSION_AGE_SECONDS = 60 * 60 * 24 * 30

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export function verifyPin(pin: string) {
  const expected = process.env.TRIP_DOCUMENT_PIN_HASH || ''
  const actual = createHash('sha256').update(pin).digest('hex')
  return Boolean(expected) && safeEqual(actual, expected)
}

export function createSessionCookie() {
  const secret = process.env.TRIP_DOCUMENT_SESSION_SECRET || ''
  if (!secret) throw new Error('TRIP_DOCUMENT_SESSION_SECRET is not configured')
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_AGE_SECONDS
  const signature = createHmac('sha256', secret).update(String(expiresAt)).digest('hex')
  return `${COOKIE_NAME}=${expiresAt}.${signature}; Max-Age=${SESSION_AGE_SECONDS}; Path=/api; HttpOnly; Secure; SameSite=Strict`
}

export function hasValidDocumentSession(request: Request) {
  const secret = process.env.TRIP_DOCUMENT_SESSION_SECRET || ''
  if (!secret) return false
  const cookie = request.headers.get('cookie')?.split(';').map(value=>value.trim()).find(value=>value.startsWith(`${COOKIE_NAME}=`))
  const token = cookie?.slice(COOKIE_NAME.length + 1) || ''
  const [expiresAt, signature] = token.split('.')
  if (!expiresAt || !signature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false
  const expected = createHmac('sha256', secret).update(expiresAt).digest('hex')
  return safeEqual(signature, expected)
}
