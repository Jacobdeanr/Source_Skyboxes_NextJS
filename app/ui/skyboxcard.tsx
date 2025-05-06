import Image from 'next/image';
import Link  from 'next/link';

type Props = {
    slug: string;
  };

  export default function SkyboxCard({ slug }: Props) {
    const imgBase   = `/Source_Skyboxes_NextJS/skyboxes/${slug}/images`;
    const details   = `/${slug}`;

    //placeholder
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  
    return (
    <Link href={details}>
        <article
            className="
            flex flex-col items-center
            bg-neutral-800
            ring-1 ring-neutral-700/60
            shadow-lg shadow-black/40
            p-2
            m-0.5
            tranform hover:scale-105
            transition duration-150
            
        ">
            <div className='w-full text-center font-bold'>
                <h2 className="text-lg font-semibold text-left">{slug}</h2>
            </div>
            
            <div className="relative w-full aspect-[16/9] overflow-hidden m-2">
                <Image
                    src={`${imgBase}/thumbnail.webp`}
                    alt={`${slug} preview`}
                    fill
                    sizes="(min-width:1280px) 16rem,
                    (min-width:1024px) 22vw,
                    (min-width:640px) 45vw,
                    100vw"
                    className="object-cover"
                    unoptimized
                />
            </div>  
            <div className='w-full h-auto'>
                <h3 className="text-sm">{description}</h3>
            </div>
        </article>
    </Link>
    );
  }