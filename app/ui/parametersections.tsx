import { ReactNode } from 'react';

export function ParamSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  
  return (
    <section>
      <h4
        className="
          mb-2
          text-sm font-bold uppercase tracking-wider
        "
      >
        {title}
      </h4>

      <dl
        className="
          grid grid grid-cols-[9.5rem_1fr]
          gap-y-2 gap-x-4
          text-sm
          font-sans
        "
      >
        {children}
      </dl>
    </section>
    
  );
}

export function ParamRow({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) {
  return (
    <>
      <dt className="text-neutral-400">{label}</dt>
      <dd >
        {children ?? (
          <span className="italic text-neutral-400">N/A</span>
        )}
      </dd>
    </>
  );
}