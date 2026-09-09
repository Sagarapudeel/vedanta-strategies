-- Vedanta Strategies CMS schema
-- Run this in the Supabase SQL Editor after creating the project.

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.site_store (
  id text primary key default 'default',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id text primary key,
  name text,
  email text,
  phone text,
  purpose text,
  course_name text,
  institution_name text,
  message text,
  status text not null default 'new',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  name text,
  role text not null default 'content_editor',
  status text not null default 'active',
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ── Seed helper (first visitor can insert default CMS JSON once) ───────────

create or replace function public.ensure_site_store(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  row_data jsonb;
begin
  insert into public.site_store (id, data)
  values ('default', payload)
  on conflict (id) do nothing;
  select data into row_data from public.site_store where id = 'default';
  return row_data;
end;
$$;

-- First auth user becomes super_admin; later users are content editors.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_count integer;
begin
  select count(*) into existing_count from public.profiles;
  insert into public.profiles (id, email, name, role, status, is_primary)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    case when existing_count = 0 then 'super_admin' else 'content_editor' end,
    'active',
    existing_count = 0
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'super_admin'
      and status = 'active'
  );
$$;

create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and status = 'active'
  );
$$;

-- ── Row Level Security ───────────────────────────────────────────────────────

alter table public.site_store enable row level security;
alter table public.leads enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "site_store public read" on public.site_store;
create policy "site_store public read"
  on public.site_store for select
  using (true);

drop policy if exists "site_store auth write" on public.site_store;
create policy "site_store auth write"
  on public.site_store for update
  to authenticated
  using (public.is_active_admin())
  with check (public.is_active_admin());

drop policy if exists "leads public insert" on public.leads;
create policy "leads public insert"
  on public.leads for insert
  with check (true);

drop policy if exists "leads auth read" on public.leads;
create policy "leads auth read"
  on public.leads for select
  to authenticated
  using (public.is_active_admin());

drop policy if exists "leads auth update" on public.leads;
create policy "leads auth update"
  on public.leads for update
  to authenticated
  using (public.is_active_admin())
  with check (public.is_active_admin());

drop policy if exists "leads auth delete" on public.leads;
create policy "leads auth delete"
  on public.leads for delete
  to authenticated
  using (public.is_active_admin());

drop policy if exists "profiles self or admin read" on public.profiles;
create policy "profiles self or admin read"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_active_admin());

drop policy if exists "profiles self or super update" on public.profiles;
create policy "profiles self or super update"
  on public.profiles for update
  to authenticated
  using (id = auth.uid() or public.is_super_admin())
  with check (id = auth.uid() or public.is_super_admin());

drop policy if exists "profiles super delete" on public.profiles;
create policy "profiles super delete"
  on public.profiles for delete
  to authenticated
  using (public.is_super_admin() and is_primary = false);

grant execute on function public.ensure_site_store(jsonb) to anon, authenticated;
grant execute on function public.is_super_admin() to authenticated;
grant execute on function public.is_active_admin() to authenticated;

-- ── Storage: public media bucket ──────────────────────────────────────────────

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read"
  on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "media auth upload" on storage.objects;
create policy "media auth upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_active_admin());

drop policy if exists "media auth update" on storage.objects;
create policy "media auth update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_active_admin());

drop policy if exists "media auth delete" on storage.objects;
create policy "media auth delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_active_admin());

-- Profiles for users created before this trigger existed
insert into public.profiles (id, email, name, role, status, is_primary)
select
  u.id,
  u.email,
  split_part(u.email, '@', 1),
  'super_admin',
  'active',
  true
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id)
limit 1;

alter table public.site_store replica identity full;
alter table public.leads replica identity full;

do $$
begin
  begin
    alter publication supabase_realtime add table public.site_store;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.leads;
  exception when duplicate_object then null;
  end;
end $$;
