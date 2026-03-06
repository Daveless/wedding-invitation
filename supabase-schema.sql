-- ============================================================
-- Wedding Invitation App — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. GUESTS TABLE
create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  token uuid unique not null default gen_random_uuid(),
  created_at timestamptz default now()
);

-- 2. RSVP TABLE
create table if not exists rsvp (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid references guests(id) on delete cascade,
  attending boolean not null,
  comments text,
  submitted_at timestamptz default now()
);

-- 3. SONG REQUESTS TABLE
create table if not exists song_requests (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid references guests(id) on delete cascade,
  song text not null,
  submitted_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- These allow the anonymous (browser) client to insert
-- RSVP and song requests, but not read others' data.
-- The service role key (server-side) bypasses RLS.
-- ============================================================

-- Enable RLS on all tables
alter table guests enable row level security;
alter table rsvp enable row level security;
alter table song_requests enable row level security;

-- GUESTS: No public reads or writes (only service role can read)
-- (No policies = no access for anon)

-- RSVP: Allow insert by anyone (anon key), no select
create policy "Allow anon insert rsvp"
  on rsvp for insert
  to anon
  with check (true);

-- SONG REQUESTS: Allow insert by anyone (anon key), no select
create policy "Allow anon insert songs"
  on song_requests for insert
  to anon
  with check (true);

-- ============================================================
-- SAMPLE DATA (optional — for testing)
-- ============================================================
-- insert into guests (name) values ('María García');
-- insert into guests (name) values ('Carlos López');
-- After inserting, copy the token from the guests table
-- and visit: /invite/{token}
