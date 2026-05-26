-- =====================================================================
-- Migração 07: Avatar (foto) do usuário do gabinete
-- =====================================================================

-- 1) Coluna nova em perfis
alter table public.perfis add column if not exists avatar_url text;

-- 2) Bucket "avatars" no Storage (público pra exibir foto)
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true)
  on conflict (id) do nothing;

-- 3) Policies do bucket avatars
drop policy if exists "avatar public read" on storage.objects;
create policy "avatar public read" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "avatar auth write" on storage.objects;
create policy "avatar auth write" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.uid() is not null);

drop policy if exists "avatar auth update" on storage.objects;
create policy "avatar auth update" on storage.objects
  for update using (bucket_id = 'avatars' and auth.uid() is not null);

drop policy if exists "avatar auth delete" on storage.objects;
create policy "avatar auth delete" on storage.objects
  for delete using (bucket_id = 'avatars' and auth.uid() is not null);
