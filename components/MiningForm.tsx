"use client";

import { useEffect, useState } from "react";

type MiningStatus = "idle" | "mining" | "mined";

interface MiningFormProps {
  onMine: (data: string) => void;
  miningStatus: MiningStatus;
  miningTimeMs: number;
  onResetStatus: () => void;
}

export function MiningForm({
  onMine,
  miningStatus,
  miningTimeMs,
  onResetStatus,
}: MiningFormProps) {
  const [data, setData] = useState("");

  useEffect(() => {
    if (miningStatus !== "mined") return;
    const t = setTimeout(onResetStatus, 3000);
    return () => clearTimeout(t);
  }, [miningStatus, onResetStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = data.trim();
    if (!trimmed || miningStatus === "mining") return;
    onMine(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <label
        htmlFor="block-data"
        className="text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        Block data
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <input
          id="block-data"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="e.g. Alice pays Bob 10"
          disabled={miningStatus === "mining"}
          className="min-w-0 flex-1 rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-violet)] focus:border-[var(--primary-violet)] disabled:opacity-50"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--text-primary)",
            borderColor: "var(--border-ui)",
          }}
        />
        <button
          type="submit"
          disabled={miningStatus === "mining" || !data.trim()}
          className="w-32 shrink-0 rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{
            backgroundColor: "var(--primary-violet)",
            color: "#ffffff",
          }}
        >
          {miningStatus === "mining" ? "Mining..." : "Mine Block"}
        </button>
        {miningStatus === "mining" && (
          <span
            className="flex shrink-0 items-center gap-2 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden
            />
            Mining...
          </span>
        )}
        {miningStatus === "mined" && miningTimeMs > 0 && (
          <span
            className="shrink-0 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Mined in {miningTimeMs}ms
          </span>
        )}
      </div>
    </form>
  );
}
