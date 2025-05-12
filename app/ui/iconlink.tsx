/* app/ui/iconlink.tsx */
import Image from 'next/image';

export default function IconLink({ href, label, svg }: { href: string; label: string; svg: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="
        flex-none                       /* never shrink */
        p-2 rounded-md
        bg-neutral-800/70 hover:bg-neutral-800
        focus:outline-none focus:ring-2 focus:ring-amber-500
      "
    >
      <Image src={svg} alt={label} width={20} height={20} />
    </a>
  );
}
