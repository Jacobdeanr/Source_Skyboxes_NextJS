/* app/ui/iconlink.tsx */
import Image from 'next/image';

interface IconLinkProps {
  href: string;
  label: string;
  svg: string;
  menuMode?: boolean;
}

export default function IconLink({ href, label, svg, menuMode = false }: IconLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      // Apply different styles based on menuMode
      className={`
        ${menuMode 
          ? 'flex items-center gap-3 w-full px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-800' 
          : 'flex-none w-8 h-8 flex items-center justify-center p-2 rounded-md bg-neutral-800/70 hover:bg-neutral-800'
        }
        focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors
      `}
    >
      <div className="flex items-center justify-center">
        <Image 
          src={svg} 
          alt="" 
          width={20} 
          height={20} 
          className="object-contain max-w-full max-h-full" 
        />
      </div>
      {/* Show label only in menu mode */}
      {menuMode && <span className="flex-grow">{label}</span>}
    </a>
  );
}
