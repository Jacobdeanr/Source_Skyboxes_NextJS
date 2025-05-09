import { Swatch } from "./swatch";
import { ParamSection, ParamRow } from './parametersections';

type Sun = {
    sunAngle?: string;
    pitch?: string | number;
    brightness?: number[];
    ambience?: number[];
  };

  export default function SunParams(s: Sun) {
    if (!s) return null;
  
    const { sunAngle, pitch, brightness, ambience } = s;
  
    if (!sunAngle && pitch === undefined && !brightness && !ambience) return null;
  
    return (
      <ParamSection title="Sun Parameters">
        {sunAngle && <ParamRow label="Sun Angle">{sunAngle}</ParamRow>}
  
        {pitch !== undefined && <ParamRow label="Pitch">{pitch}</ParamRow>}
  
        {brightness && (
          <ParamRow label="Brightness">
            <Swatch rgb={brightness} />
          </ParamRow>
        )}
  
        {ambience && (
          <ParamRow label="Ambient">
            <Swatch rgb={ambience} />
          </ParamRow>
        )}
      </ParamSection>
    );
  }