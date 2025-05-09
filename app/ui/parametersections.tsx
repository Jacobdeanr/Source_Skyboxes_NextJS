import { ReactNode } from 'react';

export function ParamSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  
  return (
    <section className="mt-6 first:mt-0">
      <h4
        className="
          mb-2
          text-xs font-semibold uppercase tracking-wider
          text-neutral-400
        "
      >
        {title}
      </h4>

      <dl
        className="
          grid grid-cols-[8rem_1fr]            /* 8 rem label column */
          gap-y-2 gap-x-4
          text-[clamp(0.85rem,0.9vw,0.95rem)]
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
    children: ReactNode;
  }) {
    return (
      <>
        <dt className="text-neutral-400 font-medium">{label}</dt>
        <dd className="text-neutral-100">{children}</dd>
      </>
    );
  }
