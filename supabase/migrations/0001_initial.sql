-- 0001_initial.sql
-- Dental SaaS initial schema with clinics, staff, patients, appointments, billing

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- -----------------------------
-- 1️⃣ Clinics table
-- -----------------------------
create table clinics (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    address text,
    phone text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- -----------------------------
-- 2️⃣ Profiles table (staff)
-- -----------------------------
create table profiles (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    clinic_id uuid references clinics(id),
    full_name text not null,
    role text not null check (role in ('admin','dentist','receptionist','billing_manager')),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- -----------------------------
-- 3️⃣ Patients table
-- -----------------------------
create table patients (
    id uuid default uuid_generate_v4() primary key,
    clinic_id uuid references clinics(id),
    full_name text not null,
    birth_date date,
    phone text,
    email text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- -----------------------------
-- 4️⃣ Appointments table
-- -----------------------------
create table appointments (
    id uuid default uuid_generate_v4() primary key,
    patient_id uuid references patients(id) on delete cascade,
    dentist_id uuid references profiles(id),
    receptionist_id uuid references profiles(id),
    clinic_id uuid references clinics(id),
    appointment_date timestamptz not null,
    notes text,
    status text default 'scheduled' check (status in ('scheduled','completed','cancelled')),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- -----------------------------
-- 5️⃣ Billing table
-- -----------------------------
create table billing (
    id uuid default uuid_generate_v4() primary key,
    appointment_id uuid references appointments(id) on delete cascade,
    clinic_id uuid references clinics(id),
    amount numeric(10,2) not null,
    currency text default 'RON',
    paid boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);
