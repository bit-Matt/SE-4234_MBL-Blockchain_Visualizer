"use client";

import { useState } from "react";
import type { BlockData } from "@/lib/blockchain";

const HASH_PREVIEW_LEN = 20;

function truncateHash(h: string): string {
  if (h.length <= HASH_PREVIEW_LEN) return h;
  return `${h.substring(0, HASH_PREVIEW_LEN)}...`;
}

interface BlockCardProps {
  block: BlockData;
  previousHash: string | null;
  isMining?: boolean;
  isInvalid?: boolean;
  validationError?: string | null;
  highlightPreviousHash?: boolean;
  onHashHover?: (hovering: boolean) => void;
  onEdit?: (updates: Partial<BlockData>) => void;
}

export function BlockCard({
  block,
  previousHash,
  isMining = false,
  isInvalid = false,
  validationError = null,
  highlightPreviousHash = false,
  onHashHover,
  onEdit,
}: BlockCardProps) {
  const prevHashMatches =
    previousHash === null || block.previousHash === previousHash;

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(block.data);
  const [editTimestamp, setEditTimestamp] = useState(block.timestamp.toString());
  const [editPreviousHash, setEditPreviousHash] = useState(block.previousHash);
  const [editNonce, setEditNonce] = useState(block.nonce.toString());
  const [editHash, setEditHash] = useState(block.hash);

  const handleEditSave = () => {
    if (onEdit) {
      const updates: Partial<BlockData> = {};
      
      if (editData !== block.data) updates.data = editData;
      if (Number(editTimestamp) !== block.timestamp) updates.timestamp = Number(editTimestamp);
      if (editPreviousHash !== block.previousHash) updates.previousHash = editPreviousHash;
      if (Number(editNonce) !== block.nonce) updates.nonce = Number(editNonce);
      if (editHash !== block.hash) updates.hash = editHash;

      if (Object.keys(updates).length > 0) {
        onEdit(updates);
      }
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditData(block.data);
    setEditTimestamp(block.timestamp.toString());
    setEditPreviousHash(block.previousHash);
    setEditNonce(block.nonce.toString());
    setEditHash(block.hash);
    setIsEditing(false);
  };

  return (
    <article
      className={`w-full rounded-2xl border p-4 ${isMining ? "block-card-mining" : ""}`}
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
        {onEdit && (
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            disabled={isMining}
            className="rounded-lg px-2 py-1 text-xs font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
            style={{
              backgroundColor: "var(--primary-violet)",
              color: "#ffffff",
            }}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>

      {isInvalid && validationError && (
        <div
          className="mb-3 rounded-lg px-3 py-2 text-xs font-medium"
          style={{
            backgroundColor: "var(--error-bg)",
            color: "var(--error-red)",
          }}
        >
          {validationError}
        </div>
      )}

      <dl className="space-y-2 text-sm">
        <div>
          <dt style={{ color: "var(--text-secondary)" }}>Timestamp</dt>
          {isEditing ? (
            <input
              type="number"
              value={editTimestamp}
              onChange={(e) => setEditTimestamp(e.target.value)}
              className="w-full rounded border px-2 py-1 text-sm font-mono focus:outline-none focus:ring-1"
              style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-primary)",
                borderColor: "var(--border-ui)",
              }}
            />
          ) : (
            <dd
              className="font-mono"
              style={{ color: "var(--text-primary)" }}
            >
              {new Date(block.timestamp).toLocaleString()}
            </dd>
          )}
        </div>
        <div>
          <dt style={{ color: "var(--text-secondary)" }}>Data</dt>
          {isEditing ? (
            <input
              type="text"
              value={editData}
              onChange={(e) => setEditData(e.target.value)}
              className="w-full rounded border px-2 py-1 text-sm font-mono focus:outline-none focus:ring-1"
              style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-primary)",
                borderColor: "var(--border-ui)",
              }}
            />
          ) : (
            <dd
              className="break-words font-mono"
              style={{ color: "var(--text-primary)" }}
            >
              {block.data}
            </dd>
          )}
        </div>
        <div>
          <dt style={{ color: "var(--text-secondary)" }}>Previous hash</dt>
          {isEditing ? (
            <input
              type="text"
              value={editPreviousHash}
              onChange={(e) => setEditPreviousHash(e.target.value)}
              className="w-full rounded border px-2 py-1 text-sm font-mono focus:outline-none focus:ring-1"
              style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-primary)",
                borderColor: "var(--border-ui)",
              }}
            />
          ) : (
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
          )}
        </div>
        <div>
          <dt style={{ color: "var(--text-secondary)" }}>Nonce</dt>
          {isEditing ? (
            <input
              type="number"
              value={editNonce}
              onChange={(e) => setEditNonce(e.target.value)}
              className="w-full rounded border px-2 py-1 text-sm font-mono focus:outline-none focus:ring-1"
              style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-primary)",
                borderColor: "var(--border-ui)",
              }}
            />
          ) : (
            <dd
              className="font-mono"
              style={{ color: "var(--text-primary)" }}
            >
              {block.nonce}
            </dd>
          )}
        </div>
        <div>
          <dt style={{ color: "var(--text-secondary)" }}>Hash</dt>
          {isEditing ? (
            <input
              type="text"
              value={editHash}
              onChange={(e) => setEditHash(e.target.value)}
              className="w-full rounded border px-2 py-1 text-sm font-mono focus:outline-none focus:ring-1"
              style={{
                backgroundColor: "var(--bg-color)",
                color: "var(--text-primary)",
                borderColor: "var(--border-ui)",
              }}
            />
          ) : (
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
          )}
        </div>
      </dl>

      {isEditing && (
        <div className="mt-3 flex gap-2 border-t pt-3" style={{ borderColor: "var(--border-ui)" }}>
          <button
            type="button"
            onClick={handleEditSave}
            className="flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--success-green)",
              color: "#ffffff",
            }}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleEditCancel}
            className="flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--error-red)",
              color: "#ffffff",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </article>
  );
}
