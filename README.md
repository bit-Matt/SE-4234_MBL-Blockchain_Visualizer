# Blockchain Visualizer

A web application that visualizes how blockchain works. You can see blocks, mine new blocks, and watch validation happen in real time.

**Live demo:** [https://se-4234-mbl-blockchain-visualizer.vercel.app/](https://se-4234-mbl-blockchain-visualizer.vercel.app/)

## Features

- **Chain display** – Each block is shown as a card with block number, timestamp, data, previous hash, nonce, and hash. Visual linking shows when a block’s “Previous hash” matches the previous block’s “Hash” (green when valid).
- **Mining** – Enter block data (e.g. “Alice pays Bob 10”), click Mine Block, and see a “Mining…” state and “Mined in Xms” when done.
- **Validation** – A clear “Chain Valid” (green) or “Chain Invalid” (red) indicator that updates when the chain changes. Invalid blocks show an error message explaining why (e.g. tampered hash or broken link).
- **Difficulty** – Choose difficulty 1–4 (number of leading zeros required in the hash).
- **Tampering demo** – Edit any block’s data, timestamp, nonce, or hash directly. The chain becomes invalid and the affected block shows a red border and error message.
- **Auto-mine** – Mine multiple blocks at once (2–10) with a progress indicator.
- **Transaction ledger** – A simple list of all block data in order.
- **Reset chain** – Reset the blockchain back to the genesis block.
- **Theme** – Dark mode (default) and light mode with a toggle in the header.

Built with Next.js, React, TypeScript, Tailwind CSS, and [crypto-js](https://github.com/brix/crypto-js) for SHA-256. All logic runs in the browser; no backend required.

## How to run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

- `app/` – Next.js App Router (page, layout, global styles)
- `components/` – `BlockchainVisualizer`, `BlockCard`, `ValidationIndicator`, `DifficultySelector`, `MiningForm`, `AutoMineForm`, `TransactionLedger`, `ThemeToggle`
- `lib/blockchain.ts` – `Block` and `Blockchain` classes, validation and error helpers
- `docs/` – Design system and project instructions
