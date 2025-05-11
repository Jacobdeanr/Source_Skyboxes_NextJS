type SwatchProps = { rgb: number[] };

export function Swatch({ rgb }: SwatchProps) {
  const [r, g, b] = rgb;
  const color  = `rgb(${r},${g},${b})`;
  const values = rgb.join(' ');

  return (
    <span
      className="
        inline-flex overflow-hidden rounded-md ring-1 ring-neutral-700/40
      "
      title={color}
    >
      <span
        className="w-8 self-stretch shrink-0"
        style={{ backgroundColor: color }}
      />

      <span
        className="
          px-2 flex items-center
          bg-neutral-800
        "
      >
        {values}
      </span>
    </span>
  );
}