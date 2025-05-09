type Fog = { primaryFogColor?: number[]; secondaryFogColor?: number[] };

export default function FogParams(f: Fog) {
  if (!f || (!f.primaryFogColor && !f.secondaryFogColor)) return null;
  return (
    <div className="text-sm text-neutral-400">
      <h3 className="font-semibold mb-1 mt-2">Fog Parameters</h3>
      <ul className="list-inside space-y-0.5">
        {f.primaryFogColor?.length && (
          <li>
            <span className="font-semibold">Primary Fog Color:</span>{' '}
            {f.primaryFogColor.join(' ')}
          </li>
        )}
        {f.secondaryFogColor?.length && (
          <li>
            <span className="font-semibold">Secondary Fog Color:</span>{' '}
            {f.secondaryFogColor.join(' ')}
          </li>
        )}
      </ul>
    </div>
  );
}
