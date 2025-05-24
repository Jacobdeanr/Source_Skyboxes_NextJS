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
          : 'inline-flex items-center justify-center w-10 h-10 p-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-800/70 border border-neutral-700/50 transition-colors'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
      `}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image 
          src={svg} 
          alt="" 
          width={20}
          height={20}
          className="object-contain w-full h-full"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            aspectRatio: '1/1'
          }}
        />
      </div>
      {/* Show label only in menu mode */}
      {menuMode && <span className="flex-grow ml-2">{label}</span>}
    </a>
  );
}
