import { createClient, type RealtimeChannel } from '@supabase/supabase-js'
import type { AppData } from './types'

const SUPABASE_URL = 'https://zrrdfsogkjgtwuzmviwc.supabase.co'
const SUPABASE_KEY = 'sb_publishable_NLZ-PVHXE-61Yxb0CwaWOQ_Buo_y7Dp'
const TRIP_SLUG = 'da-nang-trip-2026'
const SCHEMA_VERSION = 2

type TripRow = {
  slug: string
  data: AppData
  schema_version: number
  revision: number
  updated_at: string
}

const client = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
})

export function isAppData(value: unknown): value is AppData {
  if (!value || typeof value !== 'object') return false
  const item = value as Partial<AppData>
  return Boolean(
    item.settings &&
    typeof item.settings.tripName === 'string' &&
    Number.isFinite(item.settings.budgetTHB) &&
    Number.isFinite(item.settings.exchangeRate) &&
    Array.isArray(item.settings.travelers) &&
    Array.isArray(item.expenses) &&
    Array.isArray(item.days)
  )
}

export async function loadOrCreateTrip(localData: AppData): Promise<AppData> {
  const { data: row, error } = await client
    .from('trip_documents')
    .select('slug,data,schema_version,revision,updated_at')
    .eq('slug', TRIP_SLUG)
    .maybeSingle<TripRow>()

  if (error) throw error
  if (row) {
    if (!isAppData(row.data)) throw new Error('รูปแบบข้อมูลกลางไม่ถูกต้อง')
    return row.data
  }

  const { error: createError } = await client.from('trip_documents').insert({
    slug: TRIP_SLUG,
    data: localData,
    schema_version: SCHEMA_VERSION
  })

  if (createError?.code === '23505') return loadOrCreateTrip(localData)
  if (createError) throw createError
  return localData
}

export async function saveTrip(data: AppData): Promise<void> {
  const { error } = await client.from('trip_documents').upsert({
    slug: TRIP_SLUG,
    data,
    schema_version: SCHEMA_VERSION
  }, { onConflict: 'slug' })
  if (error) throw error
}

export function subscribeToTrip(onUpdate: (data: AppData) => void): RealtimeChannel {
  return client.channel('da-nang-trip-updates')
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'trip_documents', filter: `slug=eq.${TRIP_SLUG}`
    }, payload => {
      const next = (payload.new as Partial<TripRow>).data
      if (isAppData(next)) onUpdate(next)
    })
    .subscribe()
}
