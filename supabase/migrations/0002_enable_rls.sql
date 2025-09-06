-- 0002_enable_rls.sql
-- Enable Row-Level Security and policies for multi-tenant Dental SaaS

-- -----------------------------
-- 1️⃣ Profiles table
-- -----------------------------
alter table profiles enable row level security;

-- Users can view their own profile
create policy "Users can view their own profile"
on profiles
for select
using (id = auth.uid() or user_id = auth.uid());

-- Admins can manage all profiles in their clinic
create policy "Admins can manage clinic profiles - select"
on profiles
for select
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = profiles.clinic_id
    )
);

create policy "Admins can manage clinic profiles - update"
on profiles
for update
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = profiles.clinic_id
    )
);

create policy "Admins can manage clinic profiles - delete"
on profiles
for delete
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = profiles.clinic_id
    )
);

create policy "Admins can manage clinic profiles - insert"
on profiles
for insert
with check (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = profiles.clinic_id
    )
);

-- -----------------------------
-- 2️⃣ Patients table
-- -----------------------------
alter table patients enable row level security;

-- Clinic staff can view patients
create policy "Clinic staff can view patients"
on patients
for select
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.clinic_id = patients.clinic_id
    )
);

-- Admin can insert patients
create policy "Admins can insert patients"
on patients
for insert
with check (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = patients.clinic_id
    )
);

-- Admin can update patients
create policy "Admins can update patients"
on patients
for update
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = patients.clinic_id
    )
);

-- Admin can delete patients
create policy "Admins can delete patients"
on patients
for delete
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = patients.clinic_id
    )
);

-- -----------------------------
-- 3️⃣ Appointments table
-- -----------------------------
alter table appointments enable row level security;

-- Clinic staff can view appointments
create policy "Clinic staff can view appointments"
on appointments
for select
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.clinic_id = appointments.clinic_id
    )
);

-- Admin can insert appointments
create policy "Admins can insert appointments"
on appointments
for insert
with check (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = appointments.clinic_id
    )
);

-- Admin can update appointments
create policy "Admins can update appointments"
on appointments
for update
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = appointments.clinic_id
    )
);

-- Admin can delete appointments
create policy "Admins can delete appointments"
on appointments
for delete
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = appointments.clinic_id
    )
);

-- -----------------------------
-- 4️⃣ Billing table
-- -----------------------------
alter table billing enable row level security;

-- Admin can insert billing
create policy "Admins can insert billing"
on billing
for insert
with check (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = billing.clinic_id
    )
);

-- Admin can update billing
create policy "Admins can update billing"
on billing
for update
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = billing.clinic_id
    )
);

-- Admin can delete billing
create policy "Admins can delete billing"
on billing
for delete
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.role = 'admin' and p.clinic_id = billing.clinic_id
    )
);

-- Clinic staff can view billing (optional)
create policy "Clinic staff can view billing"
on billing
for select
using (
    exists (
        select 1 from profiles p
        where p.user_id = auth.uid() and p.clinic_id = billing.clinic_id
    )
);
