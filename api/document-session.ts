import { createSessionCookie, verifyPin } from './_document-auth'

export async function POST(request: Request) {
  if (!process.env.TRIP_DOCUMENT_PIN_HASH || !process.env.TRIP_DOCUMENT_SESSION_SECRET) {
    return Response.json({error:'Document access is not configured'}, {status:503})
  }
  const body = await request.json().catch(()=>null) as {pin?: unknown} | null
  if (typeof body?.pin !== 'string' || !verifyPin(body.pin)) {
    return Response.json({error:'Invalid PIN'}, {status:401})
  }
  return Response.json({ok:true}, {headers:{'set-cookie':createSessionCookie(),'cache-control':'no-store'}})
}
