-- Initial schema migration (stub)
create table clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  auth_uid text unique,
  clinic_id uuid references clinics(id) on delete cascade,
  role text not null,
  full_name text,
  email text,
  created_at timestamptz default now()
);

-- enable RLS
alter table clinics enable row level security;
alter table users enable row level security;
