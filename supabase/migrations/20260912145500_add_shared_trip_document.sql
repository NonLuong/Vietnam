create table if not exists public.trip_documents (
  slug text primary key,
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  schema_version integer not null default 2 check (schema_version > 0),
  revision bigint not null default 1 check (revision > 0),
  updated_at timestamptz not null default now()
);

alter table public.trip_documents enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on table public.trip_documents to anon, authenticated;
revoke delete, truncate on table public.trip_documents from anon, authenticated;

create policy "shared trip can be viewed"
on public.trip_documents for select
to anon, authenticated
using (slug = 'da-nang-trip-2026');

create policy "shared trip can be created"
on public.trip_documents for insert
to anon, authenticated
with check (slug = 'da-nang-trip-2026');

create policy "shared trip can be updated"
on public.trip_documents for update
to anon, authenticated
using (slug = 'da-nang-trip-2026')
with check (slug = 'da-nang-trip-2026');

create or replace function public.touch_trip_document()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  new.revision = old.revision + 1;
  return new;
end;
$$;

revoke all on function public.touch_trip_document() from public, anon, authenticated;

create trigger touch_trip_document_before_update
before update on public.trip_documents
for each row execute function public.touch_trip_document();

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'trip_documents'
  ) then
    alter publication supabase_realtime add table public.trip_documents;
  end if;
end $$;
