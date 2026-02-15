"use client";

import { useState } from "react";

interface AutoMineFormProps {
  onAutoMine: (count: number) => void;
  isAutoMining: boolean;
  progress?: { current: number; total: number };
}

export function AutoMineForm({
  onAutoMine,
  isAutoMining,
  progress,
}: AutoMineFormProps) {
  const [count, setCount] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (count > 0 && count <= 10 && !isAutoMining) {
      onAutoMine(count);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <label
        htmlFor="auto-mine-count"
        className="text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        Auto-mine blocks (Max: 10)
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <input
          id="auto-mine-count"
          type="number"
          min="2"
          max="10"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          disabled={isAutoMining}
          className="min-w-0 flex-1 rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-violet)] focus:border-[var(--primary-violet)] disabled:opacity-50"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "var(--text-primary)",
            borderColor: "var(--border-ui)",
          }}
        />
        <button
          type="submit"
          disabled={isAutoMining || count < 2 || count > 10}
          className="w-32 shrink-0 rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{
            backgroundColor: "var(--primary-violet)",
            color: "#ffffff",
          }}
        >
          {isAutoMining ? "Auto-Mining..." : "Auto-Mine"}
        </button>
        {isAutoMining && progress && (
          <div className="flex shrink-0 flex-col gap-1">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Progress: {progress.current} / {progress.total}
            </span>
            <div
              className="h-2 w-32 overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--border-ui)" }}
            >
              <div
                className="h-full transition-all duration-300"
                style={{
                  backgroundColor: "var(--primary-violet)",
                  width: `${(progress.current / progress.total) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
