'use client';
import { useEffect } from 'react';

type Props = {
  slug: string;
  onClose: () => void;
};

export default function Modal({ slug, onClose }: Props) {
  const imgBase = `/Source_Skyboxes_NextJS/skyboxes/${slug}/images`;

  useEffect(() => {
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-center items-center p-4"
    >
      <article
        onClick={e => e.stopPropagation()}
        className="
            w-full max-w-[90vw]
            sm:max-w-xl
            md:max-w-2xl
            lg:max-w-3xl
            xl:max-w-4xl
            max-h-[70vh] overflow-y-auto
            bg-neutral-900 rounded-lg shadow-xl ring-1 ring-neutral-700/60
        "
        >
        <img
          src={`${imgBase}/previews/1.webp`}
          alt={`${slug} preview`}
          className="w-full"
        />

        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{slug}</h2>
          <a
            href={`/Source_Skyboxes_NextJS/skyboxes/${slug}/download/${slug}.7z`}
            className="underline text-blue-300"
            download
          >
            Download
          </a>
        </div>
      </article>
    </div>
  );
}
