"use client";

interface ValidationIndicatorProps {
  isValid: boolean;
}

export function ValidationIndicator({ isValid }: ValidationIndicatorProps) {
  return (
    <div
      className="mt-3 flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-semibold"
      role="status"
      aria-live="polite"
      style={{
        backgroundColor: isValid
          ? "rgb(5 46 22 / 0.15)"
          : "rgb(127 29 29 / 0.15)",
        color: isValid
          ? "rgb(22 163 74)"
          : "rgb(239 68 68)",
      }}
    >
      <span
        className="h-3 w-3 shrink-0 rounded-full"
        style={{
          backgroundColor: isValid
            ? "rgb(22 163 74)"
            : "rgb(239 68 68)",
        }}
        aria-hidden
      />
      {isValid ? "Chain Valid" : "Chain Invalid"}
    </div>
  );
}
