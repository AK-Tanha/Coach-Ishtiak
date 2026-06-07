export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-brand-border/30 rounded-xl ${className}`} />;
}
