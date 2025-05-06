import Image from 'next/image';
import Link  from 'next/link';

type Props = {
    slug: string;
  };

  export default function SkyboxCard({ slug }: Props) {
    const imgBase   = `/Source_Skyboxes_NextJS/skyboxes/${slug}/images`;
    const details   = `/${slug}`;

    const thumbnail = `${imgBase}/thumbnail.webp`;

    //placeholder
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  
    return (
    <Link href={details}>
        <article
            className="
                group
                relative flex flex-col items-center
                bg-neutral-800 ring-1 ring-neutral-700/60
                shadow-lg shadow-black/40
                transition duration-150 hover:scale-105
                overflow-hidden
                aspect-[16/9]
            "
            style={{
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
                
            {/* Visually hidden image for SEO/alt text */}
            <Image
                src={thumbnail}
                alt={`${slug} preview`}
                fill
                className="opacity-0"
                unoptimized
            />
            <div
                className="
                    absolute inset-x-0 bottom-0
                    translate-y-0 opacity-100
                    md:translate-y-full
                    md:opacity-0
                    md:group-hover:translate-y-0
                    md:group-hover:opacity-100
                    bg-black/60 backdrop-blur-xs
                    px-3 py-2
                    transition duration-150
                "
                >
                <h2 className="text-sm font-semibold text-neutral-100 truncate">
                    {slug}
                </h2>
            </div>
        </article>
    </Link>
    );
  }