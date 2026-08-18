export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || 'https://dl.sourceskyboxes.com';

export function withBase(p: string) {
  return `${BASE_PATH}${p}`;
}

/** Build a download URL for a file in the R2 bucket. `kind` is the bucket prefix (e.g. "source", "exr"). */
export function downloadHref(kind: string, file: string) {
  return `${DOWNLOAD_URL}/${kind}/${file}`;
}
