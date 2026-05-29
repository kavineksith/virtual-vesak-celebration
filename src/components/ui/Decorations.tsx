export function ClayLamp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="lamp-glow-outer" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="lamp-glow-inner" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Flame Outer Glow */}
      <path d="M 50 10 C 62 35 50 55 50 55 C 50 55 38 35 50 10 Z" fill="#F97316" filter="url(#lamp-glow-outer)" className="animate-pulse" />
      <path d="M 50 20 C 57 40 50 55 50 55 C 50 55 43 40 50 20 Z" fill="#FDE047" filter="url(#lamp-glow-inner)" className="animate-pulse" />
      {/* Flame Inner Core */}
      <path d="M 50 35 C 53 45 50 50 50 50 C 50 50 47 45 50 35 Z" fill="#FFFFFF" />
      
      {/* Rest of the Clay Lamp */}
      {/* Clay Bowl / Oil reservoir */}
      <path d="M 25 60 C 25 80 75 80 75 60 Z" className="fill-yellow-900 shadow-inner" />
      <ellipse cx="50" cy="60" rx="25" ry="5" className="fill-yellow-800" />
      {/* Wick */}
      <path d="M 50 55 L 48 62 L 52 62 Z" className="fill-black opacity-60" />
      {/* Base stalk */}
      <path d="M 45 75 L 40 90 L 60 90 L 55 75 Z" className="fill-yellow-950" />
      {/* Base bottom */}
      <path d="M 30 90 C 30 95 70 95 70 90 Z" className="fill-yellow-900" />
    </svg>
  );
}

export function TraditionalOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 150" className={className} fill="none" stroke="currentColor">
      <path d="M50,10 L50,0" strokeWidth="2" strokeOpacity="0.5" />
      <polygon points="50,10 80,40 50,70 20,40" fill="currentColor" fillOpacity="0.1" strokeWidth="2" />
      <polygon points="50,40 65,55 50,70 35,55" fill="currentColor" fillOpacity="0.2" strokeWidth="1" />
      <circle cx="50" cy="80" r="10" strokeWidth="2" />
      <circle cx="50" cy="80" r="4" fill="currentColor" />
      <path d="M40,90 Q50,150 30,130 M50,90 Q50,150 50,140 M60,90 Q50,150 70,130" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M45,90 Q50,150 40,135 M55,90 Q50,150 60,135" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  );
}

export function CornerFrame({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
      <path d="M5,50 L5,5 L50,5" strokeWidth="4" />
      <path d="M15,50 L15,15 L50,15" strokeWidth="1" opacity="0.5" />
      <circle cx="15" cy="15" r="3" fill="currentColor" />
    </svg>
  );
}
