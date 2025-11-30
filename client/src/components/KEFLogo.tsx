export function KEFLogo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Orange Circle - Top Left */}
      <circle cx="40" cy="40" r="28" fill="#E46E6E" />

      {/* Yellow Circle - Top Right */}
      <circle cx="85" cy="40" r="28" fill="#E7D26A" />

      {/* Teal Circle - Bottom Center */}
      <circle cx="62.5" cy="80" r="28" fill="#6EC9C6" />
    </svg>
  );
}
