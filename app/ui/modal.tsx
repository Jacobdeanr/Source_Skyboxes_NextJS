'use client';
import { useEffect, useState } from 'react';
import { Tabs } from './tabs';
import Meta from './meta';
import SunParams from './sunparameters';
import FogParams from './fogparameters';
import MapList   from './maplist';
import DownloadButton from './downloadbutton';

type MapLink = { name: string; url: string };
type Meta = {
  author?: string; publishDate?: string; categories?: string[]; description?: string;
  steamMaps?: MapLink[];
  sunParameters?: any;
  fogParameters?: any;
  fileSize?: string;
};

function EnvironmentPanel({
  sun,
  fog,
}: {
  sun: Parameters<typeof SunParams>[0];
  fog: Parameters<typeof FogParams>[0];
}) {
  return (
    <div
      className="
        grid gap-10
        lg:grid-cols-2           /* ≥1024 px: two columns                */
        lg:gap-x-12
      "
    >
      <SunParams {...sun} />
      <FogParams {...fog} />
    </div>
  );
}

export default function Modal({ slug, onClose }: { slug: string; onClose: () => void }) {
  const [meta, setMeta] = useState<Meta | null>(null);
  const imgBase = `/Source_Skyboxes_NextJS/skyboxes/${slug}/images`;

  useEffect(() => { fetch(`/Source_Skyboxes_NextJS/data/${slug}.json`).then(r=>r.ok?r.json():null).then(setMeta); }, [slug]);
  useEffect(() => { const o=document.documentElement.style.overflow; document.documentElement.style.overflow='hidden'; return ()=>{document.documentElement.style.overflow=o}},[]);
  useEffect(() => { const h=(e:KeyboardEvent)=>e.key==='Escape'&&onClose(); window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h)},[onClose]);

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <article onClick={e=>e.stopPropagation()} className="w-full max-w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[70vh] overflow-y-auto overscroll-contain bg-neutral-900 rounded-lg shadow-xl ring-1 ring-neutral-700/60">
          <div className="m-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              
              {/* Title */}
              <div>
                <h2 className="text-xl font-bold">{slug}</h2>
                <span className="text-sm text-neutral-400">By {meta?.author}</span>
              </div>

              {/* Download Button */}
              <div className="flex items-center">
                <DownloadButton
                  href={`/Source_Skyboxes_NextJS/skyboxes/${slug}/download/${slug}.7z`}
                  download
                  //format=".7z"
                  size={meta?.fileSize}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="relative w-full aspect-[16/9] mb-6 mt-2">
              <img src={`${imgBase}/previews/1.webp`} alt="" className="absolute inset-0 w-full h-full object-cover rounded-md" />
            </div>

            {/* Tabs */}
            <div className="lg:grid lg:grid-cols-[1fr_auto]"> 
              <Tabs items={[
                {
                  value: 'environment',
                  label: 'Environment Parameters',
                  content: (
                    <div
                    className="
                      grid gap-10
                      lg:grid-cols-2 lg:gap-x-12
                      items-start          /* top-align all children */
                    "
                  >
                    <SunParams {...meta?.sunParameters} />
                    <FogParams {...meta?.fogParameters} />
                  </div>
                ),
              },
              { value: 'community-maps', label: 'Community Maps', content: <MapList maps={meta?.steamMaps} /> },
            ]} />
          </div>

        </div>
      </article>
    </div>
  );
}
