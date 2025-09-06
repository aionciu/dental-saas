-- 0001_initial.sql
-- Create base tables for clinics, users, patients, appointments, invoices

-- Clinics
create table if not exists clinics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

-- Users (dentists, receptionists, admins, billing managers)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth_uid uuid unique not null, -- maps to Supabase auth.users.id
  clinic_id uuid references clinics(id) on delete cascade,
  role text not null check (role in ('admin', 'dentist', 'receptionist', 'billing_manager')),
  full_name text,
  email text,
  created_at timestamptz default now()
);

-- Patients
create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references clinics(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  birth_date date,
  medical_history jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Appointments
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references clinics(id) on delete cascade,
  patient_id uuid references patients(id) on delete cascade,
  dentist_id uuid references users(id) on delete set null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  notes text,
  status text default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
  created_at timestamptz default now()
);

-- Invoices
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references clinics(id) on delete cascade,
  patient_id uuid references patients(id) on delete cascade,
  amount numeric(10,2) not null,
  status text default 'unpaid' check (status in ('unpaid', 'paid', 'cancelled')),
  issued_at timestamptz default now(),
  due_date timestamptz
);

-- Enable RLS
alter table clinics enable row level security;
alter table users enable row level security;
alter table patients enable row level security;
alter table appointments enable row level security;
alter table invoices enable row level security;

-- Basic policies (you will refine per role later)
create policy "Users can view their own clinic" on clinics
  for select using (true);

create policy "Users can view users in their clinic" on users
  for select using (auth.uid() = auth_uid);

create policy "Users can view patients in their clinic" on patients
  for select using (clinic_id in (select clinic_id from users where auth_uid = auth.uid()));

create policy "Users can view appointments in their clinic" on appointments
  for select using (clinic_id in (select clinic_id from users where auth_uid = auth.uid()));

create policy "Users can view invoices in their clinic" on invoices
  for select using (clinic_id in (select clinic_id from users where auth_uid = auth.uid()));
