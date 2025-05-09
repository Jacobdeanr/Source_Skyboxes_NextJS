'use client';
import { useEffect, useState } from 'react';
import Meta from './meta';
import SunParams from './sunparameters';
import FogParams from './fogparameters';
import CommunityMaps   from './maplist';
import DownloadButton from './downloadbutton';

type MapLink = { name: string; url: string };
type Meta = {
  author?: string; publishDate?: string; categories?: string[]; description?: string;
  steamMaps?: MapLink[];
  sunParameters?: any;
  fogParameters?: any;
  fileSize?: string;
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
          <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-xs px-3 py-2">
            <h2 className="text-xl font-bold">{slug}</h2>
          </div>
        </div>

        {/* ⋯ modal body ⋯ */}
          <div
            className="
              p-6
              space-y-8
              lg:grid lg:grid-cols-[1fr_auto] lg:gap-12
            "
          >

          <div className="space-y-6">
            {/* LEFT: all the numeric / textual data */}
              <SunParams {...meta?.sunParameters} />
              <FogParams {...meta?.fogParameters} />
            </div>

            {/* RIGHT: maps list + CTA — fixed-width column */}
            <div className="space-y-6 lg:min-w-[18rem] lg:self-start">
              <Meta {...meta} />
              <CommunityMaps maps={meta?.steamMaps} />
              <DownloadButton
                href={`/Source_Skyboxes_NextJS/skyboxes/${slug}/download/${slug}.7z`}
                download
                format=".7z"
                size={meta?.fileSize}
              />

            </div>
          </div>
      </article>
    </div>
  );
}
