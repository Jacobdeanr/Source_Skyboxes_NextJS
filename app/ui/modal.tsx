'use client';
import { useEffect, useState } from 'react';
import Meta from './meta';
import SunParams from './sunparameters';
import FogParams from './fogparameters';
import MapList   from './maplist';

type MapLink = { name: string; url: string };
type Meta = {
  author?: string; publishDate?: string; categories?: string[]; description?: string;
  steamMaps?: MapLink[];
  sunParameters?: any;
  fogParameters?: any;
};

export default function Modal({ slug, onClose }: { slug: string; onClose: () => void }) {
  const [meta, setMeta] = useState<Meta | null>(null);
  const imgBase = `/Source_Skyboxes_NextJS/skyboxes/${slug}/images`;

  useEffect(() => { fetch(`/Source_Skyboxes_NextJS/data/${slug}.json`).then(r=>r.ok?r.json():null).then(setMeta); }, [slug]);
  useEffect(() => { const o=document.documentElement.style.overflow; document.documentElement.style.overflow='hidden'; return ()=>{document.documentElement.style.overflow=o}},[]);
  useEffect(() => { const h=(e:KeyboardEvent)=>e.key==='Escape'&&onClose(); window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h)},[onClose]);

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <article onClick={e=>e.stopPropagation()} className="w-full max-w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[70vh] overflow-y-auto overscroll-contain bg-neutral-900 rounded-lg shadow-xl ring-1 ring-neutral-700/60">
        <div className="relative w-full aspect-[16/9]">
          <img src={`${imgBase}/previews/1.webp`} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold">{slug}</h2>

          <Meta {...meta} />
          <SunParams {...meta?.sunParameters} />
          <FogParams {...meta?.fogParameters} />
          <MapList maps={meta?.steamMaps} />

          <a href={`/Source_Skyboxes_NextJS/skyboxes/${slug}/download/${slug}.7z`} className="underline text-blue-300" download>
            Download .7z
          </a>
        </div>
      </article>
    </div>
  );
}
