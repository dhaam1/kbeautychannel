/**
 * Minimal HTML entity decoder for our WP content use-cases.
 * Avoids adding external deps (e.g. `html-entities`) just for decoding a few entities.
 */
export function decodeHtmlEntities(input: string): string {
  if (!input) return input;

  return input
    // numeric entities (decimal)
    .replace(/&#(\d+);/g, (_m, dec) => String.fromCharCode(parseInt(dec, 10)))
    // numeric entities (hex)
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, hex) => String.fromCharCode(parseInt(hex, 16)))
    // common named entities we actually see in WP output
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

