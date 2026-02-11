"use client";

interface ValidationIndicatorProps {
  isValid: boolean;
}

export function ValidationIndicator({ isValid }: ValidationIndicatorProps) {
  return (
    <div
      className="flex items-center gap-2 rounded-xl px-4 py-3 text-lg font-semibold"
      role="status"
      aria-live="polite"
      style={{
        backgroundColor: isValid ? "var(--success-bg)" : "var(--error-bg)",
        color: isValid ? "var(--success-green)" : "var(--error-red)",
      }}
    >
      <span
        className="h-3 w-3 shrink-0 rounded-full"
        style={{
          backgroundColor: isValid ? "var(--success-green)" : "var(--error-red)",
        }}
        aria-hidden
      />
      {isValid ? "Chain Valid" : "Chain Invalid"}
    </div>
  );
}
