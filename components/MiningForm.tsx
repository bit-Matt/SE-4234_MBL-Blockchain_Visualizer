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
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="block-data"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Block data
        </label>
        <input
          id="block-data"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="e.g. Alice pays Bob 10"
          disabled={miningStatus === "mining"}
          className="min-w-[200px] rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
      </div>
      <button
        type="submit"
        disabled={miningStatus === "mining" || !data.trim()}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {miningStatus === "mining" ? "Mining..." : "Mine"}
      </button>
      {miningStatus === "mining" && (
        <span className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-400"
            aria-hidden
          />
          Mining...
        </span>
      )}
      {miningStatus === "mined" && miningTimeMs > 0 && (
        <span className="text-sm text-zinc-600 dark:text-zinc-300">
          Mined in {miningTimeMs}ms
        </span>
      )}
    </form>
  );
}
