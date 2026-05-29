export function TraditionalOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 150" className={className} fill="none" stroke="currentColor">
      <path d="M50,10 L50,0" strokeWidth="2" strokeOpacity="0.5" />
      <polygon points="50,10 80,40 50,70 20,40" fill="currentColor" fillOpacity="0.1" strokeWidth="2" />
      <polygon points="50,40 65,55 50,70 35,55" fill="currentColor" fillOpacity="0.2" strokeWidth="1" />
      <circle cx="50" cy="80" r="10" strokeWidth="2" />
      <circle cx="50" cy="80" r="4" fill="currentColor" />
      <path d="M40,90 Q50,150 20,140 M50,90 Q50,150 50,140 M60,90 Q50,150 80,140" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
}
