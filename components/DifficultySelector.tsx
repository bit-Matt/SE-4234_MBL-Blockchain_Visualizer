"use client";

interface DifficultySelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const OPTIONS = [1, 2, 3, 4] as const;

export function DifficultySelector({
  value,
  onChange,
  disabled = false,
}: DifficultySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="difficulty-select"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        Difficulty
      </label>
      <select
        id="difficulty-select"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      >
        {OPTIONS.map((d) => (
          <option key={d} value={d}>
            {d} (hash starts with &quot;{String(0).padStart(d, "0")}&quot;)
          </option>
        ))}
      </select>
    </div>
  );
}
