-- カーウェス買取実績サイト：Supabaseスキーマ
-- Supabaseダッシュボード > SQL Editor にこのファイルの内容を貼り付けて実行してください。

create extension if not exists "pgcrypto";

-- 買取実績本体
create table if not exists purchase_results (
  id uuid primary key default gen_random_uuid(),
  management_number text unique not null,
  slug text unique not null,
  maker text not null,
  maker_slug text not null,
  car_name text not null,
  grade text,
  model_code text,
  year integer not null,
  mileage integer not null,
  mileage_unknown boolean default false,
  purchase_price integer not null,
  prefecture text not null default '新潟県',
  city text not null,
  area_slug text not null,
  purchase_date date not null,
  condition text not null,
  condition_slug text not null,
  inspection_status text,
  drive_type text,
  fuel_type text,
  body_color text,
  damage_details text,
  customer_request text,
  assessment_point text,
  staff_comment text,
  main_image_url text not null default '/images/placeholder-car.svg',
  status text not null default 'draft' check (status in ('draft', 'published', 'hidden')),
  seo_title text,
  meta_description text,
  is_featured boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

-- 車両ごとの追加画像（メイン画像以外）
create table if not exists purchase_result_images (
  id uuid primary key default gen_random_uuid(),
  purchase_result_id uuid not null references purchase_results(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- updated_at を自動更新するトリガー
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_purchase_results_updated_at on purchase_results;
create trigger trg_purchase_results_updated_at
  before update on purchase_results
  for each row execute function set_updated_at();

-- RLS（行レベルセキュリティ）を有効化
alter table purchase_results enable row level security;
alter table purchase_result_images enable row level security;

-- 一般公開：statusが'published'のものだけ誰でも閲覧できる
drop policy if exists "public can read published results" on purchase_results;
create policy "public can read published results"
  on purchase_results for select
  using (status = 'published');

drop policy if exists "public can read images of published results" on purchase_result_images;
create policy "public can read images of published results"
  on purchase_result_images for select
  using (
    exists (
      select 1 from purchase_results
      where purchase_results.id = purchase_result_images.purchase_result_id
        and purchase_results.status = 'published'
    )
  );

-- 管理画面からの追加・編集・削除は、アプリのサーバー側（service_role キー）から行うため、
-- ここでは anon キー向けの insert / update / delete ポリシーはあえて作らない
-- （service_role キーはRLSを自動的にバイパスします）

-- 画像保存用のStorageバケット（まだ画像アップロードUIは未実装ですが、先に用意しておく）
insert into storage.buckets (id, name, public)
values ('purchase-results', 'purchase-results', true)
on conflict (id) do nothing;
