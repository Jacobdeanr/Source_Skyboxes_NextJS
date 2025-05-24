'use client';
import { useEffect, useState } from 'react';
import Meta from './meta';
import SunParams from './sunparameters';
import FogParams from './fogparameters';
import ViewDetailsButton from './view-details-button';

// Simple chevron icon component
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <img 
    src="/Source_Skyboxes_NextJS/icons/right-thin-chevron.svg" 
    alt="" 
    className={`invert w-3 h-3 transition-transform ${isOpen ? 'rotate-90' : 'rotate-270'}`} 
  />
);

type MapLink = { name: string; url: string };
type Meta = {
  author?: string; publishDate?: string; timeOfDay?: string; weatherCondition?: string; description?: string;
  steamMaps?: MapLink[];
  sunParameters?: any;
  fogParameters?: any;
  fileSize?: string;
};

function useModalBehaviour(onClose: () => void) {
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', h);
    return () => {
      window.removeEventListener('keydown', h);
    };
  }, [onClose]);
}

export default function Modal({ slug, onClose }: { slug: string; onClose: () => void }) {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const imgBase = `/Source_Skyboxes_NextJS/skyboxes/${slug}/images`;
  
  useEffect(() => { 
    fetch(`/Source_Skyboxes_NextJS/data/${slug}.json`)
      .then(r => r.ok ? r.json() : null)
      .then(setMeta); 
  }, [slug]);
  
  useModalBehaviour(onClose);
  
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <article
        onClick={e => e.stopPropagation()}
        className="
          w-full
          max-w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl
          max-h-[90vh]
          overflow-y-auto overscroll-contain
          bg-neutral-900/95 rounded-xl shadow-2xl ring-1 ring-neutral-700/60
          backdrop-blur-sm
      ">
        {/* Header */}
        <div className="p-6 pb-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{slug}</span>
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
              {meta?.author && (
                <p className="text-neutral-300">
                  By <span className="text-blue-400">{meta.author}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="p-6 pt-4">
          <div className="relative w-full aspect-video bg-black/50 rounded-xl overflow-hidden mb-4">
            <img 
              src={`${imgBase}/previews/1.webp`} 
              alt={`${slug} preview`} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-stretch gap-3 h-10">
            <ViewDetailsButton
              href={`/skyboxes/${slug}`}
              className="flex-1 flex items-center justify-center"
            />
            <button
              onClick={toggleExpand}
              className="w-10 h-10 ring-1 ring-inset ring-neutral-700/50 flex-shrink-0 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Show less details' : 'Show more details'}
            >
              <ChevronIcon isOpen={isExpanded} />
            </button>
          </div>
          
          {/* Expandable Section */}
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-4 space-y-6">
              {/* File Info */}
              {meta?.fileSize && (
                <div className="text-sm">
                  <p className="text-neutral-400">File Size</p>
                  <p className="text-neutral-200">{meta.fileSize}</p>
                </div>
              )}
              {/* Description */}
              {meta?.description && (
                <div>
                  <h3 className="font-medium text-neutral-200 mb-2">Description</h3>
                  <p className="text-sm text-neutral-300">{meta.description}</p>
                </div>
              )}

              {/* Key Parameters */}
              {(meta?.sunParameters || meta?.fogParameters) && (
                <div className="space-y-6">
                  <h3 className="font-medium text-neutral-200">Environment Parameters</h3>
                  <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-8 items-start">
                    {meta?.sunParameters && <SunParams {...meta.sunParameters} />}
                    {meta?.fogParameters && <FogParams {...meta.fogParameters} />}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
