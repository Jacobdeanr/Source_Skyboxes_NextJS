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
          grid grid-cols-[8rem_1fr]
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
