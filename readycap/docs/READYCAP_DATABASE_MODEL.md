# ReadyCap Database Model

The first schema is organized around strict tenant isolation.

## Core Entities

- `organizations`: tenant boundary.
- `users_profile`: app profile linked to `auth.users`.
- `clients`: organization-owned companies or project sponsors.
- `projects`: financing opportunities under a client.
- `project_members`: project-level access.

## Readiness System

- `project_required_blocks`: global catalog of 12 required blocks.
- `project_block_status`: per-project checklist status.
- `source_documents`: uploaded evidence associated with projects and blocks.
- `deliverables`: draft, reviewed and approved outputs.
- `assumptions`: financial or structuring assumptions with source and validation fields.

## Governance

- `audit_logs`: immutable activity trail from backend workflows.
- `generation_runs`: future-ready record of simulated or AI-assisted generation attempts.

## Key Rules

- Required project blocks are created automatically when a project is inserted.
- A block cannot be validated without notes or associated documents.
- Approved deliverables cannot be updated.
- Approval requires an explicit approver.
- RLS limits reads and writes by organization and project membership.
