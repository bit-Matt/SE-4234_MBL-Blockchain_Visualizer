# Blockchain Visualizer

A web application that visualizes how blockchain works. You can see blocks, mine new blocks, and watch validation happen in real time.

## Features

- **Chain display** – Each block is shown as a card with block number, timestamp, data, previous hash, nonce, and hash. Visual linking shows when a block’s “Previous hash” matches the previous block’s “Hash” (green when valid).
- **Mining** – Enter block data (e.g. “Alice pays Bob 10”), click Mine, and see a “Mining…” state and “Mined in Xms” when done.
- **Validation** – A clear “Chain Valid” (green) or “Chain Invalid” (red) indicator that updates when the chain changes.
- **Difficulty** – Choose difficulty 1–4 (number of leading zeros required in the hash).

Built with Next.js, React, TypeScript, Tailwind CSS, and [crypto-js](https://github.com/brix/crypto-js) for SHA-256. All logic runs in the browser; no backend required.

## How to run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Screenshot / demo

_(Add a screenshot or GIF of the app here. Optional: link to a live demo on Vercel.)_

## Deploy on Vercel

Connect this repo to [Vercel](https://vercel.com). Use the default Next.js build settings (`npm run build`, output directory `.next`). No environment variables are required for the core app.

## Project structure

- `app/` – Next.js App Router (page, layout, global styles)
- `components/` – React components: `BlockchainVisualizer`, `BlockCard`, `ValidationIndicator`, `DifficultySelector`, `MiningForm`
- `lib/blockchain.ts` – `Block` and `Blockchain` classes and validation helper
