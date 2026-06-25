create extension if not exists pgcrypto;

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null unique,
  role text,
  source text not null,
  created_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'waitlist_signups'
      and policyname = 'allow anon inserts'
  ) then
    create policy "allow anon inserts"
      on public.waitlist_signups
      for insert
      to anon
      with check (true);
  end if;
end $$;
