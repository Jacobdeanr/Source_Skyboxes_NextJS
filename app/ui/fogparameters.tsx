import { Swatch } from "./swatch";
import { ParamSection, ParamRow } from './parametersections';

type Fog = { primaryFogColor?: number[]; secondaryFogColor?: number[] };

export default function FogParams(f: Fog) {
  if (!f || (!f.primaryFogColor && !f.secondaryFogColor)) return null;
  return (
    <ParamSection title="Fog Parameters">
      {f.primaryFogColor?.length && (
          <ParamRow label="Primary Fog Color">
            <Swatch rgb={f.primaryFogColor!}/>
          </ParamRow>
        )}
      {f.secondaryFogColor?.length && (
          <ParamRow label="Secondary Fog Color">
            <Swatch rgb={f.secondaryFogColor!}/>
          </ParamRow>
        )}
    </ParamSection>
  );
}
