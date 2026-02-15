"use client";

import type { BlockData } from "@/lib/blockchain";

interface TransactionLedgerProps {
  blocks: BlockData[];
}

export function TransactionLedger({ blocks }: TransactionLedgerProps) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-ui)",
      }}
    >
      <h3
        className="mb-3 text-sm font-semibold uppercase tracking-wide"
        style={{ color: "var(--text-secondary)" }}
      >
        Transaction Ledger
      </h3>
      <ul className="space-y-1 text-sm">
        {blocks.map((block) => (
          <li
            key={block.hash}
            className="font-mono"
            style={{ color: "var(--text-primary)" }}
          >
            <span style={{ color: "var(--text-secondary)" }}>
              Block {block.index}:
            </span>{" "}
            {block.data}
          </li>
        ))}
      </ul>
    </div>
  );
}
