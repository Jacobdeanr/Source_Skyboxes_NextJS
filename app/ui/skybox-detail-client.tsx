'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { withBase, downloadHref } from '@/app/lib/basepath';
import { formatDate } from '@/app/lib/date-utils';
import { getHumanTitle, getOrderedVisibleSlugs, type QuickFilter } from '@/app/lib/catalog';
import type { SkyboxDownload, SkyboxIndex, SkyboxMeta } from '@/app/types/skybox';
import FogParams from '@/app/ui/fogparameters';
import MapList from '@/app/ui/maplist';
import SunParams from '@/app/ui/sunparameters';
import type { SortOption } from './sort-types';

interface SkyboxDetailClientProps {
  slug: string;
  meta: SkyboxMeta;
  previewCount: number;
  allSlugs: string[];
  index: SkyboxIndex;
}

function withBackHash(backHref: string, targetSlug: string): string {
  try {
    const parsed = new URL(backHref, 'https://example.com');
    return `${parsed.pathname}${parsed.search}#${targetSlug}`;
  } catch {
    return `/browse#${targetSlug}`;
  }
}

function sortArchiveSlugs(slugs: string[], index: SkyboxIndex): string[] {
  return [...slugs].sort((slugA, slugB) => {
    const dateA = Date.parse(index[slugA]?.publishDate || '');
    const dateB = Date.parse(index[slugB]?.publishDate || '');

    if (!Number.isNaN(dateA) && !Number.isNaN(dateB) && dateB !== dateA) {
      return dateB - dateA;
    }

    return slugA.localeCompare(slugB);
  });
}

export default function SkyboxDetailClient({
  slug,
  meta,
  previewCount,
  allSlugs,
  index,
}: SkyboxDetailClientProps) {
  const searchParams = useSearchParams();
  const [activeImage, setActiveImage] = useState(1);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const imgBase = withBase(`/skyboxes/${slug}/images`);
  const previews = Array.from({ length: previewCount }, (_, index) => index + 1);
  const displayTitle = getHumanTitle(slug, meta);
  const technicalName = slug;
  const from = searchParams.get('from') || '/browse';
  const parsed = new URL(from, 'https://example.com');
  const sort = (parsed.searchParams.get('sort') as SortOption) || 'time-of-day';
  const query = parsed.searchParams.get('query') || '';
  const quickFilter = (parsed.searchParams.get('filter') as QuickFilter) || 'all';
  const isLegacy = Boolean(meta.archived);
  const scopedSlugs = allSlugs.filter((candidateSlug) =>
    parsed.pathname.startsWith('/archive')
      ? Boolean(index[candidateSlug]?.archived)
      : !Boolean(index[candidateSlug]?.archived),
  );
  const ordered = parsed.pathname.startsWith('/archive')
    ? sortArchiveSlugs(
        scopedSlugs.filter((candidateSlug) => {
          if (!query) {
            return true;
          }

          const entry = index[candidateSlug];
          const haystack = [
            candidateSlug,
            entry?.description || '',
            entry?.timeOfDay || '',
            entry?.weatherCondition || '',
            ...(entry?.categories || []),
          ].join(' ').toLowerCase();

          return haystack.includes(query.toLowerCase());
        }),
        index,
      )
    : getOrderedVisibleSlugs(scopedSlugs, index, sort, query, quickFilter);
  const currentIndex = ordered.indexOf(slug);
  const previousSlug = currentIndex > 0 ? ordered[currentIndex - 1] : undefined;
  const nextSlug = currentIndex >= 0 && currentIndex < ordered.length - 1 ? ordered[currentIndex + 1] : undefined;
  const previousHref = previousSlug ? `/skyboxes/${previousSlug}?from=${encodeURIComponent(withBackHash(from, previousSlug))}` : undefined;
  const nextHref = nextSlug ? `/skyboxes/${nextSlug}?from=${encodeURIComponent(withBackHash(from, nextSlug))}` : undefined;
  const previousTitle = previousSlug ? getHumanTitle(previousSlug, index[previousSlug]) : undefined;
  const nextTitle = nextSlug ? getHumanTitle(nextSlug, index[nextSlug]) : undefined;
  const downloads: Record<string, SkyboxDownload> = meta.downloads
    ?? (isLegacy
      ? {}
      : {
          source: {
            file: `${slug}.7z`,
            format: 'Source engine',
            size: meta.fileSize,
          },
        });

  async function copyFilename() {
    await navigator.clipboard.writeText(technicalName);
    setCopyState('copied');
    window.setTimeout(() => setCopyState('idle'), 1500);
  }

  return (
    <main className="app-shell">
      <div className="mx-auto max-w-[1680px] px-5 py-5 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--border-soft)] pb-5">
          <Link
            href={from}
            className="inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground-muted)] transition-colors hover:text-white focus:outline-none focus-visible:text-white"
          >
            <span aria-hidden="true">&larr;</span>
            Back to library
          </Link>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[color:var(--foreground-muted)]">
            {previousSlug && previousHref && previousTitle && (
              <Link href={previousHref} className="transition-colors hover:text-white">
                Prev: {previousTitle}
              </Link>
            )}
            {nextSlug && nextHref && nextTitle && (
              <Link href={nextHref} className="transition-colors hover:text-white focus:outline-none focus-visible:text-white">
                Next: {nextTitle}
              </Link>
            )}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <section className="space-y-5">
            <div className="relative aspect-[16/9] overflow-hidden border border-[color:var(--border-soft)] bg-[color:var(--background-elevated)]">
              <img
                src={`${imgBase}/previews/${activeImage}.webp`}
                alt={`${displayTitle} preview ${activeImage}`}
                className="h-full w-full object-cover"
              />
            </div>

            {previews.length > 1 && (
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">
                  In-engine lighting previews
                </p>
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: `repeat(${previews.length}, minmax(0, 1fr))` }}
                >
                  {previews.map((num) => (
                    <button
                      key={num}
                      onClick={() => setActiveImage(num)}
                      className={`relative aspect-[4/3] overflow-hidden border transition-colors ${
                        activeImage === num
                          ? 'border-white'
                          : 'border-[color:var(--border-soft)] hover:border-[color:var(--border-strong)]'
                      }`}
                    >
                      <img
                        src={`${imgBase}/previews/${num}.webp`}
                        alt={`Preview ${num}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {meta.steamMaps && meta.steamMaps.length > 0 && (
              <div className="border-t border-[color:var(--border-soft)] pt-6">
                <MapList maps={meta.steamMaps} />
              </div>
            )}
          </section>

          <aside className="space-y-8 lg:sticky lg:top-5">
            <div className="border-b border-[color:var(--border-soft)] pb-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">
                {isLegacy ? 'Legacy asset' : meta.timeOfDay ? `${meta.timeOfDay} skies` : 'Skybox asset'}
              </p>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground-bright)]">
                  {displayTitle}
                </h1>
                {isLegacy && (
                  <p className="text-sm text-[color:var(--foreground-muted)]">
                    [Legacy Asset]
                  </p>
                )}
              </div>
              <p className="mt-4 max-w-sm text-sm leading-7 text-[color:var(--foreground-soft)]">
                {meta.description || (isLegacy
                  ? 'An earlier sky preserved for community history and older projects. This entry does not necessarily include source files or current-generation lighting data.'
                  : 'A production-ready sky with enough mood to set a scene and enough technical clarity to drop straight into a workflow.')}
              </p>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={copyFilename}
                  className="group inline-flex min-h-8 cursor-pointer select-none items-center gap-2 text-left text-[color:var(--foreground-soft)] transition-colors hover:text-white focus:outline-none focus-visible:text-white"
                  aria-label={copyState === 'copied' ? `Copied ${technicalName}` : `Copy filename ${technicalName}`}
                  title={copyState === 'copied' ? 'Copied' : 'Copy filename'}
                >
                  <code className="font-mono text-sm">{technicalName}</code>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[color:var(--foreground-muted)] opacity-0 transition-[opacity,color] duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:text-white">
                    {copyState === 'copied' ? (
                      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M6.2 11.6 2.9 8.3l1.1-1.1 2.2 2.2 5.8-5.8 1.1 1.1z" />
                      </svg>
                    ) : (
                      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M5 2.5A1.5 1.5 0 0 1 6.5 1h5A1.5 1.5 0 0 1 13 2.5v7A1.5 1.5 0 0 1 11.5 11h-5A1.5 1.5 0 0 1 5 9.5z" />
                        <path d="M3.5 5A1.5 1.5 0 0 0 2 6.5v6A1.5 1.5 0 0 0 3.5 14h5A1.5 1.5 0 0 0 10 12.5V12H6.5A2.5 2.5 0 0 1 4 9.5V5z" />
                      </svg>
                    )}
                  </span>
                </button>
                {meta.author && (
                  <p className="text-sm text-[color:var(--foreground-soft)]">By {meta.author}</p>
                )}
                {meta.publishDate && (
                  <p className="text-sm text-[color:var(--foreground-muted)]">Published {formatDate(meta.publishDate)}</p>
                )}
              </div>
            </div>

            {Object.keys(downloads).length > 0 && (
              <div className="space-y-3 border-b border-[color:var(--border-soft)] pb-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">
                  Download files
                </p>
                {Object.entries(downloads).map(([kind, download], index) => {
                  const isPrimary = index === 0;
                  return (
                    <a
                      key={download.file}
                      href={downloadHref(kind, download.file)}
                      className={`flex w-full items-center justify-between border px-4 py-3 text-sm transition-colors ${
                        isPrimary
                          ? 'border-white bg-white !text-black hover:bg-[#e5e5e5] hover:!text-black'
                          : 'border-[color:var(--border-soft)] bg-transparent text-white hover:border-[color:var(--border-strong)] hover:bg-[color:var(--background-panel)]'
                      } focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]`}
                    >
                      <span className={`font-medium ${isPrimary ? '!text-black' : ''}`}>{download.format}</span>
                      <span className={isPrimary ? '!text-black/70' : 'text-[color:var(--foreground-muted)]'}>
                        {download.size || 'Download'}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}

            <div className="space-y-6">
              <section className="space-y-3 border-b border-[color:var(--border-soft)] pb-6">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">
                  At a glance
                </h2>
                <dl className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
                  {meta.timeOfDay && (
                    <>
                      <dt className="text-[color:var(--foreground-muted)]">Time</dt>
                      <dd className="text-[color:var(--foreground-soft)]">{meta.timeOfDay}</dd>
                    </>
                  )}
                  {meta.weatherCondition && (
                    <>
                      <dt className="text-[color:var(--foreground-muted)]">Weather</dt>
                      <dd className="text-[color:var(--foreground-soft)]">{meta.weatherCondition}</dd>
                    </>
                  )}
                  {meta.license && (
                    <>
                      <dt className="text-[color:var(--foreground-muted)]">License</dt>
                      <dd className="text-[color:var(--foreground-soft)]">{meta.license}</dd>
                    </>
                  )}
                  {meta.fileSize && (
                    <>
                      <dt className="text-[color:var(--foreground-muted)]">File size</dt>
                      <dd className="text-[color:var(--foreground-soft)]">{meta.fileSize}</dd>
                    </>
                  )}
                </dl>
              </section>

              {!isLegacy && meta.sunParameters && (
                <section className="space-y-3 border-b border-[color:var(--border-soft)] pb-6">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">
                    Sun Parameters
                  </h2>
                  <SunParams {...meta.sunParameters} />
                </section>
              )}

              {!isLegacy && meta.fogParameters && (
                <section className="space-y-3">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">
                    Fog Parameters
                  </h2>
                  <FogParams {...meta.fogParameters} />
                </section>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
