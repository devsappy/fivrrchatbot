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
