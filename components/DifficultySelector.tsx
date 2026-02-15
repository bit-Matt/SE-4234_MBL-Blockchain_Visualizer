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
    <div className="flex flex-col gap-1">
      <label
        htmlFor="difficulty-select"
        className="text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        Difficulty
      </label>
      <select
        id="difficulty-select"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full rounded-xl border px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-violet)] focus:border-[var(--primary-violet)] disabled:opacity-50"
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--text-primary)",
          borderColor: "var(--border-ui)",
        }}
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
