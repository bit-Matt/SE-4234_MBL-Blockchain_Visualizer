"use client";

import type { BlockData } from "@/lib/blockchain";

const HASH_PREVIEW_LEN = 10;

function truncateHash(h: string): string {
  if (h.length <= HASH_PREVIEW_LEN) return h;
  return `${h.substring(0, HASH_PREVIEW_LEN)}...`;
}

interface BlockCardProps {
  block: BlockData;
  previousHash: string | null;
}

export function BlockCard({ block, previousHash }: BlockCardProps) {
  const prevHashMatches =
    previousHash === null || block.previousHash === previousHash;

  return (
    <article
      className="w-full min-w-[280px] max-w-sm rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
      data-block-index={block.index}
    >
      <div className="mb-3 flex items-center justify-between border-b border-zinc-100 pb-2 dark:border-zinc-800">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Block #{block.index}
        </span>
      </div>

      <dl className="space-y-2 text-sm">
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Timestamp</dt>
          <dd className="font-mono text-zinc-900 dark:text-zinc-100">
            {new Date(block.timestamp).toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Data</dt>
          <dd className="break-words font-mono text-zinc-900 dark:text-zinc-100">
            {block.data}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Previous hash</dt>
          <dd
            className={`font-mono ${
              prevHashMatches
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
            title={block.previousHash}
          >
            {truncateHash(block.previousHash)}
            {!prevHashMatches && " (does not match)"}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Nonce</dt>
          <dd className="font-mono text-zinc-900 dark:text-zinc-100">
            {block.nonce}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Hash</dt>
          <dd
            className="font-mono text-zinc-900 dark:text-zinc-100"
            title={block.hash}
          >
            {truncateHash(block.hash)}
          </dd>
        </div>
      </dl>
    </article>
  );
}
