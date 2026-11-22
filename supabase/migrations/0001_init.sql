-- Run metadata for rate limiting and cost tracking.
-- No uploaded documents or document contents are stored.
create table if not exists public.tool_runs (
  id bigint generated always as identity primary key,
  tool text not null,
  visitor_hash text not null,
  model text,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists tool_runs_visitor_created_idx
  on public.tool_runs (visitor_hash, created_at desc);

-- Only the server (service role) reads or writes this table.
alter table public.tool_runs enable row level security;
