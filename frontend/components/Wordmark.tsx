/**
 * Faithful vector recreation of the PawSure wordmark:
 * chunky rounded caps with a pale ice-blue fill and cornflower-blue outline,
 * plus the lowercase tagline. Scales crisply from navbar to full hero width.
 */

type WordmarkProps = {
  className?: string;
  tagline?: boolean;
  /** 'brand' = ice fill / pool stroke (light backgrounds). 'inverse' = for dark footer. */
  theme?: 'brand' | 'inverse';
  title?: string;
};

export default function Wordmark({
  className,
  tagline = false,
  theme = 'brand',
  title = 'PawSure',
}: WordmarkProps) {
  const fill = theme === 'brand' ? '#D9F1FB' : '#142E4C';
  const stroke = theme === 'brand' ? '#4A87C8' : '#D9F1FB';
  const tagFill = theme === 'brand' ? '#5B94D3' : '#9CC4E8';

  return (
    <svg
      viewBox={tagline ? '0 0 700 200' : '0 0 700 140'}
      role="img"
      aria-label={title}
      className={className}
    >
      <text
        x="350"
        y="112"
        textAnchor="middle"
        textLength="664"
        lengthAdjust="spacingAndGlyphs"
        rotate="-2 2 -2.5 2 -2 1.5 -1.5"
        style={{
          fontFamily: 'var(--font-logo)',
          fontSize: 118,
          fill,
          stroke,
          strokeWidth: 8,
          strokeLinejoin: 'round',
          paintOrder: 'stroke fill',
          letterSpacing: 2,
        }}
      >
        PAWSURE
      </text>
      {tagline && (
        <text
          x="350"
          y="178"
          textAnchor="middle"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 44,
            fill: tagFill,
            letterSpacing: 1,
          }}
        >
          your one pet-stop.
        </text>
      )}
    </svg>
  );
}
