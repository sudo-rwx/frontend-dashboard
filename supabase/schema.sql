-- Phase 1 Database Schema

create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  avatar_url text,
  plan text default 'starter',
  created_at timestamptz default now()
);

create table if not exists connected_pages (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  facebook_page_id text not null,
  page_name text not null,
  page_access_token text,
  created_at timestamptz default now()
);

create table if not exists conversations (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  customer_name text,
  customer_platform text default 'facebook',
  last_message text,
  unread_count integer default 0,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender_role text,
  content text,
  ai_generated boolean default false,
  created_at timestamptz default now()
);

create table if not exists ai_logs (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  prompt text,
  response text,
  model text default 'gemini',
  created_at timestamptz default now()
);

create table if not exists scheduled_posts (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  content text,
  scheduled_for timestamptz,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists analytics_events (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  event_name text,
  event_value integer default 0,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
