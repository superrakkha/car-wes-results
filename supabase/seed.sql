-- カーウェス買取実績サイト：初期データ投入（設計書25章の既存16台分の仮データ）
-- schema.sql を実行した後、SQL Editor でこのファイルの内容を実行してください。
-- 画像は現時点ではプレースホルダーのままです。あとで管理画面から編集・画像パスの変更ができます。

insert into purchase_results (management_number, slug, maker, maker_slug, car_name, year, mileage, purchase_price, prefecture, city, area_slug, purchase_date, condition, condition_slug, assessment_point, main_image_url, status)
values
  ('001', 'suzuki-every-wagon-2014-shibata-001', 'スズキ', 'suzuki', 'エブリイワゴン', 2014, 50000, 85000, '新潟県', '新発田市', 'shibata', '2026-07-10', '事故車', 'accident-car', '今回買い取った車両は、フロント部分に損傷があり、国内での再販売は難しい状態でした。しかし、エンジンが始動し、海外で需要のある車種だったため、輸出向け車両として査定しました。使用可能な部品の価値も含め、85,000円で買い取りました。', '/images/placeholder-car.svg', 'published'),
  ('002', 'toyota-prius-2012-niigata-002', 'トヨタ', 'toyota', 'プリウス', 2012, 98000, 210000, '新潟県', '新潟市', 'niigata', '2026-07-05', '中古車', 'used-car', 'ハイブリッドバッテリーの状態が良好で、走行距離のわりに車内の状態もきれいでした。国内中古車市場での需要が高いモデルのため、相場より高めの210,000円で査定しました。', '/images/placeholder-car.svg', 'published'),
  ('003', 'nissan-note-2009-sanjo-003', '日産', 'nissan', 'ノート', 2009, 145000, 30000, '新潟県', '三条市', 'sanjo', '2026-06-28', '過走行', 'high-mileage', null, '/images/placeholder-car.svg', 'published'),
  ('004', 'honda-nbox-2016-tsubame-004', 'ホンダ', 'honda', 'N-BOX', 2016, 62000, 320000, '新潟県', '燕市', 'tsubame', '2026-06-20', '中古車', 'used-car', '軽自動車の中でも人気の高いN-BOXで、内外装ともに状態が良く、車検も長く残っていました。買取相場を踏まえ、320,000円で査定させていただきました。', '/images/placeholder-car.svg', 'published'),
  ('005', 'daihatsu-move-2007-nagaoka-005', 'ダイハツ', 'daihatsu', 'ムーヴ', 2007, 88000, 15000, '新潟県', '長岡市', 'nagaoka', '2026-06-15', '車検切れ', 'no-inspection', '車検が切れて数年経過していましたが、エンジン始動は問題なく、部品取り需要が見込めたため査定額をお付けしました。廃車手続きも無料で代行いたしました。', '/images/placeholder-car.svg', 'published'),
  ('006', 'subaru-legacy-2005-murakami-006', 'スバル', 'subaru', 'レガシィ', 2005, 130000, 45000, '新潟県', '村上市', 'murakami', '2026-06-08', '不動車', 'immobile-car', 'バッテリー上がりによりエンジンがかからない状態でのご相談でしたが、車両自体の状態は良好で、修理後の再販売価値を見込んで45,000円で買い取りました。レッカー引き取りも無料です。', '/images/placeholder-car.svg', 'published'),
  ('007', 'mazda-demio-2013-tainai-007', 'マツダ', 'mazda', 'デミオ', 2013, 71000, 150000, '新潟県', '胎内市', 'tainai', '2026-05-30', '中古車', 'used-car', null, '/images/placeholder-car.svg', 'published'),
  ('008', 'mitsubishi-ek-wagon-2011-agano-008', '三菱', 'mitsubishi', 'eKワゴン', 2011, 105000, 40000, '新潟県', '阿賀野市', 'agano', '2026-05-22', '故障車', 'broken-car', 'エンジン不調のご相談でしたが、駆動系や外装の状態は良く、部品としての需要が見込めたため40,000円で査定しました。お客様のご自宅まで無料で引き取りに伺いました。', '/images/placeholder-car.svg', 'published'),
  ('009', 'toyota-hiace-2003-gosen-009', 'トヨタ', 'toyota', 'ハイエース', 2003, 210000, 180000, '新潟県', '五泉市', 'gosen', '2026-05-15', '過走行', 'high-mileage', '走行距離は多いものの、ハイエースは海外での需要が非常に高く、走行距離が査定額に与える影響は限定的でした。輸出ルートを活用し180,000円で買い取りました。', '/images/placeholder-car.svg', 'published'),
  ('010', 'nissan-serena-2010-seiro-010', '日産', 'nissan', 'セレナ', 2010, 89000, 95000, '新潟県', '聖籠町', 'seiro', '2026-05-08', '事故車', 'accident-car', '後方への追突により、リアバンパーとリアゲートに損傷がありましたが、走行機能に問題はなく、修復後の再販売を見込んで95,000円で査定しました。', '/images/placeholder-car.svg', 'published'),
  ('011', 'suzuki-wagonr-2008-niigata-011', 'スズキ', 'suzuki', 'ワゴンR', 2008, 122000, 25000, '新潟県', '新潟市', 'niigata', '2026-04-28', '廃車', 'haisha', null, '/images/placeholder-car.svg', 'published'),
  ('012', 'honda-fit-2015-shibata-012', 'ホンダ', 'honda', 'フィット', 2015, 55000, 260000, '新潟県', '新発田市', 'shibata', '2026-04-20', '中古車', 'used-car', '禁煙車で内装の状態がとても良く、記録簿も揃っていました。人気のボディカラーだったこともあり、相場より高めの260,000円で買い取らせていただきました。', '/images/placeholder-car.svg', 'published'),
  ('013', 'daihatsu-tanto-2018-sanjo-013', 'ダイハツ', 'daihatsu', 'タント', 2018, 38000, 480000, '新潟県', '三条市', 'sanjo', '2026-04-12', '中古車', 'used-car', '年式が新しく走行距離も少ないため、当社基準でも高値査定となりました。両側電動スライドドアなど装備も充実しており、480,000円で買い取りました。', '/images/placeholder-car.svg', 'published'),
  ('014', 'isuzu-elf-2001-nagaoka-014', 'いすゞ', 'isuzu', 'エルフ', 2001, 178000, 220000, '新潟県', '長岡市', 'nagaoka', '2026-04-03', '不動車', 'immobile-car', 'スターター故障によりエンジンがかからない状態でしたが、商用車としての海外需要が高く、部品と車体の両方の価値を評価して220,000円で査定しました。', '/images/placeholder-car.svg', 'published'),
  ('015', 'mazda-cx5-2013-tainai-015', 'マツダ', 'mazda', 'CX-5', 2013, 76000, 310000, '新潟県', '胎内市', 'tainai', '2026-03-25', '中古車', 'used-car', null, '/images/placeholder-car.svg', 'published'),
  ('016', 'toyota-vitz-2006-murakami-016', 'トヨタ', 'toyota', 'ヴィッツ', 2006, 165000, 12000, '新潟県', '村上市', 'murakami', '2026-03-18', '水没車', 'flooded-car', '大雨による冠水で電装系に不具合が出ていましたが、ボディや部品としての価値を評価し、12,000円で買い取りました。廃車手続きも無料で対応しました。', '/images/placeholder-car.svg', 'published')
on conflict (management_number) do nothing;
