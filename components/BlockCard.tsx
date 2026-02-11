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
  isMining?: boolean;
  isInvalid?: boolean;
  highlightPreviousHash?: boolean;
  onHashHover?: (hovering: boolean) => void;
}

export function BlockCard({
  block,
  previousHash,
  isMining = false,
  isInvalid = false,
  highlightPreviousHash = false,
  onHashHover,
}: BlockCardProps) {
  const prevHashMatches =
    previousHash === null || block.previousHash === previousHash;

  return (
    <article
      className={`w-full min-w-[280px] max-w-sm shrink-0 rounded-2xl border p-4 ${isMining ? "block-card-mining" : ""}`}
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: isInvalid ? "var(--error-red)" : "var(--border-ui)",
        borderWidth: "1px",
      }}
      data-block-index={block.index}
    >
      <div
        className="mb-3 flex items-center justify-between border-b pb-2"
        style={{ borderColor: "var(--border-ui)" }}
      >
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          Block #{block.index}
        </span>
      </div>

      <dl className="space-y-2 text-sm">
        <div>
          <dt style={{ color: "var(--text-secondary)" }}>Timestamp</dt>
          <dd
            className="font-mono"
            style={{ color: "var(--text-primary)" }}
          >
            {new Date(block.timestamp).toLocaleString()}
          </dd>
        </div>
        <div>
          <dt style={{ color: "var(--text-secondary)" }}>Data</dt>
          <dd
            className="break-words font-mono"
            style={{ color: "var(--text-primary)" }}
          >
            {block.data}
          </dd>
        </div>
        <div>
          <dt style={{ color: "var(--text-secondary)" }}>Previous hash</dt>
          <dd
            className={`font-mono hash-link-glow ${highlightPreviousHash ? "highlight" : ""}`}
            style={{
              color: prevHashMatches
                ? "var(--success-green)"
                : "var(--error-red)",
            }}
            title={block.previousHash}
          >
            {truncateHash(block.previousHash)}
            {!prevHashMatches && " (does not match)"}
          </dd>
        </div>
        <div>
          <dt style={{ color: "var(--text-secondary)" }}>Nonce</dt>
          <dd
            className="font-mono"
            style={{ color: "var(--text-primary)" }}
          >
            {block.nonce}
          </dd>
        </div>
        <div>
          <dt style={{ color: "var(--text-secondary)" }}>Hash</dt>
          <dd
            className="font-mono"
            style={{ color: "var(--text-primary)" }}
            title={block.hash}
            onMouseEnter={() => onHashHover?.(true)}
            onMouseLeave={() => onHashHover?.(false)}
            role="presentation"
          >
            {truncateHash(block.hash)}
          </dd>
        </div>
      </dl>
    </article>
  );
}
