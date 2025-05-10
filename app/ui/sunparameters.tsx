import { Swatch } from "./swatch";
import { ParamSection, ParamRow } from './parametersections';

type Sun = {
    sunAngle?: string;
    pitch?: string | number;
    brightness?: number[];
    ambience?: number[];
  };

  export default function SunParams(s: Sun) {
    const { sunAngle, pitch, brightness, ambience } = s ?? {};
  
    const noData =
      sunAngle === undefined &&
      pitch     === undefined &&
      !brightness &&
      !ambience;
  
    return (
      <ParamSection title="Sun Parameters">
        {noData ? (
          <ParamRow label="">
            <span className="italic text-neutral-500">
              No data available.
            </span>
          </ParamRow>
        ) : (
          <>
            <ParamRow label="Sun Angle">{sunAngle}</ParamRow>
            <ParamRow label="Pitch">{pitch}</ParamRow>
            <ParamRow label="Brightness">
              {brightness && <Swatch rgb={brightness} />}
            </ParamRow>
            <ParamRow label="Ambient">
              {ambience && <Swatch rgb={ambience} />}
            </ParamRow>
          </>
        )}
      </ParamSection>
    );
  }