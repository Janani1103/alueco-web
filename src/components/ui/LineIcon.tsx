const icons: Record<string, React.ReactNode> = {
  sliding: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 5v14M8 12h8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  casement: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  folding: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M3 6h5v12H3V6zm5 0h5v12H8V6zm5 0h5v12h-5V6zm5 0h3v12h-3V6z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  swing: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  lift: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="3" y="7" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7V5M16 7V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  tilt: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 12h16M12 4l-4 8M12 4l4 8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  louver: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8h12M6 12h12M6 16h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  fanlight: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="5" y="10" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 10h14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 4v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  ruler: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <rect x="3" y="8" width="18" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8v4M11 8v2M15 8v4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  install: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M14 3l7 7-10 10H4v-7L14 3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  finish: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M12 2l3 7h7l-5.5 4.5 2 7L12 17l-6.5 3.5 2-7L2 9h7l3-7z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  warranty: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path d="M9 12l2 2 4-4M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

export function LineIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`inline-flex text-brand transition-transform duration-200 ${className}`}>
      {icons[name] || icons.sliding}
    </span>
  );
}
