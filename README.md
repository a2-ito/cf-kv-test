# KV Test App (Next.js + Cloudflare Workers KV)

A learning-oriented web application to manage Cloudflare Workers KV via a GUI.
Built with Next.js (App Router) and deployed on Cloudflare Pages.

## Overview

This is a simple GUI-based application for learning and testing Cloudflare Workers KV.

このアプリは Cloudflare Workers KV を学習・検証するための GUI 管理アプリです。

You can:
- List keys
- Get a value by key
- Add or update a key
- Delete a key

The app is intentionally kept minimal and easy to understand.

以下の操作が可能です：
- キー一覧取得
- キーの値取得
- キーの追加・更新
- キーの削除

学習用途を前提に、構成はできるだけシンプルにしています。

## Tech Stack

- Next.js (App Router)
- Cloudflare Pages
- Cloudflare Workers KV
- TypeScript
- OpenNext
- KV Namespace

This application uses the following KV namespace: `KV_TEST`

## Project Structure

```
src/
├─ app/
│  ├─ page.tsx              # GUI (Client Component)
│  └─ api/kv/
│     ├─ list/route.ts      # GET  - list keys
│     ├─ get/route.ts       # GET  - get value
│     ├─ put/route.ts       # POST - create / update
│     └─ delete/route.ts    # POST - delete
```

## API Endpoints

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/kv/list`        | List all keys       |
| GET    | `/api/kv/get?key=xxx` | Get value           |
| POST   | `/api/kv/put`         | Create / update key |
| POST   | `/api/kv/delete`      | Delete key          |

## Local Development
```
npm install
wrangler dev
```

## Notes & Limitations

- Workers KV is eventually consistent
- put() followed by get() may not reflect immediately
- Values are stored as strings
- JSON values must be manually stringify / parse

- Workers KV は 即時一貫性ではありません
- put 直後の get で値が反映されないことがあります
- 値はすべて 文字列として保存されます
- JSON を扱う場合は JSON.stringify / JSON.parse が必要です

