'use client';

import Image from 'next/image';
import Modal from './modal';
import { useState } from 'react';

type Props = { slug: string };

export default function SkyboxCard({
  slug,
  meta,
}: {
  slug: string;
  meta: any;
}) {
  const [open, setOpen] = useState(false);
  const imgBase = `/Source_Skyboxes_NextJS/skyboxes/${slug}/images`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group block w-full text-left"
      >
        <article
          className="
            relative flex flex-col
            bg-neutral-800 ring-1 ring-neutral-700/60
            shadow-lg shadow-black/40
            transition hover:scale-105
            overflow-hidden aspect-[16/9] w-full
          "
          style={{
            backgroundImage: `url(${imgBase}/thumbnail.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Image
            src={`${imgBase}/thumbnail.webp`}
            alt={`${slug} preview`}
            fill
            className="opacity-0"
            unoptimized
          />

          <div
            className="
              absolute inset-x-0 bottom-0
              translate-y-0 opacity-100
              md:translate-y-full md:opacity-0
              md:group-hover:translate-y-0 md:group-hover:opacity-100
              bg-black/60 backdrop-blur-xs px-3 py-2
              transition
            "
          >
            <h2 className="text-sm font-semibold text-neutral-100 truncate">
              {slug}
            </h2>
          </div>
        </article>
      </button>

      {open && <Modal slug={slug} onClose={() => setOpen(false)} />}
    </>
  );
}
