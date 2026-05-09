type Props = {
  opacity?: number;
  className?: string;
};

export function Grain({ opacity = 0.05, className = "" }: Props) {
  return (
    <div
      aria-hidden
      style={{ opacity }}
      className={`pointer-events-none fixed inset-0 z-[60] mix-blend-overlay ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="wjc-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#wjc-grain)" />
      </svg>
    </div>
  );
}
