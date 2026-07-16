-- Blog posts table. Source of truth is the local /blogs markdown files;
-- this table is populated only by scripts/sync-blogs.mjs using the service role key.
create table if not exists public.blog_posts (
  slug text primary key,
  title text not null,
  summary text,
  tags text[],
  content_md text not null,
  content_hash text,
  published boolean not null default false,
  published_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

-- Anon (frontend) may only read published posts. No insert/update/delete
-- policies exist for anon or authenticated — writes happen exclusively via
-- the service role key from scripts/sync-blogs.mjs, which bypasses RLS.
create policy "Public can read published posts"
  on public.blog_posts
  for select
  to anon
  using (published = true);
