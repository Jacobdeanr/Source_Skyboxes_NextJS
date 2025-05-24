import { ParamSection, ParamRow } from './parametersections';

type Props = {
    author?: string;
    publishDate?: string;
    timeOfDay?: string;
    weatherCondition?: string;
    description?: string;
  };
  
  export default function Meta({
    author,
    publishDate,
    timeOfDay,
    weatherCondition,
    description,
  }: Props) {
    return (
      <>
        {description && <p className="text-sm text-neutral-300">{description}</p>}
  
        <ParamSection title="Metadata">
          {/* {author && (
            <ParamRow label="Author">
              {author}
          </ParamRow>
          )} */}
          {publishDate && (
            <ParamRow label="Published">
              {publishDate}
            </ParamRow>
          )}
        </ParamSection>
      </>
    );
  }
  