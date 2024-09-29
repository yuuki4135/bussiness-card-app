# デジタル名刺アプリ

## アプリ紹介

DBはsupabaseを利用しております。
主な機能としては、入力した情報を名刺としてわかりやすく情報表示すること
入力したデータは1日後にデータが消えるようにgithubActionsを利用したbach処理も準備しております

## 環境設定の方法
template.envをコピーし、.envにリネームしてください
以下.envの内容を編集してください
```.env
VITE_SUPABASE_URL=<SUPABASEの管理画面で取得したURL>
VITE_SUPABASE_KEY=<SUPABASEの管理画面で取得したキー>
```

## ローカル環境起動の仕方
```bash
npm install
npm run dev
```

## テスト
```bash
npm run test
```

## バージョン
node v20.15.0  
npm 10.7.0
