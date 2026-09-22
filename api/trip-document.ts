import { createClient } from '@supabase/supabase-js'
import { hasValidDocumentSession } from './_document-auth'
import { documentPaths } from './_trip-document-paths'

export async function GET(request: Request) {
  if (!hasValidDocumentSession(request)) return Response.json({error:'Unauthorized'}, {status:401})
  const id = new URL(request.url).searchParams.get('id') || ''
  const path = documentPaths[id]
  if (!path) return Response.json({error:'Document not found'}, {status:404})

  const supabaseUrl = process.env.SUPABASE_URL || ''
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  const bucket = process.env.TRIP_DOCUMENT_BUCKET || 'trip-documents'
  if (!supabaseUrl || !serviceRoleKey) return Response.json({error:'Storage is not configured'}, {status:503})

  const client = createClient(supabaseUrl, serviceRoleKey, {auth:{persistSession:false,autoRefreshToken:false}})
  const {data, error} = await client.storage.from(bucket).createSignedUrl(path, 60)
  if (error || !data?.signedUrl) return Response.json({error:'Document not found'}, {status:404})
  const file = await fetch(data.signedUrl)
  if (!file.ok || !file.body) return Response.json({error:'Document download failed'}, {status:502})

  return new Response(file.body, {headers:{
    'content-type':'application/pdf',
    'content-disposition':`inline; filename="${id}.pdf"`,
    'cache-control':'private, no-store',
    'x-content-type-options':'nosniff'
  }})
}
