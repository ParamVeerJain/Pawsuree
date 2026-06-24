type WaveProps = {
  fill?: string;
  flip?: boolean;
  className?: string;
};

/** Soft rolling divider between sections — gentle hills, dog-park style. */
export default function Wave({ fill = '#EFF9FE', flip = false, className = '' }: WaveProps) {
  return (
    <svg
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-10 w-full md:h-14 ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <path
        d="M0,42 C180,74 360,8 560,28 C760,48 900,70 1080,46 C1230,26 1340,18 1440,38 L1440,72 L0,72 Z"
        fill={fill}
      />
    </svg>
  );
}
