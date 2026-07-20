# カーウェス買取実績サイト（フェーズ1＋簡易管理画面＋Supabase接続）

設計書のフェーズ1（見た目）、簡易管理画面（車両の追加・編集・削除）に加えて、
今回から **Supabase（共有データベース）に接続**しました。これにより、管理画面で追加した車両が
（サイトを公開した後は）他のパソコン・スマホからも見えるようになります。

## 重要：これだけでは「誰でも見れる」は完成しません

Supabase接続は「データを共有DBに置く」部分の解決策です。
`npm run dev` は今もご自身のパソコンの中だけで動くサーバーなので、Supabaseに繋いだだけでは
**他の人のスマホ・パソコンからはまだ見れません**。

「誰でも見れる」を完成させるには、この後もう1段階、**サイト自体をVercelなどにデプロイして公開URLを持つ**
必要があります（設計書フェーズ7）。デプロイの手順は、Supabase接続が動くことを確認できたら
ご案内します。

## セットアップ手順

### 1. Supabaseプロジェクトを作る

1. https://supabase.com にアクセスし、アカウント作成・ログイン
2. 「New project」でプロジェクトを作成（リージョンは Tokyo (ap-northeast-1) がおすすめ）
3. 作成が終わったら、左メニューの「SQL Editor」を開く

### 2. テーブルを作る

`supabase/schema.sql` の中身を全部コピーして、SQL Editorに貼り付けて実行（Run）してください。

- `purchase_results` テーブル（買取実績本体）
- `purchase_result_images` テーブル（追加画像用。まだ使っていません）
- 一般公開用の閲覧ポリシー（`status = 'published'` のものだけ誰でも見れる設定）
- 画像保存用のStorageバケット（`purchase-results`。まだアップロードUIは未実装ですが先に用意）

### 3. 初期データを入れる

`supabase/seed.sql` の中身を全部コピーして、同じくSQL Editorで実行してください。
以前の仮データ16台がテーブルに入ります。

### 4. APIキーを取得する

Supabaseダッシュボードの「Project Settings」→「API」を開き、以下をメモしてください。

- Project URL
- `anon` `public` キー
- `service_role` キー（⚠️ 絶対に公開しない、Gitにコミットしない）

### 5. 環境変数を設定する

`.env.local.example` を `.env.local` という名前でコピーし、上でメモした値を入れてください。

```powershell
Copy-Item .env.local.example .env.local
```

その後 `.env.local` をVS Codeで開いて、3つの値を実際のものに書き換えて保存してください。

### 6. インストールして起動

```bash
npm install
npm run dev
```

- 公開サイト： http://localhost:3000
- 管理画面： http://localhost:3000/admin/login （パスワード：`carwes2026`）

管理画面で車両を1台登録し、トップページの一覧にすぐ反映されるか確認してみてください。
反映されていれば、Supabaseへの読み書きが正常に動いています。

## 今回変更したファイル

- `lib/supabase.ts`（新規）：Supabaseクライアント（公開用・管理用の2つ）
- `lib/store.ts`：JSONファイルへの読み書き → Supabaseへの読み書きに全面変更
  （関数名・使い方はそのままなので、呼び出し側のページはawaitを付けただけです）
- `app/(site)/page.tsx`, `components/ResultGrid.tsx`, `app/admin/page.tsx`,
  `app/admin/results/page.tsx`, `app/admin/results/[id]/edit/page.tsx`, `lib/actions.ts`：
  データ取得が非同期（Supabaseへの通信）になったため、`async`/`await` に対応
- `supabase/schema.sql`（新規）：テーブル定義・RLS設定・Storageバケット
- `supabase/seed.sql`（新規）：初期データ16台分のINSERT文
- `.env.local.example`（新規）：環境変数のひな形
- `package.json`：`@supabase/supabase-js` を依存関係に追加

- `components/admin/ResultForm.tsx`, `lib/actions.ts`：メイン画像を「URL入力」から「ファイルアップロード」に変更。
  選んだ画像はSupabase Storageの `purchase-results` バケットに保存され、公開URLがデータベースに保存されます。
  画像を選ばなかった場合は、今までの画像（編集時）またはプレースホルダー画像がそのまま使われます。

## まだ実装していないもの（次のフェーズ）

- サイトの本番デプロイ（Vercelなど）… ★これをやると「誰でも見れる」が完成します
- Supabase Auth（今は簡易パスワードのみ）
- 画像アップロードUI（実装済み。ただしWebP変換・複数枚対応・ドラッグ＆ドロップはまだ）
- 詳細ページ `/results/[slug]`
- メーカー別・地域別・状態別ページの自動生成
- sitemap.xml / robots.txt などの本格的なSEO設定

## 動作確認したいポイント

- `npm run dev` 後、Supabaseの接続エラーが出ていないか（ターミナルに赤いエラーが出ていないか）
- `/admin/results/new` で1台登録すると、`/`（トップページ）にすぐ反映されるか
- 編集・削除もSupabase側にちゃんと反映されるか（Supabaseダッシュボードの「Table Editor」で直接確認できます）
