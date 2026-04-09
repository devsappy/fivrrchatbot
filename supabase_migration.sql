-- Create user_websites table
create table if not exists public.user_websites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  url text not null,
  created_at timestamptz not null default now()
);

-- Index for fast per-user lookups
create index if not exists user_websites_user_id_idx on public.user_websites(user_id);

-- Enable Row Level Security
alter table public.user_websites enable row level security;

-- Drop existing policies (idempotent)
drop policy if exists "select_own_websites" on public.user_websites;
drop policy if exists "insert_own_websites" on public.user_websites;
drop policy if exists "delete_own_websites" on public.user_websites;
drop policy if exists "update_own_websites" on public.user_websites;

-- Users can only read their own websites
create policy "select_own_websites"
  on public.user_websites for select
  using (auth.uid() = user_id);

-- Users can only insert their own websites
create policy "insert_own_websites"
  on public.user_websites for insert
  with check (auth.uid() = user_id);

-- Users can only delete their own websites
create policy "delete_own_websites"
  on public.user_websites for delete
  using (auth.uid() = user_id);

-- Users can only update their own websites
create policy "update_own_websites"
  on public.user_websites for update
  using (auth.uid() = user_id);


-- Create activity_events table for dashboard activity feed
create table if not exists public.activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  description text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists activity_events_user_id_idx on public.activity_events(user_id);
create index if not exists activity_events_created_at_idx on public.activity_events(created_at desc);

alter table public.activity_events enable row level security;

drop policy if exists "select_own_activity" on public.activity_events;
drop policy if exists "insert_own_activity" on public.activity_events;

create policy "select_own_activity"
  on public.activity_events for select
  using (auth.uid() = user_id);

create policy "insert_own_activity"
  on public.activity_events for insert
  with check (auth.uid() = user_id);


-- Create website_insights table for caching PageSpeed results
create table if not exists public.website_insights (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references public.user_websites(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  performance_score integer,
  accessibility_score integer,
  best_practices_score integer,
  seo_score integer,
  insights jsonb not null default '[]',
  raw_data jsonb,
  fetched_at timestamptz not null default now()
);

create index if not exists website_insights_website_id_idx on public.website_insights(website_id);
create index if not exists website_insights_user_id_idx on public.website_insights(user_id);

alter table public.website_insights enable row level security;

drop policy if exists "select_own_insights" on public.website_insights;
drop policy if exists "insert_own_insights" on public.website_insights;
drop policy if exists "delete_own_insights" on public.website_insights;

create policy "select_own_insights"
  on public.website_insights for select
  using (auth.uid() = user_id);

create policy "insert_own_insights"
  on public.website_insights for insert
  with check (auth.uid() = user_id);

create policy "delete_own_insights"
  on public.website_insights for delete
  using (auth.uid() = user_id);