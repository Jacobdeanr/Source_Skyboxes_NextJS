type Sun = {
    sunAngle?: string;
    pitch?: string | number;
    brightness?: number[];
    ambience?: number[];
  };

  function Swatch({ rgb }: { rgb: number[] }) {
    const color = `rgb(${rgb.slice(0, 3).join(',')})`;
    return (
      <span
        className="inline-block w-4 h-4 rounded-sm ring-1 ring-neutral-700/50 mr-1 align-middle"
        style={{ backgroundColor: color }}
        title={color}
      />
    );
  }
  
  
export default function SunParams(s: Sun) {
  if (!s || (!s.sunAngle && !s.pitch && !s.brightness && !s.ambience)) return null;

  return (
    <div className="text-sm text-neutral-400">
      <h3 className="font-semibold mb-1">Sun Parameters</h3>
      <ul className="list-inside space-y-0.5">
        {s.sunAngle && (
          <li>
            <span className="font-semibold">Sun Angle:</span> {s.sunAngle}
          </li>
        )}

        {s.pitch !== undefined && (
          <li>
            <span className="font-semibold">Pitch:</span> {s.pitch}
          </li>
        )}

        {s.brightness?.length && (
          <li className="flex items-center">
            <span className="font-semibold mr-1">Brightness:</span>
            <Swatch rgb={s.brightness} />
            {s.brightness.join(' ')}
          </li>
        )}

        {s.ambience?.length && (
          <li className="flex items-center">
            <span className="font-semibold mr-1">Ambient:</span>
            <Swatch rgb={s.ambience} />
            {s.ambience.join(' ')}
          </li>
        )}
      </ul>
    </div>
  );
}