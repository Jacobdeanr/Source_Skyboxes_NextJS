type Sun = {
    sunAngle?: string;
    pitch?: string | number;
    brightness?: number[];
    ambience?: number[];
  };
  
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
            <li>
              <span className="font-semibold">Brightness:</span>{' '}
              {s.brightness.join(' ')}
            </li>
          )}
          {s.ambience?.length && (
            <li>
              <span className="font-semibold">Ambient:</span>{' '}
              {s.ambience.join(' ')}
            </li>
          )}
        </ul>
      </div>
    );
  }
  