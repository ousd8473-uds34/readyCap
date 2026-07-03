create extension if not exists "pgcrypto";

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('asesor', 'despacho', 'dueno_directo')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.users_profile (
  id uuid primary key references auth.users(id),
  organization_id uuid references public.organizations(id),
  full_name text not null,
  role text not null check (role in ('owner', 'admin', 'analyst', 'reviewer', 'viewer')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) not null,
  name text not null,
  type text,
  tax_id text,
  country text default 'Mexico',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) not null,
  client_id uuid references public.clients(id) not null,
  name text not null,
  sector text not null check (sector in ('bienes_raices', 'turismo', 'agroindustria', 'otro')),
  funding_type text not null check (funding_type in ('credito', 'equity', 'mixto')),
  amount_requested numeric,
  currency text default 'MXN',
  status text not null default 'draft' check (status in ('draft', 'intake', 'in_progress', 'in_review', 'approved', 'archived')),
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references auth.users(id) not null,
  role text not null check (role in ('owner', 'admin', 'analyst', 'reviewer', 'viewer')),
  created_at timestamptz default now(),
  unique(project_id, user_id)
);

create table public.project_required_blocks (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  description text,
  block_type text not null,
  is_required boolean default true,
  display_order int not null,
  created_at timestamptz default now()
);

create table public.project_block_status (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  block_id uuid references public.project_required_blocks(id) not null,
  status text not null default 'pendiente' check (status in ('pendiente', 'en_proceso', 'en_revision', 'validado', 'observado', 'no_aplica')),
  progress_percentage int default 0 check (progress_percentage >= 0 and progress_percentage <= 100),
  notes text,
  updated_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(project_id, block_id)
);

create table public.source_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) not null,
  client_id uuid references public.clients(id),
  project_id uuid references public.projects(id) on delete cascade not null,
  block_id uuid references public.project_required_blocks(id),
  document_type text,
  file_name text not null,
  storage_path text not null,
  mime_type text,
  file_size bigint,
  uploaded_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create table public.deliverables (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) not null,
  project_id uuid references public.projects(id) on delete cascade not null,
  block_id uuid references public.project_required_blocks(id),
  type text not null check (type in ('plan_negocios', 'viabilidad', 'mercado_marketing', 'riesgos', 'modelo_financiero', 'corporativo', 'kyc_cumplimiento', 'viabilidad_financiera', 'transparencia_documental', 'esg_impact', 'ods_onu', 'impacto_ambiental_social_gobernanza', 'paquete_final')),
  version int not null default 1,
  status text not null default 'borrador' check (status in ('borrador', 'revisado', 'aprobado', 'enviado')),
  file_path text,
  created_by uuid references auth.users(id),
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.assumptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) not null,
  project_id uuid references public.projects(id) on delete cascade not null,
  deliverable_id uuid references public.deliverables(id),
  field_name text not null,
  value text not null,
  source text,
  source_document_id uuid references public.source_documents(id),
  is_validated boolean default false,
  validated_by uuid references auth.users(id),
  validated_at timestamptz,
  created_at timestamptz default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) not null,
  user_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz default now()
);

create table public.generation_runs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) not null,
  project_id uuid references public.projects(id) on delete cascade not null,
  deliverable_id uuid references public.deliverables(id),
  engine text,
  model_name text,
  status text not null default 'pending' check (status in ('pending', 'running', 'completed', 'failed')),
  input_tokens int,
  output_tokens int,
  estimated_cost numeric,
  error_message text,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  completed_at timestamptz
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger touch_organizations_updated_at before update on public.organizations for each row execute function public.touch_updated_at();
create trigger touch_users_profile_updated_at before update on public.users_profile for each row execute function public.touch_updated_at();
create trigger touch_clients_updated_at before update on public.clients for each row execute function public.touch_updated_at();
create trigger touch_projects_updated_at before update on public.projects for each row execute function public.touch_updated_at();
create trigger touch_project_block_status_updated_at before update on public.project_block_status for each row execute function public.touch_updated_at();
create trigger touch_deliverables_updated_at before update on public.deliverables for each row execute function public.touch_updated_at();

create or replace function public.current_user_org_id()
returns uuid
language sql
security definer
stable
as $$
  select organization_id from public.users_profile where id = auth.uid()
$$;

create or replace function public.current_user_org_role()
returns text
language sql
security definer
stable
as $$
  select role from public.users_profile where id = auth.uid()
$$;

create or replace function public.user_can_access_project(project_uuid uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.projects p
    where p.id = project_uuid
      and p.organization_id = public.current_user_org_id()
      and (
        public.current_user_org_role() in ('owner', 'admin')
        or exists (
          select 1 from public.project_members pm
          where pm.project_id = p.id and pm.user_id = auth.uid()
        )
      )
  )
$$;

create or replace function public.create_default_project_blocks()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.project_block_status (project_id, block_id, status, progress_percentage)
  select new.id, id, 'pendiente', 0
  from public.project_required_blocks
  where is_required = true;

  insert into public.project_members (project_id, user_id, role)
  values (new.id, new.created_by, 'owner')
  on conflict do nothing;

  return new;
end;
$$;

create trigger create_default_project_blocks_after_project_insert
after insert on public.projects
for each row execute function public.create_default_project_blocks();

create or replace function public.prevent_approved_deliverable_update()
returns trigger
language plpgsql
as $$
begin
  if old.status = 'aprobado' then
    raise exception 'Approved deliverables are immutable; create a new version instead.';
  end if;

  if new.status = 'aprobado' and new.approved_by is null then
    raise exception 'Approved deliverables require an approver.';
  end if;

  return new;
end;
$$;

create trigger prevent_approved_deliverable_update_before_update
before update on public.deliverables
for each row execute function public.prevent_approved_deliverable_update();

create or replace function public.prevent_invalid_block_validation()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'validado'
    and coalesce(trim(new.notes), '') = ''
    and not exists (
      select 1 from public.source_documents sd
      where sd.project_id = new.project_id and sd.block_id = new.block_id
    )
  then
    raise exception 'A block needs notes or associated documents before validation.';
  end if;

  return new;
end;
$$;

create trigger prevent_invalid_block_validation_before_update
before update on public.project_block_status
for each row execute function public.prevent_invalid_block_validation();

alter table public.organizations enable row level security;
alter table public.users_profile enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.project_required_blocks enable row level security;
alter table public.project_block_status enable row level security;
alter table public.source_documents enable row level security;
alter table public.deliverables enable row level security;
alter table public.assumptions enable row level security;
alter table public.audit_logs enable row level security;
alter table public.generation_runs enable row level security;

create policy "Users can read their organization" on public.organizations for select using (id = public.current_user_org_id());
create policy "Users can read own profile" on public.users_profile for select using (id = auth.uid() or organization_id = public.current_user_org_id());

create policy "Org users read clients" on public.clients for select using (organization_id = public.current_user_org_id());
create policy "Org admins create clients" on public.clients for insert with check (organization_id = public.current_user_org_id());
create policy "Org users update clients" on public.clients for update using (organization_id = public.current_user_org_id());

create policy "Project access read" on public.projects for select using (public.user_can_access_project(id));
create policy "Org users create projects" on public.projects for insert with check (organization_id = public.current_user_org_id() and created_by = auth.uid());
create policy "Project members update projects" on public.projects for update using (public.user_can_access_project(id));

create policy "Project members read members" on public.project_members for select using (public.user_can_access_project(project_id));
create policy "Project owners manage members" on public.project_members for all using (public.user_can_access_project(project_id));

create policy "Required blocks readable" on public.project_required_blocks for select using (true);

create policy "Project members read blocks" on public.project_block_status for select using (public.user_can_access_project(project_id));
create policy "Project members update blocks" on public.project_block_status for update using (public.user_can_access_project(project_id));

create policy "Project members read source documents" on public.source_documents for select using (organization_id = public.current_user_org_id() and public.user_can_access_project(project_id));
create policy "Project members create source documents" on public.source_documents for insert with check (organization_id = public.current_user_org_id() and public.user_can_access_project(project_id));

create policy "Project members read deliverables" on public.deliverables for select using (organization_id = public.current_user_org_id() and public.user_can_access_project(project_id));
create policy "Project members create deliverables" on public.deliverables for insert with check (organization_id = public.current_user_org_id() and public.user_can_access_project(project_id));
create policy "Project members update non-approved deliverables" on public.deliverables for update using (organization_id = public.current_user_org_id() and public.user_can_access_project(project_id) and status <> 'aprobado');

create policy "Project members read assumptions" on public.assumptions for select using (organization_id = public.current_user_org_id() and public.user_can_access_project(project_id));
create policy "Project members manage assumptions" on public.assumptions for all using (organization_id = public.current_user_org_id() and public.user_can_access_project(project_id));

create policy "Project members read audit logs" on public.audit_logs for select using (organization_id = public.current_user_org_id());

create policy "Project members read generation runs" on public.generation_runs for select using (organization_id = public.current_user_org_id() and public.user_can_access_project(project_id));
create policy "Project members create generation runs" on public.generation_runs for insert with check (organization_id = public.current_user_org_id() and public.user_can_access_project(project_id));
