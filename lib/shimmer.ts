/**
 * Animated shimmer used as the `placeholder` of `next/image` photos: it shows while the image is
 * lazily loaded and is removed by Next.js once the image has painted. Pure SVG, so it costs no client
 * JavaScript, and URI-encoded rather than base64 so it works in server and client bundles alike. Colours match the `shimmer` CSS utility in `app/globals.css`.
 */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" preserveAspectRatio="none">
<defs><linearGradient id="g"><stop offset="0" stop-color="#ececf3"/><stop offset=".5" stop-color="#f8f8fb"/><stop offset="1" stop-color="#ececf3"/></linearGradient></defs>
<rect width="400" height="300" fill="#ececf3"/>
<rect width="400" height="300" fill="url(#g)"><animate attributeName="x" from="-400" to="400" dur="1.6s" repeatCount="indefinite"/></rect>
</svg>`;

export const SHIMMER_PLACEHOLDER = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` as const;
